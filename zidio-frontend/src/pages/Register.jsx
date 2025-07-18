import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react'; 

const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        captchaInput: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [captcha, setCaptcha] = useState({
        a: Math.floor(Math.random() * 10),
        b: Math.floor(Math.random() * 10)
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const validateForm = () => {
        const { password, confirmPassword, captchaInput, phone, firstName } = form;
        if (!firstName.trim()) {
            setMessage({ type: 'error', text: 'First Name is required.' });
            return false;
        }
        if (!phone.trim()) {
            setMessage({ type: 'error', text: 'Phone Number is required.' });
            return false;
        }
        if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setMessage({ type: 'error', text: 'Password must be at least 8 chars and include a special character.' });
            return false;
        }
        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            return false;
        }
        if (parseInt(captchaInput) !== captcha.a + captcha.b) {
            setMessage({ type: 'error', text: 'Captcha is incorrect.' });
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (!validateForm()) return;

        try {
            await axios.post('http://localhost:5001/api/auth/register', form);
            setMessage({ type: 'success', text: 'Registration successful. Redirecting to login...' });
            setForm({
                firstName: '', lastName: '', phone: '', email: '', password: '', confirmPassword: '', captchaInput: ''
            });
            setCaptcha({ a: Math.floor(Math.random() * 10), b: Math.floor(Math.random() * 10) });

            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: err.response?.data?.error || 'Registration failed.' });
            setCaptcha({ a: Math.floor(Math.random() * 10), b: Math.floor(Math.random() * 10) });
        }
    };

    return (
        <div className="min-h-screen pt-24 bg-indigo-50 flex justify-center items-start px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">Create New Account</h2>

                {message.text && (
                    <div className={`p-3 mb-4 text-center rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500"/>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500"/>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500"/>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3 right-3 text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500" />

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Solve: {captcha.a} + {captcha.b} = ?
                        </label>
                        <input
                            type="number"
                            name="captchaInput"
                            placeholder="Enter result"
                            value={form.captchaInput}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500"/>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-700 text-white py-3 rounded-md font-semibold hover:bg-indigo-800 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
