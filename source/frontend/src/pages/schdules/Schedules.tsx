import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
  Stack,
  Badge,
} from "@chakra-ui/react";

interface Schedule {
  id: number;
  title: string;
  description: string;
  votes: number;
}

const Schedules: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      title: "Schedule 1",
      description: "Description for Schedule 1",
      votes: 0,
    },
    {
      id: 2,
      title: "Schedule 2",
      description: "Description for Schedule 2",
      votes: 0,
    },
    {
      id: 3,
      title: "Schedule 3",
      description: "Description for Schedule 3",
      votes: 0,
    },
    {
      id: 4,
      title: "Schedule 4",
      description: "Description for Schedule 4",
      votes: 0,
    },
  ]);

  const handleVote = (id: number) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === id
          ? { ...schedule, votes: schedule.votes + 1 }
          : schedule
      )
    );
  };

  return (
    <Container maxW='container.md' py={8}>
      <Heading as='h1' mb={6} textAlign='center'>
        Schedules
      </Heading>
      <VStack spacing={6}>
        {schedules.map((schedule) => (
          <Box
            key={schedule.id}
            p={6}
            borderWidth='1px'
            borderRadius='lg'
            boxShadow='md'
            w='100%'
          >
            <Stack spacing={4}>
              <Heading as='h2' size='md'>
                {schedule.title}
              </Heading>
              <Text>{schedule.description}</Text>
              <HStack justify='space-between' align='center'>
                <Button
                  colorScheme='teal'
                  onClick={() => handleVote(schedule.id)}
                >
                  Vote
                </Button>
                <Badge colorScheme='purple' fontSize='lg'>
                  {schedule.votes} Votes
                </Badge>
              </HStack>
            </Stack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Schedules;
