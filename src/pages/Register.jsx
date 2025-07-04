import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));

      res.data.role === 'admin'
        ? navigate('/admin/dashboard')
        : navigate('/report');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-black bg-opacity-70 border border-purple-800 rounded-lg p-8 shadow-2xl text-white space-y-6 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-green-400">📝 Register</h2>

        {error && (
          <p className="bg-red-600 bg-opacity-20 text-red-300 border border-red-500 text-sm px-4 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="👤 Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="🔑 Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-gray-400 hover:text-white transition"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition cursor-pointer"
          >
            <option value="user">🙋 User</option>
            <option value="admin">🛠️ Admin</option>
          </select>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded transition cursor-pointer"
          >
            ✅ Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
