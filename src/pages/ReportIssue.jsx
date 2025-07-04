// src/pages/ReportIssue.jsx
import IssueForm from '../components/IssueForm';

const ReportIssue = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-teal-400 drop-shadow">
        📤 Submit a Civic Issue
      </h1>

      <div className="w-full max-w-2xl">
        <IssueForm />
      </div>

      <div className="text-center mt-6">
        <a
          href="/issues"
          className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded shadow transition cursor-pointer"
        >
          📋 View Submitted Issues
        </a>
      </div>
    </div>
  );
};

export default ReportIssue;
