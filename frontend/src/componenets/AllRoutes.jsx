import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './AuthPage.jsx';
import JobBoard from './JobBoard';
import JobForm from './JobForm';
import ApplicantsList from './ApplicantsList.js';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
   
        <>
        <Route path="/" element={<AuthPage />} />
        <Route path="/job-board" element={<JobBoard />} />
        <Route path="/post-job" element={<JobForm />} /> 
          <Route path="/edit-job/:jobId" element={<JobForm />} />
          <Route path="/applicants/:jobId" element={<ApplicantsList />} />
        </>
      
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AllRoutes;
