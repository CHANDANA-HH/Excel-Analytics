import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const res = await axios.post('http://localhost:5001/api/auth/forgot-password', {
                emailOrPhone: input
            });
            setMessage(res.data.message);
            setInput('');
        } catch (err) {
            console.error(err);
            setIsError(true);
            setMessage(err.response?.data?.error || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-50 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Enter your email or phone"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-700 text-white py-3 rounded-md hover:bg-indigo-800 transition"
                    >
                        Submit
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
