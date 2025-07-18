import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SelectColumns = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //  Pull  header and dataMap
    const { headers = [], dataMap = {} } = location.state || {};

    const [selectedCols, setSelectedCols] = useState([]);

    useEffect(() => {
        if (!headers.length) {
            alert('No column headers received. Please upload a file first.');
            navigate('/upload');
        }
    }, [headers, navigate]);

    const toggleColumn = (col) => {
        if (selectedCols.includes(col)) {
            setSelectedCols(selectedCols.filter((c) => c !== col));
        } else {
            setSelectedCols([...selectedCols, col]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCols.length < 2) {
            alert('Please select at least 2 columns.');
            return;
        }

        // Pass selectedCols + dataMap to chart page
        navigate('/chart-view', { state: { columns: headers, dataMap, selectedCols } });

    };

    return (
        <div className="flex min-h-screen bg-indigo-50">
            <main className="flex-1 p-10 relative">
                <h1 className="text-xl font-bold text-gray-800 mb-8">SELECT COLUMNS</h1>

                <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
                    
                    <p className="text-gray-800 font-semibold mb-6">
                        Please select the column(s) you want to visualize.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {headers.map((col, idx) => (
                            <label key={idx} className="block">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedCols.includes(col)}
                                    onChange={() => toggleColumn(col)}
                                />
                                {col}
                            </label>
                        ))}

                        <button
                            type="submit"
                            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SelectColumns;
