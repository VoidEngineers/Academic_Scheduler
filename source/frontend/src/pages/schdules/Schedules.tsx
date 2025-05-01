import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  Container,
  Stack,
  Input,
  List,
  ListItem,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon, ChatIcon } from "@chakra-ui/icons";
import ChakraCalendar from "./OptimalCalendar";

interface Schedule {
  id: number;
  title: string;
  description: string;
  votes: number;
  likes: number;
  dislikes: number;
  comments: string[];
  imageUrl: string;
}

const SchedulePost: React.FC<{
  schedule: Schedule;
  onLike: () => void;
  onDislike: () => void;
  onComment: (comment: string) => void;
}> = ({ schedule, onLike, onDislike, onComment }) => {
  return (
    <Box
      p={4}
      borderWidth='1px'
      borderRadius='lg'
      boxShadow='md'
      w='100%'
      bg='white'
    >
      <Stack spacing={4}>
        <HStack justify='space-between'>
          <Heading as='h2' size='md'>
            {schedule.title}
          </Heading>
          <Text fontSize='sm' color='gray.500'>
            Posted just now
          </Text>
        </HStack>
        <ChakraCalendar
          selectedDate={new Date()}
          onSelect={(date) => console.log("Selected date:", date)}
        />
        <Text>{schedule.description}</Text>
        <Divider />
        <HStack justify='space-between' align='center'>
          <HStack spacing={2}>
            <Button
              leftIcon={<ChevronUpIcon />}
              colorScheme='green'
              onClick={onLike}
            >
              Like
            </Button>
            <Button
              leftIcon={<ChevronDownIcon />}
              colorScheme='red'
              onClick={onDislike}
            >
              Dislike
            </Button>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize='md' color='gray.500'>
              Liked by {schedule.likes} and {schedule.dislikes} others
            </Text>
          </HStack>
        </HStack>
        <Box>
          <Heading as='h3' size='sm' mb={2}>
            Comments:
          </Heading>
          <HStack mt={2} mb={4} spacing={2}>
            <Input
              placeholder='Add a comment'
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  const comment = e.currentTarget.value;
                  onComment(comment);
                  e.currentTarget.value = "";
                }
              }}
            />
            <Button
              colorScheme='blue'
              onClick={() => {
                const inputElement = document.querySelector(
                  'input[placeholder="Add a comment"]'
                ) as HTMLInputElement;
                if (inputElement && inputElement.value.trim()) {
                  const comment = inputElement.value;
                  onComment(comment);
                  inputElement.value = "";
                }
              }}
            >
              Send
            </Button>
          </HStack>
          <List spacing={2}>
            {schedule.comments.map((comment, index) => (
              <ListItem key={index}>
                <HStack>
                  <ChatIcon color='gray.500' />
                  <Text>{comment}</Text>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
    </Box>
  );
};

const Schedules: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      title: "Schedule 1",
      description: "Description for Schedule 1",
      votes: 0,
      likes: 0,
      dislikes: 0,
      comments: [],
      imageUrl: "https://via.placeholder.com/400",
    },
    {
      id: 2,
      title: "Schedule 2",
      description: "Description for Schedule 2",
      votes: 0,
      likes: 0,
      dislikes: 0,
      comments: [],
      imageUrl: "https://via.placeholder.com/400",
    },
    {
      id: 3,
      title: "Schedule 3",
      description: "Description for Schedule 3",
      votes: 0,
      likes: 0,
      dislikes: 0,
      comments: [],
      imageUrl: "https://via.placeholder.com/400",
    },
  ]);

  const handleLike = (id: number) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === id
          ? { ...schedule, likes: schedule.likes + 1 }
          : schedule
      )
    );
  };

  const handleDislike = (id: number) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === id
          ? { ...schedule, dislikes: schedule.dislikes + 1 }
          : schedule
      )
    );
  };

  const handleComment = (id: number, comment: string) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === id
          ? { ...schedule, comments: [...schedule.comments, comment] }
          : schedule
      )
    );
  };

  return (
    <Container maxW='100%' py={8} px={{ base: 4, md: 20 }} bg='gray.100'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {schedules.map((schedule) => (
          <SchedulePost
            key={schedule.id}
            schedule={schedule}
            onLike={() => handleLike(schedule.id)}
            onDislike={() => handleDislike(schedule.id)}
            onComment={(comment) => handleComment(schedule.id, comment)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Schedules;
