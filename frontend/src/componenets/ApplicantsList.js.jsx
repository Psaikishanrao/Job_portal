import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

function ApplicantsList() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await response.json();
        setApplicants(data.applicants || []); 
      } catch (error) {
        console.error('Error fetching applicants:', error);
        setApplicants([]); 
      }
    }
    fetchApplicants();
  }, [jobId]);

  return (
    <Box>
      <Heading size="lg">Applicants for Job {jobId}</Heading>
      {applicants.length > 0 ? (
        applicants.map(applicant => (
          <Box key={applicant._id} p={4} borderWidth="1px" borderRadius="lg">
            <Text>Username: {applicant.username}</Text>
            <Text>Email: {applicant.email}</Text>
          </Box>
        ))
      ) : (
        <Text>No applicants found.</Text>
      )}
    </Box>
  );
}

export default ApplicantsList;

// const handleExport = async (jobId) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/jobs/${jobId}/export`, {
//       method: 'GET',
//     });
//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(new Blob([blob]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', `applicants-${jobId}.xlsx`);
//     document.body.appendChild(link);
//     link.click();
//     link.parentNode.removeChild(link);
//   } catch (error) {
//     console.error('Error exporting applicants:', error);
//   }
// };