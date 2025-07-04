import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      return setError("❌ Passwords do not match.");
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "❌ Reset failed.");
      }
    } catch (err) {
      setError("❌ Server error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1628] px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-[#1a2238] text-white border border-indigo-500">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-300 drop-shadow">
          🔐 Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            className="w-full px-4 py-2 rounded border border-indigo-400 bg-[#0e1628] text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:text-black transition"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full px-4 py-2 rounded border border-indigo-400 bg-[#0e1628] text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:text-black transition"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded shadow-md transition cursor-pointer"
          >
            🔁 Reset Password
          </button>
        </form>

        {message && <p className="text-green-400 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
