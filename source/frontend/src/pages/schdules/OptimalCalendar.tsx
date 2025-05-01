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
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const ChakraCalendar = ({
  selectedDate,
  onSelect,
  disabledDates = [],
  fromDate,
}) => {
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

  // Generate days array for rendering
  const days = useMemo(() => {
    const result = [];
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
  const isDateDisabled = (date) => {
    if (!date) return false;
    if (fromDate && date < fromDate) return true;
    return disabledDates.some((d) => d.toDateString() === date.toDateString());
  };

  // Check if a date is today
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if a date is selected
  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <Container maxW='container.sm' py={4}>
      <Box
        bg='white'
        p={4}
        rounded='lg'
        shadow='lg'
        borderWidth='1px'
        borderColor='gray.200'
      >
        {/* Header: Month/Year and Navigation */}
        <HStack justify='space-between' mb={4}>
          <Button
            size='sm'
            variant='ghost'
            onClick={goToPreviousMonth}
            aria-label='Previous month'
          >
            <Icon as={ChevronLeftIcon} />
          </Button>
          <Text fontSize='lg' fontWeight='bold' color='blue.600'>
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
          <Button
            size='sm'
            variant='ghost'
            onClick={goToNextMonth}
            aria-label='Next month'
          >
            <Icon as={ChevronRightIcon} />
          </Button>
        </HStack>

        {/* Days Grid */}
        <Grid templateColumns='repeat(7, 1fr)' gap={1}>
          {/* Weekday Headers */}
          {daysInWeek.map((day) => (
            <GridItem key={day} textAlign='center'>
              <Text fontSize='sm' fontWeight='medium' color='gray.500'>
                {day}
              </Text>
            </GridItem>
          ))}

          {/* Days */}
          {days.map((day, index) => (
            <GridItem key={index} textAlign='center'>
              {day ? (
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => !isDateDisabled(day) && onSelect(day)}
                  isDisabled={isDateDisabled(day)}
                  bg={
                    isSelected(day)
                      ? "blue.500"
                      : isToday(day)
                      ? "yellow.100"
                      : "transparent"
                  }
                  color={
                    isSelected(day)
                      ? "white"
                      : isDateDisabled(day)
                      ? "gray.300"
                      : "gray.800"
                  }
                  _hover={{
                    bg: isSelected(day) ? "blue.600" : "blue.50",
                  }}
                  rounded='md'
                >
                  {day.getDate()}
                </Button>
              ) : (
                <Box h='32px' /> // Empty cell
              )}
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ChakraCalendar;
