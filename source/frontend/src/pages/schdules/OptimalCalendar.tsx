import { useState, useMemo } from "react";
import {
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  HStack,
  Icon,
  Container,
  VStack,
  Badge,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// Define the session type based on your data structure
interface Session {
  _id: string;
  tableId: string;
  tableName: string;
  courseId: string;
  instructorId: string;
  startTime: number; // Unix timestamp
  endTime: number; // Unix timestamp
  duration: string;
  capacity: number;
  assignedSlot: number;
  meetingURL?: string;
  students?: Array<{ userId: string; userEmail: string }>;
}

// Update the schedule type
interface Schedule {
  _id: string;
  schedule_id: string;
  sessions: Session[];
  title: string;
  description: string;
  votes: number;
  likes: number;
  dislikes: number;
  comments: string[];
  imageUrl?: string;
}

interface ChakraCalendarProps {
  schedule: Schedule; // Updated type
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  disabledDates?: Date[];
  fromDate?: Date | null;
}

const ChakraCalendar = ({
  schedule,
  selectedDate,
  onSelect,
  disabledDates = [],
  fromDate = null,
}: ChakraCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth())
      : new Date()
  );

  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Calculate days in the current month
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayWeekday = firstDayOfMonth.getDay();

  // Helper function to get sessions for a specific date
  const getSessionsForDate = (date: Date | null): Session[] => {
    if (!date || !schedule || !schedule.sessions) return [];

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const startOfDayTimestamp = startOfDay.getTime() / 1000;
    const endOfDayTimestamp = endOfDay.getTime() / 1000;

    return schedule.sessions.filter((session) => {
      // Check if the session's time range overlaps with the day
      return (
        (session.startTime >= startOfDayTimestamp &&
          session.startTime <= endOfDayTimestamp) ||
        (session.endTime >= startOfDayTimestamp &&
          session.endTime <= endOfDayTimestamp) ||
        (session.startTime <= startOfDayTimestamp &&
          session.endTime >= endOfDayTimestamp)
      );
    });
  };

  // Function to format timestamp to readable time
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Generate days array for rendering
  const days = useMemo(() => {
    const result: (Date | null)[] = [];
    // Add empty cells for days before the first day
    for (let i = 0; i < firstDayWeekday; i++) {
      result.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      result.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      );
    }
    // Pad with empty cells to fill the grid
    while (result.length % 7 !== 0) {
      result.push(null);
    }
    return result;
  }, [currentMonth, daysInMonth, firstDayWeekday]);

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Check if a date is disabled
  const isDateDisabled = (date: Date | null): boolean => {
    if (!date) return false;
    if (fromDate && date < fromDate) return true;
    return disabledDates.some((d) => d.toDateString() === date.toDateString());
  };

  // Check if a date is today
  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if a date is selected
  const isSelected = (date: Date | null): boolean => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  // Get sessions count for a date (for displaying badge)
  const getSessionsCount = (date: Date | null): number => {
    if (!date) return 0;
    return getSessionsForDate(date).length;
  };

  // Get slot color based on assignedSlot
  const getSlotColor = (assignedSlot: number): string => {
    const colors = [
      "green.500",
      "blue.500",
      "purple.500",
      "orange.500",
      "cyan.500",
      "pink.500",
    ];
    return colors[assignedSlot % colors.length];
  };

  return (
    <Container maxW='container.lg' py={4}>
      <Box
        bg='white'
        p={4}
        rounded='lg'
        shadow='lg'
        borderWidth='1px'
        borderColor='gray.200'
      >
        {/* Header: Month/Year and Navigation */}
        {schedule && (
          <Box
            mt={8}
            p={4}
            bg='white'
            rounded='lg'
            shadow='md'
            borderWidth='1px'
          >
            <Text fontSize='2xl' fontWeight='bold' mb={2}>
              {schedule.title}
            </Text>
            <Text fontSize='sm' color='gray.600' mb={4}>
              {schedule.description}
            </Text>

            {schedule.imageUrl && (
              <Box mb={4}>
                <img
                  src={schedule.imageUrl}
                  alt='Schedule Visual'
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Box>
            )}

            <HStack spacing={4} mb={4}>
              <Badge colorScheme='green'>Likes: {schedule.likes}</Badge>
              <Badge colorScheme='red'>Dislikes: {schedule.dislikes}</Badge>
              <Badge colorScheme='blue'>Votes: {schedule.votes}</Badge>
            </HStack>

            <Text fontWeight='semibold' mb={2}>
              Sessions
            </Text>
            <VStack align='stretch' spacing={3}>
              {schedule.sessions.map((session) => (
                <Box
                  key={session._id}
                  p={3}
                  borderLeft='4px solid'
                  borderLeftColor={getSlotColor(session.assignedSlot)}
                  bg='gray.50'
                  borderRadius='md'
                >
                  <Text fontWeight='bold' fontSize='sm'>
                    {session.tableName} ({session.courseId})
                  </Text>
                  <Text fontSize='xs' color='gray.600'>
                    Instructor: {session.instructorId}
                  </Text>
                  <Text fontSize='xs' color='gray.600'>
                    {formatTime(session.startTime)} -{" "}
                    {formatTime(session.endTime)}
                  </Text>
                  {session.meetingURL && (
                    <Text fontSize='xs' color='blue.500'>
                      <a
                        href={session.meetingURL}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Join Meeting
                      </a>
                    </Text>
                  )}
                  <Text fontSize='xs' color='gray.600'>
                    Students: {session.students?.length || 0}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ChakraCalendar;
