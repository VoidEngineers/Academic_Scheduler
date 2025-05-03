import React from 'react';
import Dashboard from '../../components/dashboard/dashboard';
import { 
  Box,  
  Heading, 
  SimpleGrid, 
  Container, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Grid,
  GridItem,
  useColorModeValue,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { HamburgerIcon, SettingsIcon, CalendarIcon, StarIcon, InfoIcon, } from '@chakra-ui/icons';
import { FaUser, FaBookOpen } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import EnrollmentWidget from '../../widgets/EnrollmetWidget';
import CourseDistributionWidget from '../../widgets/CourseDistributeWidget';
import AttendanceWidget from '../../widgets/AttendanceWidget';
import PerformanceWidget from '../../widgets/PerformanceWidget';
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  // Drawer controls
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Define theme colors for better consistency
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const headerBorderColor = useColorModeValue('blue.500', 'blue.300');
  const analyticsBorderColor = useColorModeValue('teal.500', 'teal.300');
  const statBg1 = useColorModeValue('blue.50', 'blue.900');
  const statBg2 = useColorModeValue('green.50', 'green.900');
  const statBg3 = useColorModeValue('purple.50', 'purple.900');
  const statBg4 = useColorModeValue('orange.50', 'orange.900');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.600');
  const tableHeaderBg = useColorModeValue('gray.50', 'gray.700');
  const drawerBg = useColorModeValue('white', 'gray.800');
  const menuActiveBg = useColorModeValue('blue.50', 'blue.900');
  const menuHoverBg = useColorModeValue('gray.100', 'gray.700');
  const navigate = useNavigate();
  return (
    <Box py={5} bg={bgColor} minH="100vh">
      {/* Left Drawer Menu */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerBg}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Admin Controls
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack align="stretch" spacing={0}>
              <Button 
                leftIcon={<StarIcon />} 
                justifyContent="flex-start" 
                variant="ghost" 
                bg={menuActiveBg} 
                py={6} 
                borderRadius={0}
                onClick={() => navigate("/admin")}
              >
                Dashboard
              </Button>
              <Button 
                leftIcon={<FaUser />} 
                justifyContent="flex-start" 
                variant="ghost" 
                _hover={{ bg: menuHoverBg }} 
                py={6} 
                borderRadius={0}
                onClick={() => navigate("/admin/user")}
              >
                User Management
              </Button>
              <Button 
                leftIcon={<FaBookOpen />} 
                justifyContent="flex-start" 
                variant="ghost" 
                _hover={{ bg: menuHoverBg }} 
                py={6} 
                borderRadius={0}
                onClick={() => navigate("/admin/courses/list")}
              >
                Course Management
              </Button>
              <Button 
                leftIcon={<CalendarIcon />} 
                justifyContent="flex-start" 
                variant="ghost" 
                _hover={{ bg: menuHoverBg }} 
                py={6} 
                borderRadius={0}
                onClick={() => navigate("/admin/schedule")}
              >
                Schedule Management
              </Button>
              <Button 
                leftIcon={<MdReportProblem />} 
                justifyContent="flex-start" 
                variant="ghost" 
                _hover={{ bg: menuHoverBg }} 
                py={6} 
                borderRadius={0}
                onClick={() => navigate("/admin/view-all-schedule")}
              >
                Conflict Management
              </Button>
              <Button 
                leftIcon={<SettingsIcon />} 
                justifyContent="flex-start" 
                variant="ghost" 
                _hover={{ bg: menuHoverBg }} 
                py={6} 
                borderRadius={0}
              >
                System Settings
              </Button>
              <Button 
                leftIcon={<InfoIcon />} 
                justifyContent="flex-start" 
                variant="ghost" 
                _hover={{ bg: menuHoverBg }} 
                py={6} 
                borderRadius={0}
              >
                About
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
      <Container maxW="container.xl">
        {/* Page Header */}
        <Flex 
          bg={cardBg} 
          p={5} 
          borderRadius="lg" 
          boxShadow="sm"
          borderLeft="4px solid"
          borderColor={headerBorderColor}
          justifyContent="space-between"
          alignItems="center"
          mb={6}
        >
          <HStack>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              variant="ghost"
              onClick={onOpen}
              mr={3}
              size="lg"
            />
            <Heading as="h1" size="lg">Admin Dashboard</Heading>
          </HStack>
          <Text color="gray.500" fontWeight="medium">Academic Year 2024-2025</Text>
        </Flex>
        
        {/* Main Content Grid */}
        <Grid 
          templateColumns={{ base: "1fr", lg: "3fr 5fr" }} 
          gap={6}
        >
          {/* Left Column - Widgets */}
          <GridItem>
            <Flex direction="column" h="100%">
              <Box mb={6}>
                <Heading as="h2" size="md" mb={4} px={1}>Key Metrics</Heading>
                <Box 
                  bg={cardBg} 
                  boxShadow="sm" 
                  borderRadius="md" 
                  borderLeft="4px solid" 
                  borderColor="blue.400" 
                  mb={6}
                  overflow="hidden"
                >
                  <EnrollmentWidget />
                </Box>
                
                <Box 
                  bg={cardBg} 
                  boxShadow="sm" 
                  borderRadius="md" 
                  borderLeft="4px solid" 
                  borderColor="green.400" 
                  overflow="hidden"
                >
                  <CourseDistributionWidget />
                </Box>
              </Box>
              
              <Box mb={6}>
                <Heading as="h2" size="md" mb={4} px={1}>Performance Analytics</Heading>
                <Box 
                  bg={cardBg} 
                  boxShadow="sm" 
                  borderRadius="md" 
                  borderLeft="4px solid" 
                  borderColor="purple.400"
                  mb={6}
                  overflow="hidden"
                >
                  <AttendanceWidget />
                </Box>
                
                <Box 
                  bg={cardBg} 
                  boxShadow="sm" 
                  borderRadius="md" 
                  borderLeft="4px solid" 
                  borderColor="orange.400"
                  overflow="hidden"
                >
                  <PerformanceWidget />
                </Box>
              </Box>
            </Flex>
          </GridItem>
          
          {/* Right Column - Overall Analytics */}
          <GridItem>
            <Box 
              bg={cardBg}
              p={5} 
              borderRadius="md" 
              boxShadow="md"
              borderTop="4px solid" 
              borderColor={analyticsBorderColor}
              height="100%"
              display="flex"
              flexDirection="column"
            >
              <Heading as="h2" size="lg" mb={4}>Overall Analytics</Heading>
              
              <Tabs colorScheme="teal" variant="enclosed" flex="1" display="flex" flexDirection="column">
                <TabList mb={4}>
                  <Tab>Summary Dashboard</Tab>
                  <Tab>Academic Trends</Tab>
                  <Tab>Student Performance</Tab>
                  <Tab>Resources</Tab>
                </TabList>
                
                <TabPanels flex="1" overflowY="auto">
                  {/* Summary Dashboard Tab */}
                  <TabPanel p={0} h="100%">
                    <Dashboard />
                  </TabPanel>
                  
                  {/* Academic Trends Tab */}
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={6}>
                      <Box p={4} bg={statBg1} borderRadius="md" boxShadow="sm">
                        <Stat>
                          <StatLabel>Year-over-Year Growth</StatLabel>
                          <StatNumber>8.2%</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            Since last academic year
                          </StatHelpText>
                        </Stat>
                      </Box>
                      
                      <Box p={4} bg={statBg2} borderRadius="md" boxShadow="sm">
                        <Stat>
                          <StatLabel>Graduate Rate</StatLabel>
                          <StatNumber>94.3%</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            2.1% increase
                          </StatHelpText>
                        </Stat>
                      </Box>
                      
                      <Box p={4} bg={statBg3} borderRadius="md" boxShadow="sm">
                        <Stat>
                          <StatLabel>Faculty-to-Student Ratio</StatLabel>
                          <StatNumber>1:15</StatNumber>
                          <StatHelpText>Optimal range</StatHelpText>
                        </Stat>
                      </Box>
                    </SimpleGrid>
                    
                    <Box border="1px" borderColor={tableBorderColor} borderRadius="md" overflow="hidden">
                      <Table variant="simple" size="sm">
                        <Thead bg={tableHeaderBg}>
                          <Tr>
                            <Th>Academic Period</Th>
                            <Th>Enrollment</Th>
                            <Th>Graduation</Th>
                            <Th>Retention</Th>
                            <Th>Average GPA</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>Spring 2025</Td>
                            <Td>1,250</Td>
                            <Td>N/A</Td>
                            <Td>96.2%</Td>
                            <Td>3.42</Td>
                          </Tr>
                          <Tr>
                            <Td>Fall 2024</Td>
                            <Td>1,180</Td>
                            <Td>N/A</Td>
                            <Td>95.8%</Td>
                            <Td>3.38</Td>
                          </Tr>
                          <Tr>
                            <Td>Spring 2024</Td>
                            <Td>1,120</Td>
                            <Td>324</Td>
                            <Td>94.5%</Td>
                            <Td>3.35</Td>
                          </Tr>
                          <Tr>
                            <Td>Fall 2023</Td>
                            <Td>1,095</Td>
                            <Td>N/A</Td>
                            <Td>93.8%</Td>
                            <Td>3.32</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </Box>
                  </TabPanel>
                  
                  {/* Student Performance Tab */}
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Box>
                        <Heading size="md" mb={3}>Performance by Department</Heading>
                        <Table variant="simple" size="sm">
                          <Thead bg={tableHeaderBg}>
                            <Tr>
                              <Th>Department</Th>
                              <Th>Avg. GPA</Th>
                              <Th>Status</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>Computer Science</Td>
                              <Td>3.65</Td>
                              <Td><Badge colorScheme="green">Excellent</Badge></Td>
                            </Tr>
                            <Tr>
                              <Td>Engineering</Td>
                              <Td>3.45</Td>
                              <Td><Badge colorScheme="green">Good</Badge></Td>
                            </Tr>
                            <Tr>
                              <Td>Business</Td>
                              <Td>3.38</Td>
                              <Td><Badge colorScheme="blue">Satisfactory</Badge></Td>
                            </Tr>
                            <Tr>
                              <Td>Arts & Humanities</Td>
                              <Td>3.72</Td>
                              <Td><Badge colorScheme="green">Excellent</Badge></Td>
                            </Tr>
                            <Tr>
                              <Td>Sciences</Td>
                              <Td>3.51</Td>
                              <Td><Badge colorScheme="green">Good</Badge></Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </Box>
                      
                      <Box>
                        <Heading size="md" mb={3}>Performance Metrics</Heading>
                        <SimpleGrid columns={2} spacing={4}>
                          <Box p={4} bg={statBg1} borderRadius="md">
                            <Text fontSize="sm" color="blue.600">Average Attendance</Text>
                            <Flex align="baseline" mt={1}>
                              <Text fontSize="2xl" fontWeight="bold" mr={2}>87.3%</Text>
                              <Text fontSize="sm" color="green.500">+2.1%</Text>
                            </Flex>
                          </Box>
                          <Box p={4} bg={statBg2} borderRadius="md">
                            <Text fontSize="sm" color="green.600">Assignment Completion</Text>
                            <Flex align="baseline" mt={1}>
                              <Text fontSize="2xl" fontWeight="bold" mr={2}>92.8%</Text>
                              <Text fontSize="sm" color="green.500">+1.5%</Text>
                            </Flex>
                          </Box>
                          <Box p={4} bg={statBg3} borderRadius="md">
                            <Text fontSize="sm" color="purple.600">Pass Rate</Text>
                            <Flex align="baseline" mt={1}>
                              <Text fontSize="2xl" fontWeight="bold" mr={2}>94.5%</Text>
                              <Text fontSize="sm" color="green.500">+0.8%</Text>
                            </Flex>
                          </Box>
                          <Box p={4} bg={statBg4} borderRadius="md">
                            <Text fontSize="sm" color="orange.600">Participation</Text>
                            <Flex align="baseline" mt={1}>
                              <Text fontSize="2xl" fontWeight="bold" mr={2}>83.7%</Text>
                              <Text fontSize="sm" color="green.500">+3.2%</Text>
                            </Flex>
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  
                  {/* Resources Tab */}
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Box p={5} bg={statBg1} borderRadius="md" boxShadow="sm">
                        <Heading size="md" mb={3}>Classroom Utilization</Heading>
                        <Stat mb={4}>
                          <StatLabel>Average Room Utilization</StatLabel>
                          <StatNumber>78.4%</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            5.2% higher than target
                          </StatHelpText>
                        </Stat>
                        <Text fontSize="sm">Peak hours: 10:00 AM - 2:00 PM</Text>
                        <Text fontSize="sm">Most utilized building: Science Center</Text>
                      </Box>
                      
                      <Box p={5} bg={statBg2} borderRadius="md" boxShadow="sm">
                        <Heading size="md" mb={3}>Faculty Distribution</Heading>
                        <SimpleGrid columns={2} spacing={4}>
                          <Flex direction="column" align="center">
                            <Text fontSize="3xl" fontWeight="bold">85</Text>
                            <Text fontSize="sm" color="gray.500">Total Faculty</Text>
                          </Flex>
                          <Flex direction="column" align="center">
                            <Text fontSize="3xl" fontWeight="bold">42</Text>
                            <Text fontSize="sm" color="gray.500">With PhD</Text>
                          </Flex>
                          <Flex direction="column" align="center">
                            <Text fontSize="3xl" fontWeight="bold">28</Text>
                            <Text fontSize="sm" color="gray.500">Associate Professors</Text>
                          </Flex>
                          <Flex direction="column" align="center">
                            <Text fontSize="3xl" fontWeight="bold">15</Text>
                            <Text fontSize="sm" color="gray.500">Full Professors</Text>
                          </Flex>
                        </SimpleGrid>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Admin;