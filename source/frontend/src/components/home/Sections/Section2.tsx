import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  Stack,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { ChevronRightIcon, StarIcon } from "@chakra-ui/icons";
import ChakraCarousel from "../../common/ChakraCarousel";

interface CourseCardProps {
  title: string;
  instructor: string;
  rating: number;
  totalRatings: string;
  imageUrl: string;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor,
  rating,
  totalRatings,
  imageUrl,
  onClick,
}) => (
  <Card
    borderRadius='lg'
    overflow='hidden'
    h='100%'
    m={1}
    cursor='pointer'
    onClick={onClick}
    _hover={{ transform: "scale(1.02)", transition: "transform 0.2s" }}
  >
    <Image src={imageUrl} alt={title} height='160px' objectFit='cover' />
    <CardBody>
      <Stack spacing={2}>
        <Heading size='md' noOfLines={2}>
          {title}
        </Heading>
        <Text color='gray.600'>{instructor}</Text>
        <HStack>
          <Text fontWeight='bold'>{rating}</Text>
          <HStack spacing={1}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Icon
                  key={i}
                  as={StarIcon}
                  color={i < Math.floor(rating) ? "yellow.400" : "gray.300"}
                />
              ))}
          </HStack>
          <Text color='gray.600'>{totalRatings}</Text>
        </HStack>
      </Stack>
    </CardBody>
  </Card>
);

const Section2: React.FC = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseTitle: string) => {
    // Convert title to URL-friendly format for courseId
    const courseId = courseTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/courses/${courseId}`);
  };

  const handleViewAllClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/admin/courses/list");
  };

  const recommendedCourses = [
    {
      title: "Complete Linux Training Course to Get Your Dream IT Job 2025",
      instructor: "Imran Afzal",
      rating: 4.7,
      totalRatings: "(40,040)",
      imageUrl: "/src/assets/userProfileAssets/docker-intro.png",
    },
    {
      title: "Informatica PowerCenter - Beginner to Expert Level",
      instructor: "Smart Coders Hub",
      rating: 4.3,
      totalRatings: "(11,353)",
      imageUrl: "/src/assets/userProfileAssets/docker-intro.png",
    },
    {
      title: "Snowflake – The Complete Masterclass",
      instructor: "Nikolai Schuler",
      rating: 4.6,
      totalRatings: "(20,677)",
      imageUrl: "/src/assets/userProfileAssets/docker-intro.png",
    },
    {
      title: "Data Warehouse Fundamentals for Beginners",
      instructor: "Alan Simon",
      rating: 4.5,
      totalRatings: "(28,276)",
      imageUrl: "/src/assets/userProfileAssets/docker-intro.png",
    },
    {
      title: "Oracle SQL Performance Tuning Masterclass (2025)",
      instructor: "Database Masters Training",
      rating: 4.5,
      totalRatings: "(8,794)",
      imageUrl: "/src/assets/userProfileAssets/docker-intro.png",
    },
  ];

  return (
    <Box maxW='1200px' mx='auto' p={6}>
      {/* Certification Section */}
      <Box mb={8}>
        <Heading as='h2' size='lg' mb={4}>
          What to learn next
        </Heading>
        <Flex align='center' mb={4}>
          <Text fontSize='lg' fontWeight='semibold'>
            Work toward your certification goal
          </Text>
          <Button variant='link' color='purple.500' ml={2}>
            Edit certification interests
          </Button>
        </Flex>

        <Box bg='purple.50' p={6} borderRadius='lg' mb={6}>
          <Heading as='h3' size='md' mb={2}>
            Udemy paths
          </Heading>
          <Text mb={4}>
            Udemy paths are a selection of courses, lectures, labs, and
            assessments curated by our content specialists. They provide the
            instruction and practice you need to prepare for a certification
            exam.
          </Text>
          <Button
            variant='link'
            color='purple.500'
            onClick={handleViewAllClick}
          >
            View all
          </Button>
        </Box>

        <Card mb={8} cursor='pointer' _hover={{ shadow: "md" }}>
          <CardBody>
            <Flex align='center' justify='space-between'>
              <Flex align='center'>
                <Box bg='purple.100' p={4} borderRadius='full' mr={4}>
                  <Icon as={ChevronRightIcon} boxSize={6} color='purple.500' />
                </Box>
                <Box>
                  <Text color='gray.600'>Udemy path</Text>
                  <Heading size='md'>Cisco CCNA 200-301 Certification</Heading>
                  <Text color='gray.600'>Curated for CCNA</Text>
                </Box>
              </Flex>
              <ChevronRightIcon boxSize={6} color='gray.400' />
            </Flex>
          </CardBody>
        </Card>
      </Box>

      {/* Recommended Courses Section */}
      <Box>
        <Heading as='h2' size='lg' mb={6}>
          Recommended courses for you
        </Heading>

        <Box mt={10}>
          <ChakraCarousel gap={4}>
            {recommendedCourses.map((course, index) => (
              <CourseCard
                key={index}
                {...course}
                onClick={() => handleCourseClick(course.title)}
              />
            ))}
          </ChakraCarousel>
        </Box>
      </Box>
    </Box>
  );
};

export default Section2;
