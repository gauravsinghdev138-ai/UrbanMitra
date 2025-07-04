import { useEffect, useState } from 'react';
import axios from 'axios';
import IssueAdminCard from '../components/IssueAdminCard';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchIssues = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/issues`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIssues(res.data);
    } catch (err) {
      if (err.response?.status === 403) {
        setError('❌ Access denied: Admins only.');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError('❌ Failed to load issues.');
      }
    }
  };

  const handleStatusUpdate = (updatedIssue) => {
    setIssues((prev) =>
      prev.map((i) => (i._id === updatedIssue._id ? updatedIssue : i))
    );
  };

  const handleDelete = (deletedId) => {
    setIssues((prev) => prev.filter((i) => i._id !== deletedId));
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-blue-700 dark:text-blue-400 tracking-tight">
          🛠️ Admin Dashboard
        </h2>

        {error && (
          <div className="bg-red-100 dark:bg-red-300 border border-red-400 text-red-800 px-4 py-2 rounded mb-6 text-center shadow">
            {error}
          </div>
        )}

        {issues.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
            No issues to manage.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue) => (
              <IssueAdminCard
                key={issue._id}
                issue={issue}
                token={token}
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
