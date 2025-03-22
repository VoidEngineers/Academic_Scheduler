import React from "react";
import { Box, Container } from "@chakra-ui/react";

const Calendar: React.FC = () => {
  // Replace this URL with your Google Calendar embed URL
  const calendarUrl = "YOUR_GOOGLE_CALENDAR_EMBED_URL";

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
