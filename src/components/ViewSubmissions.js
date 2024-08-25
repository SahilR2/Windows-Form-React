import React, { useState, useEffect } from 'react';

function ViewSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch all submissions on component mount
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:5000/read');
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data.submissions || []);
        } else {
          console.error('Failed to fetch submissions');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < submissions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const submission = submissions[currentIndex] || {};

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">View Submissions</h2>
      <div className="mb-6">
        {submissions.length > 0 ? (
          <>
            <div className="mb-4">
              <p><strong>Name:</strong> {submission.name}</p>
              <p><strong>Email:</strong> {submission.email}</p>
              <p><strong>Phone:</strong> {submission.phone}</p>
              <p><strong>GitHub Link:</strong> <a href={submission.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{submission.github_link}</a></p>
              <p><strong>Stopwatch Time:</strong> {submission.stopwatch_time}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-100"
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-100"
                disabled={currentIndex === submissions.length - 1}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No submissions available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewSubmissions;
