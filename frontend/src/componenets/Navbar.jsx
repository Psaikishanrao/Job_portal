// // import * as React from "react";
// // import {
// //   Box,
// //   Flex,
// //   Heading,
// //   HStack,
// //   Button,
// //   useBreakpointValue,
// //   Image,
// //   Spacer,
// // } from "@chakra-ui/react";
// // import { Link, useNavigate } from "react-router-dom";

// // export default function Header() {
// //   const navigate = useNavigate();
// //   const handleLogout = () => {
// //     // Clear authentication data (e.g., tokens, session storage, etc.)
// //     // localStorage.removeItem('authToken');
// //     // Example: localStorage.clear();
// //     navigate("/"); // Redirect to home page
// //   };

// //   const buttonFontSize = useBreakpointValue({
// //     base: "12px",
// //     sm: "14px",
// //     md: "16px",
// //     lg: "18px",
// //   });

// //   const buttonPadding = useBreakpointValue({
// //     base: "0.5px 0.5px",
// //     sm: "6px 10px",
// //   });

// //   const logoSize = useBreakpointValue({
// //     base: "35px",
// //     sm: "45px",
// //     md: "60px",
// //     lg: "75px",
// //   });

// //   const logoHeight = useBreakpointValue({
// //     base: "30px",
// //     sm: "45px",
// //     md: "60px",
// //     lg: "75px",
// //   });

// //   const headingFontSize = useBreakpointValue({
// //     base: "14px",
// //     sm: "18px",
// //     md: "24px",
// //     lg: "30px",
// //   });

// //   return (
// //     <Box bg="skyblue" w="100%" p={4} color="white">
// //       <Flex alignItems="center">
// //         <Image
// //           alt="Logo"
// //           mr={{ base: "5px", sm: "10px" }}
// //           height={logoHeight}
// //         />
// //         <Heading
// //           as="h1"
// //           size="lg"
// //           fontSize={headingFontSize}
// //           ml={{ base: "5px", sm: "10px" }}
// //         >
// //           JOB PORTAL
// //         </Heading>
// //         <Spacer />
// //         <HStack spacing={4}>
// //           <Link to="/">
// //             <Button variant="link" color="inherit" fontSize={buttonFontSize} p={buttonPadding}>
// //               Home
// //             </Button>
// //           </Link>
// //           <Button
// //             variant="link"
// //             color="inherit"
// //             fontSize={buttonFontSize}
// //             p={buttonPadding}
// //             onClick={handleLogout}
// //           >
// //             Logout
// //           </Button>
// //         </HStack>
// //       </Flex>
// //     </Box>
// //   );
// // }









// import React, { useState, useEffect } from "react";
// // ... other imports remain unchanged

// function JobForm() {
//   // ... existing state and functions remain unchanged

//   // Fetch all jobs when the component mounts
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch('/api/getalljobs');
//         const data = await response.json();
//         setJobs(data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//         toast({
//           title: "Error fetching jobs.",
//           description: "There was an error fetching the job listings.",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // ... existing code remains unchanged

//     try {
//       const response = await fetch('/api/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newJob),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setJobs((prevJobs) => [...prevJobs, result.job]);
//       // ... reset form fields and show toast
//     } catch (error) {
//       console.error('Error creating job:', error);
//       // ... show error toast
//     }
//   };

//   const deleteJob = async (id) => {
//     try {
//       const response = await fetch(`/api/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
//       // ... show success toast
//     } catch (error) {
//       console.error('Error deleting job:', error);
//       // ... show error toast
//     }
//   };

//   const updateJob = async (updatedJob) => {
//     try {
//       const response = await fetch(`/api/${updatedJob._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedJob),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setJobs((prevJobs) =>
//         prevJobs.map((job) => (job._id === updatedJob._id ? result.job : job))
//       );
//       // ... show success toast
//     } catch (error) {
//       console.error('Error updating job:', error);
//       // ... show error toast
//     }
//   };

//   // ... rest of the component remains unchanged
// }

// export default JobForm;
