import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(`http://localhost:5001/api/auth/reset-password/${token}`, {
        newPassword
      });

      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-3 rounded-md hover:bg-indigo-800 transition"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
