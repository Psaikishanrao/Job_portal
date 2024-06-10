import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useColorModeValue, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';

function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = isRegister ? 'register' : 'login';
    const userType = isRecruiter ? 'recruiters' : 'applicants';
    const url = `http://localhost:5000/api/auth/${userType}/${endpoint}`;

    const payload = {
      email,
      password,
      ...(isRegister && { name }),
      ...(isRegister && isRecruiter && { company }),
    };

    try {
      const response = await axios.post(url, payload, { withCredentials: true });
      if (response.status === 200) {
        toast({
          title: `${isRegister ? 'Registration' : 'Login'} successful`,
          description: `You have successfully ${isRegister ? 'registered' : 'logged in'} as ${isRecruiter ? 'a recruiter' : 'an applicant'}.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        if (isRegister) {
          setEmail('');
          setPassword('');
          setName('');
          setCompany('');
        }

        navigate(isRecruiter ? '/post-job' : '/job-board');
      } else if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage(error.response ? error.response.data.message : 'Network Error');
    }
  };

  return (
    <Box
      p={6}
      minH="100vh"
      bgImage="url('./back.jpg')"
      bgSize="cover"
      bgPosition="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={8} maxW="lg" mx="auto">
        <Heading color="teal.400">{isRegister ? 'Register' : 'Login'} as {isRecruiter ? 'Recruiter' : 'Applicant'}</Heading>
        {message && <Text color="red.500">{message}</Text>}
        <Box p={8} borderRadius="50px" bg="rgba(215, 215, 201, 0.5)" backdropFilter="blur(10px)" width={'400px'}>
          <VStack as="form" spacing={4} onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            {isRegister && (
              <>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                {isRecruiter && (
                  <FormControl isRequired>
                    <FormLabel>Company</FormLabel>
                    <Input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                  </FormControl>
                )}
              </>
            )}
            <Button type="submit" colorScheme="teal">
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </VStack>
          <center>
            <Button mt={4} onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </Button>
            <Button mt={4} onClick={() => setIsRecruiter(!isRecruiter)}>
              {isRecruiter ? 'Switch to Applicant' : 'Switch to Recruiter'}
            </Button>
          </center>
          
        </Box>
        
      </VStack>
      
    </Box>
  );
}

export default AuthPage;
