import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Box,
  VStack,
  Heading,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

function JobGrid({ jobs, deleteJob, updateJob }) {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={30} p={6} width="100%" marginTop={'20px'}>
      {jobs.map((job) => (
        <GridItem
          key={job._id}
          w="100%"
          h="200px"
          boxShadow="md"
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          borderRadius="50px"
          bg="whitesmoke"
          backdropFilter="blur(10px)"
        >
          <Box marginLeft={"20px"}>
            <Heading size="md">{job.jobTitle}</Heading>
            <Text>Salary: {job.salary}</Text>
            <Text>Vacation: {job.vacation}</Text>
            <Text>Description: {job.jobDescription}</Text>
          </Box>
          <Box>
            <Button
              marginLeft="20px"
              colorScheme="red"
              size="sm"
              onClick={() => deleteJob(job._id)}
              _hover={{ bg: "red.600", transform: "scale(1.05)" }}
              fontFamily="heading"
              fontWeight="bold"
              width={'90px'}
              height={'25px'}
              borderRadius={'10px'}
            >
              Delete Job
            </Button>
            <Button
              marginLeft="20px"
              colorScheme="blue"
              size="sm"
              ml={2}
              onClick={() => updateJob(job)}
              _hover={{ bg: "blue.600", transform: "scale(1.05)" }}
              fontFamily="heading"
              fontWeight="bold"
              width={'90px'}
              height={'25px'}
              borderRadius={'10px'}
            >
              Update Job
            </Button>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}

function JobForm() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [vacation, setVacation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/jobs/getalljobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error fetching jobs.",
          description: "There was an error fetching the job listings.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchJobs();
  }, [toast]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newJob = {
      _id: Date.now().toString(),
      jobTitle,
      salary,
      vacation,
      jobDescription,
    };

    try {
      const response = await fetch('http://localhost:5000/jobs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setJobs((prevJobs) => [...prevJobs, result.job]);

      setJobTitle("");
      setSalary("");
      setVacation("");
      setJobDescription("");

      toast({
        title: "Job added.",
        description: "Your job has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error creating job.",
        description: "There was an error creating the job listing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));

      toast({
        title: "Job deleted.",
        description: "The job has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error deleting job.",
        description: "There was an error deleting the job listing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateJob = async (updatedJob) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${updatedJob._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === updatedJob._id ? result.job : job))
      );

      toast({
        title: "Job updated.",
        description: "The job has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating job:', error);
      toast({
        title: "Error updating job.",
        description: "There was an error updating the job listing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box
      minH="100vh"
      bg="blue.500"
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgImage="url('./OIP.jpg')"
      bgSize="cover"
      bgPosition="center"
      p={8}
    >
      <Button
        position="fixed"
        top="16px"
        left="16px"
        colorScheme="red"
        onClick={handleLogout}
        marginLeft={'1000px'}
        marginBottom={'50px'}
      >
        Logout
      </Button>
      <VStack spacing={8} maxW="lg" mx="auto" mb={8}>
        <Heading color="teal.400">Job Form</Heading>
        <Box
          p={8}
          borderRadius="50px"
          bg="rgba(215, 215, 201, 0.5)"
          backdropFilter="blur(10px)"
          width="400px"
        >
          <VStack as="form" spacing={4} onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel color="blue.600">Job Title</FormLabel>
              <Input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                width={"300px"}
              />
              <FormLabel color="blue.600">Salary</FormLabel>
              <Input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                width={"300px"}
              />
              <FormLabel color="blue.600">Vacation</FormLabel>
              <Input
                type="text"
                value={vacation}
                onChange={(e) => setVacation(e.target.value)}
                width={"300px"}
              />
              <FormLabel color="blue.600">Job Description</FormLabel>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                width={"300px"}
              />
              <br />
              <Button colorScheme="teal" type="submit">
                Post Job
              </Button>
            </FormControl>
          </VStack>
        </Box>
      </VStack>
      <JobGrid jobs={jobs} deleteJob={deleteJob} updateJob={updateJob} />
    </Box>
  );
}

export default JobForm;
