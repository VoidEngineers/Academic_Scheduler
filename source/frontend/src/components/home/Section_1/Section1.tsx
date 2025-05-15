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
import type { CourseCardProps } from './types';
import {
  containerStyles,
  headerFlexStyles,
  avatarStyles,
  welcomeHeadingStyles,
  roleTextStyles,
  editButtonStyles,
  streakCardStyles,
  streakHeadingStyles,
  streakDescriptionStyles,
  streakCountStyles,
  streakLabelStyles,
  circularProgressStyles,
  progressLabelTextStyles,
  courseSectionStyles,
  courseTitleFlexStyles,
  courseSectionHeadingStyles,
  myLearningButtonStyles,
  courseGridStyles,
  courseCardStyles,
  thumbnailBoxStyles,
  thumbnailImageStyles,
  playButtonStyles,
  courseTitleStyles,
  courseSubtitleStyles,
  courseDurationStyles,
  menuButtonStyles
} from './styles';

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  subtitle,
  duration,
  thumbnail,
}) => (
  <Card {...courseCardStyles}>
    <CardBody>
      <Flex>
        <Box {...thumbnailBoxStyles}>
          {thumbnail && (
            <Box
              as='img'
              src={thumbnail}
              alt={title}
              {...thumbnailImageStyles}
            />
          )}
          <IconButton
            aria-label='Play course'
            icon={<ChevronRightIcon />}
            {...playButtonStyles}
          />
        </Box>
        <Box flex={1}>
          <Flex justify='space-between' align='flex-start'>
            <Text {...courseTitleStyles}>
              {title}
            </Text>
            <IconButton
              aria-label='More options'
              icon={<HamburgerIcon />}
              {...menuButtonStyles}
            />
          </Flex>
          <Text {...courseSubtitleStyles}>
            {subtitle}
          </Text>
          <Text {...courseDurationStyles}>
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
    <Box {...containerStyles}>
      {/* Header Section */}
      <Flex {...headerFlexStyles}>
        <Avatar
          name={mockUser.name}
          {...avatarStyles}
        >
          {mockUser.avatar}
        </Avatar>
        <Box>
          <Heading {...welcomeHeadingStyles}>
            Welcome back, {mockUser.name}
          </Heading>
          <Text {...roleTextStyles}>
            {mockUser.role}
            <Button {...editButtonStyles}>
              Edit occupation and interests
            </Button>
          </Text>
        </Box>
      </Flex>

      {/* Streak Section */}
      <Card {...streakCardStyles}>
        <CardBody>
          <Flex justify='space-between' align='center'>
            <Box>
              <Heading {...streakHeadingStyles}>
                Start a new streak
              </Heading>
              <Text {...streakDescriptionStyles}>
                Add some learning time to your calendar each week.
              </Text>
            </Box>
            <Flex align='center' gap={8}>
              <Stack align='center'>
                <Text {...streakCountStyles}>
                  {stats.streak}
                </Text>
                <Text {...streakLabelStyles}>
                  Current streak
                </Text>
              </Stack>
              <Box position='relative'>
                <CircularProgress {...circularProgressStyles}>
                  <CircularProgressLabel>
                    <Stack spacing={0} textAlign='center'>
                      <Text {...progressLabelTextStyles}>
                        {stats.courseMinutes}/30
                      </Text>
                      <Text {...progressLabelTextStyles}>
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
      <Box {...courseSectionStyles}>
        <Flex {...courseTitleFlexStyles}>
          <Heading {...courseSectionHeadingStyles}>
            Pick up where you left off
          </Heading>
          <Button {...myLearningButtonStyles}>
            My learning
          </Button>
        </Flex>

        <SimpleGrid {...courseGridStyles}>
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