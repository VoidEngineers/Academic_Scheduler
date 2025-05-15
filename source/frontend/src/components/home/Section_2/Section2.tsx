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
import type { CourseCardProps } from './types';
import {
  containerStyles,
  layoutStyles,
  certificationStyles,
  pathCardStyles,
  courseStyles,
} from '.';

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor,
  rating,
  totalRatings,
  imageUrl,
  onClick,
}) => (
  <Card {...courseStyles.courseCardStyles} onClick={onClick}>
    <Image src={imageUrl} alt={title} {...courseStyles.courseImageStyles} />
    <CardBody>
      <Stack {...courseStyles.courseInfoStackStyles}>
        <Heading {...courseStyles.courseTitleStyles}>
          {title}
        </Heading>
        <Text {...courseStyles.instructorTextStyles}>{instructor}</Text>
        <HStack {...courseStyles.ratingStackStyles}>
          <Text {...courseStyles.ratingTextStyles}>{rating}</Text>
          <HStack {...courseStyles.starStackStyles}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Icon
                  key={i}
                  as={StarIcon}
                  {...courseStyles.starIconStyles(rating, i)}
                />
              ))}
          </HStack>
          <Text {...courseStyles.totalRatingsTextStyles}>{totalRatings}</Text>
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
    <Box {...containerStyles}>
      {/* Certification Section */}
      <Box {...layoutStyles.sectionStyles}>
        <Heading {...layoutStyles.mainHeadingStyles}>
          What to learn next
        </Heading>
        <Flex {...certificationStyles.certificationTitleStyles}>
          <Text {...certificationStyles.certificationTextStyles}>
            Work toward your certification goal
          </Text>
          <Button {...certificationStyles.editButtonStyles}>
            Edit certification interests
          </Button>
        </Flex>

        <Box {...certificationStyles.pathInfoBoxStyles}>
          <Heading {...layoutStyles.subHeadingStyles}>
            Udemy paths
          </Heading>
          <Text {...certificationStyles.pathInfoTextStyles}>
            Udemy paths are a selection of courses, lectures, labs, and
            assessments curated by our content specialists. They provide the
            instruction and practice you need to prepare for a certification
            exam.
          </Text>
          <Button
            {...certificationStyles.viewAllButtonStyles}
            onClick={handleViewAllClick}
          >
            View all
          </Button>
        </Box>

        <Card {...pathCardStyles.pathCardStyles}>
          <CardBody>
            <Flex {...pathCardStyles.pathCardFlexStyles}>
              <Flex align='center'>
                <Box {...pathCardStyles.pathIconBoxStyles}>
                  <Icon as={ChevronRightIcon} {...pathCardStyles.pathIconStyles} />
                </Box>
                <Box {...pathCardStyles.pathCardTextBoxStyles}>
                  <Text {...pathCardStyles.pathTypeTextStyles}>Udemy path</Text>
                  <Heading {...pathCardStyles.pathTitleStyles}>Cisco CCNA 200-301 Certification</Heading>
                  <Text {...pathCardStyles.pathSubtitleStyles}>Curated for CCNA</Text>
                </Box>
              </Flex>
              <ChevronRightIcon {...pathCardStyles.chevronIconStyles} />
            </Flex>
          </CardBody>
        </Card>
      </Box>

      {/* Recommended Courses Section */}
      <Box>
        <Heading {...layoutStyles.mainHeadingStyles}>
          Recommended courses for you
        </Heading>

        <Box {...courseStyles.carouselContainerStyles}>
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