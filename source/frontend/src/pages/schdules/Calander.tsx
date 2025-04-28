import React from "react";
import { Box, Container } from "@chakra-ui/react";

const Calendar: React.FC = () => {
  // Replace this URL with your Google Calendar embed URL
  const calendarUrl =
    "https://calendar.google.com/calendar/embed?src=chathx.vik%40gmail.com&ctz=Asia%2FColombo";

  return (
    <Container maxW='container.lg'>
      <Box w='100%' h='80vh' mt='2rem' mb='2rem'>
        <iframe
          src={calendarUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          title='Google Calendar'
        />
      </Box>
    </Container>
  );
};

export default Calendar;
