import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/auth/login', form);
      console.log('🔐 Login response:', res.data);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));

      if (res.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/report');
      }

      window.location.reload(); // ✅ Auto-refresh after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-gray-900 dark:text-gray-100 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center mb-6 tracking-tight">
          🔐 Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300 transition duration-200"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="🔑 Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300 transition duration-200 pr-10"
              required
            />
            <span
              className="absolute right-3 top-3 text-lg cursor-pointer text-gray-500 dark:text-gray-300 hover:scale-110 transition-transform"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-[1.02] duration-200 cursor-pointer" // ✅ cursor-pointer
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-6 text-center">
          Forgot your password?{' '}
          <Link
            to="/forgot-password"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors cursor-pointer" // ✅ cursor-pointer
          >
            Reset here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
