import React from "react";
import {
  Box,
  Text,
  Avatar,
  Button,
  Card,
  CardBody,
  IconButton,
  SimpleGrid,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";

interface CourseCardProps {
  title: string;
  subtitle: string;
  duration: string;
  thumbnail?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  subtitle,
  duration,
  thumbnail,
}) => (
  <Card borderRadius='xl' mb={4}>
    <CardBody>
      <Flex>
        <Box
          position='relative'
          width='120px'
          height='80px'
          bg='gray.100'
          borderRadius='md'
          mr={4}
        >
          {thumbnail && (
            <Box
              as='img'
              src={thumbnail}
              alt={title}
              width='100%'
              height='100%'
              objectFit='cover'
              borderRadius='md'
            />
          )}
          <IconButton
            aria-label='Play course'
            icon={<ChevronRightIcon />}
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            bg='white'
            _hover={{ bg: "white" }}
          />
        </Box>
        <Box flex={1}>
          <Flex justify='space-between' align='flex-start'>
            <Text fontWeight='bold' fontSize='md'>
              {title}
            </Text>
            <IconButton
              aria-label='More options'
              icon={<HamburgerIcon />}
              size='sm'
              variant='ghost'
            />
          </Flex>
          <Text color='gray.600' fontSize='sm'>
            {subtitle}
          </Text>
          <Text color='gray.500' fontSize='xs'>
            {duration}
          </Text>
        </Box>
      </Flex>
    </CardBody>
  </Card>
);

const Section1: React.FC = () => {
  const mockUser = {
    name: "Vikum",
    role: "Back End Web Developer",
    avatar: "C",
  };

  const stats = {
    streak: 0,
    courseMinutes: 0,
    visits: 6,
    dateRange: "Mar 16 - 22",
  };

  return (
    <Box maxW='1200px' mx='auto' p={6}>
      {/* Header Section */}
      <Flex align='center' mb={8}>
        <Avatar
          size='lg'
          name={mockUser.name}
          bg='blackAlpha.900'
          color='white'
          mr={4}
        >
          {mockUser.avatar}
        </Avatar>
        <Box>
          <Heading as='h1' size='lg'>
            Welcome back, {mockUser.name}
          </Heading>
          <Text color='gray.600' fontSize='lg'>
            {mockUser.role}
            <Button
              variant='link'
              color='blue.500'
              ml={2}
              textDecoration='underline'
            >
              Edit occupation and interests
            </Button>
          </Text>
        </Box>
      </Flex>

      {/* Streak Section */}
      <Card borderRadius='xl' mb={6}>
        <CardBody>
          <Flex justify='space-between' align='center'>
            <Box>
              <Heading as='h2' size='md'>
                Start a new streak
              </Heading>
              <Text color='gray.600'>
                Add some learning time to your calendar each week.
              </Text>
            </Box>
            <Flex align='center' gap={8}>
              <Stack align='center'>
                <Text fontSize='3xl' fontWeight='bold'>
                  {stats.streak}
                </Text>
                <Text color='gray.600' fontSize='sm'>
                  Current streak
                </Text>
              </Stack>
              <Box position='relative'>
                <CircularProgress
                  value={70}
                  size='80px'
                  thickness='4px'
                  color='purple.500'
                >
                  <CircularProgressLabel>
                    <Stack spacing={0} textAlign='center'>
                      <Text fontSize='xs' color='gray.600'>
                        {stats.courseMinutes}/30
                      </Text>
                      <Text fontSize='xs' color='gray.600'>
                        {stats.visits}/1
                      </Text>
                    </Stack>
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      {/* Courses Section */}
      <Box mt={8}>
        <Flex justify='space-between' align='center' mb={4}>
          <Heading as='h2' size='md'>
            Pick up where you left off
          </Heading>
          <Button variant='link' color='blue.500'>
            My learning
          </Button>
        </Flex>

        <SimpleGrid columns={1} spacing={4}>
          <CourseCard
            title='Fuzzy Match Step in PDI'
            subtitle='Lecture • 11m'
            duration='35. Fuzzy Match Step in PDI'
          />
          <CourseCard
            title='Data Warehouse - The Ultimate Guide'
            subtitle='Lecture • 2m left'
            duration='10. Demos & Hands-on'
          />
          <CourseCard
            title='Zabbix 7 Application and Network Monitoring'
            subtitle='Lecture • 13m'
            duration='13. Enable PSK Encryption for Zabbix Agents'
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Section1;
