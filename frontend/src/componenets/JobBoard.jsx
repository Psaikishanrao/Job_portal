import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Text,
  Heading,
  Button,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch('http://localhost:5000/jobs/getalljobs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched jobs data:", data);
        setJobs(data || []);
        console.log("Jobs state after setJobs:", jobs); // New log to check state
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
      }
    }
    fetchJobs();
  }, []);
  useEffect(() => {
    console.log("Jobs state updated:", jobs);
  }, [jobs]);
  


  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');
  const handleLogout = () => {
  
    navigate('/');
  };
  const handleApply = (jobId) => {
    alert(`You have applied for job ID: ${jobId}`);
  };
  return (
    <Box  
      minH="100vh"
      bg="blue.500"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgImage="url('./img.webp')"
      bgSize="cover"
      bgPosition="center"
    >
      <Button
        position="absolute"
        bottom="180"
        left="50%"
        transform="translateX(-50%)"
        colorScheme="red"
        marginLeft={'1000px'}
        marginBottom={'50px'}
        onClick={handleLogout}

      >
        Logout
      </Button>
    
       <Grid templateColumns="repeat(4, 1fr)" gap={30} p={6} width="100%">
      {jobs.map((job) => (
        <GridItem
        w="100%"
        h="320px"
        boxShadow="md"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderRadius="50px"
        bg="whitesmoke"
        backdropFilter="blur(10px)"
        marginLeft={'50px'}
        >
            <VStack spacing={4} align="stretch">
              <center>
              <Heading size="md" isTruncated>
                {job.jobTitle}
              </Heading>
              </center>
              <Text fontSize="sm">Salary: {job.salary}</Text>
              <Text fontSize="sm">Vacation: {job.vacation}</Text>
              <Text fontSize="sm" noOfLines={3}>
                {job.jobDescription}
              </Text>
              <Button colorScheme="teal" size="sm" 
              height={'25px'}
              borderRadius={'10px'}
              onClick={() => handleApply(job._id)} >
                Apply
              </Button>
              <Button colorScheme="blue" size="sm"  
              height={'25px'}
              borderRadius={'10px'}>
                Details
              </Button>
            </VStack>
          </GridItem>
        ))}
      </Grid>
      
    </Box>
  );
}

export default JobBoard;
