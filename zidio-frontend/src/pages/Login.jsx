import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ emailOrPhone: '', password: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        emailOrPhone: form.emailOrPhone,
        password: form.password,
      });

      // Save
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('firstName', response.data.firstName); 
      navigate('/');

    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.response?.data?.error || 'Login failed.' });
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-indigo-50 flex justify-center items-start px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">LOGIN HERE!!</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone Number"
            value={form.emailOrPhone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-3 rounded-md font-semibold hover:bg-indigo-800 transition"
          >
            Login
          </button>

          {message.text && (
            <p className={`text-sm mt-2 ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {message.text}
            </p>
          )}
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
