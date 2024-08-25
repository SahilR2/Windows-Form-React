import React from 'react';
import MainForm from './components/MainForm';
import CreateSubmissionForm from './components/CreateSubmission';
import ViewSubmissions from './components/ViewSubmissions';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="p-8">
        <Routes>
          <Route path="/" element={<MainForm />} />
          <Route path="/view-submissions" element={<ViewSubmissions />} />
          <Route path="/create-submission" element={<CreateSubmissionForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
