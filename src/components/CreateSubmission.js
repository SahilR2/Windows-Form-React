import React, { useState } from 'react';

function CreateSubmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    github_link: '',
    stopwatch_time: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stopwatch, setStopwatch] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      stopwatch_time: formatTime(stopwatch),
    };

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        alert('Submission successful!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          github_link: '',
          stopwatch_time: '',
        });
        setStopwatch(0);
      } else {
        alert('Submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStopwatch = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  React.useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setStopwatch((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && stopwatch !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Create New Submission</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">GitHub Repo Link</label>
          <input
            type="url"
            name="github_link"
            value={formData.github_link}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stopwatch</label>
          <div className="flex items-center">
            <span className="text-lg mr-4">{formatTime(stopwatch)}</span>
            <button
              type="button"
              onClick={toggleStopwatch}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-100"
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-100"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSubmissionForm;
