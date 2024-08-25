import React from 'react';
import { Link } from 'react-router-dom';

function MainForm() {
  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Main Form</h1>
      <div className="flex flex-col space-y-4">
        <Link to="/view-submissions">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-100">
            View Submissions
          </button>
        </Link>
        <Link to="/create-submission">
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-100">
            Create New Submission
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MainForm;
