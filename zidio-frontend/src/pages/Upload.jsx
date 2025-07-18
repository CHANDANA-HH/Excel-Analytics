import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage(' Please login first to upload your file.');
            return;
        }

        if (!selectedFile) {
            setMessage(' Please select a file first!');
            return;
        }

        // Store file info in localStorage history
        let files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
        files.push({
            name: selectedFile.name,
            size: (selectedFile.size / 1024).toFixed(2) + ' KB',
            date: new Date().toLocaleString()
        });
        localStorage.setItem('uploadedFiles', JSON.stringify(files));

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:5001/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });

            const { columns, dataMap } = response.data;
            navigate('/select-columns', { state: { headers: columns, dataMap } });

        } catch (error) {
            console.error('Upload failed:', error);
            setMessage(error.response?.data?.error || 'Failed to upload or parse file.');
        }
    };

    return (
        <div className="min-h-screen pt-28 px-6 flex flex-col items-center bg-indigo-50">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Upload Excel File</h2>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-6"
            >
                <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-lg p-6 cursor-pointer hover:border-indigo-500 transition"
                >
                    <span className="text-indigo-600 font-semibold mb-2">
                        {selectedFile ? selectedFile.name : "Click to select or drag and drop an Excel/CSV file"}
                    </span>
                    <input
                        type="file"
                        id="file"
                        accept=".xlsx,.xls,.xlsm,.csv"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                <button
                    type="submit"
                    className="block text-center w-full bg-indigo-700 text-white py-3 rounded-md font-semibold hover:bg-indigo-800 transition"
                >
                    Create Chart
                </button>

                {/*  Message Display */}
                {message && (
                    <p className="text-center mt-4 text-red-600 font-medium">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Upload;
