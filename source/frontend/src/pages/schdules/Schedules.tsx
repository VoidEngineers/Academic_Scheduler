import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
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
  useToast,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon, ChatIcon } from "@chakra-ui/icons";
import ChakraCalendar from "./OptimalCalendar";

// Add these utility functions at the top of your file
const getStoredUsername = (): string | null => {
  try {
    const userSessionData = localStorage.getItem("userSessionData");
    if (userSessionData) {
      const { username, expiresAt } = JSON.parse(userSessionData);
      // Check if the session is still valid
      if (new Date().getTime() < expiresAt) {
        return username;
      } else {
        // Session expired, remove it
        localStorage.removeItem("userSessionData");
      }
    }
    return null;
  } catch (error) {
    console.error("Error retrieving username from storage:", error);
    return null;
  }
};

// Update the storeUsername function
const storeUsername = (username: string): void => {
  try {
    // Get previous username for comparison
    const userSessionData = localStorage.getItem("userSessionData");
    let previousUsername = null;

    if (userSessionData) {
      try {
        const data = JSON.parse(userSessionData);
        previousUsername = data.username;
      } catch (e) {
        console.error("Error parsing previous username:", e);
      }
    }

    // Set expiration time to 30 minutes from now
    const expiresAt = new Date().getTime() + 30 * 60 * 1000;
    localStorage.setItem(
      "userSessionData",
      JSON.stringify({ username, expiresAt })
    );

    // If username has changed, it's a new session - clear votes
    if (previousUsername !== null && previousUsername !== username) {
      localStorage.removeItem("userScheduleVotes");
    }

    // Record current username for next session comparison
    localStorage.setItem("previousUsername", username);
  } catch (error) {
    console.error("Error storing username:", error);
  }
};

// Add a function to check if the session is new
const isNewSession = (): boolean => {
  try {
    const sessionCreationTime = localStorage.getItem("sessionCreationTime");
    if (!sessionCreationTime) {
      // No session creation time means it's a new session
      localStorage.setItem(
        "sessionCreationTime",
        new Date().getTime().toString()
      );
      return true;
    }

    const userSessionData = localStorage.getItem("userSessionData");
    if (!userSessionData) {
      // No user data means it's a new session
      localStorage.setItem(
        "sessionCreationTime",
        new Date().getTime().toString()
      );
      return true;
    }

    // If user just got a new name, it's a new session
    const { username } = JSON.parse(userSessionData);
    const previousUsername = localStorage.getItem("previousUsername");

    if (previousUsername && previousUsername !== username) {
      localStorage.setItem("previousUsername", username);
      localStorage.setItem(
        "sessionCreationTime",
        new Date().getTime().toString()
      );
      return true;
    }

    // Update previous username for next comparison
    localStorage.setItem("previousUsername", username);
    return false;
  } catch (error) {
    console.error("Error checking if session is new:", error);
    return false;
  }
};

interface Schedule {
  _id: string; // Changed from id: number to _id: string for MongoDB ObjectId
  title: string;
  description: string;
  votes: number;
  likes: number;
  dislikes: number;
  comments: string[];
  imageUrl: string;
}

interface SchedulePostProps {
  schedule: Schedule;
  onLike: () => void;
  onDislike: () => void;
  onComment: (comment: string) => void;
  userVote: "like" | "dislike" | null;
}

const SchedulePost: React.FC<SchedulePostProps> = ({
  schedule,
  onLike,
  onDislike,
  onComment,
  userVote,
}) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment(commentText.trim());
      setCommentText("");
    }
  };

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
              colorScheme={userVote === "like" ? "green" : "blue"}
              onClick={onLike}
              variant={userVote === "like" ? "solid" : "outline"}
            >
              {userVote === "like" ? "Liked" : "Like"}
            </Button>
            <Button
              leftIcon={<ChevronDownIcon />}
              colorScheme={userVote === "dislike" ? "red" : "blue"}
              onClick={onDislike}
              variant={userVote === "dislike" ? "solid" : "outline"}
            >
              {userVote === "dislike" ? "Disliked" : "Dislike"}
            </Button>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize='md' color='gray.500'>
              Liked by {schedule.likes} and disliked by {schedule.dislikes}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize='md' color='gray.500'>
              Total Votes {schedule.votes}
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
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && commentText.trim()) {
                  handleCommentSubmit();
                }
              }}
            />
            <Button colorScheme='blue' onClick={handleCommentSubmit}>
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
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [userVotes, setUserVotes] = useState<
    Record<string, "like" | "dislike" | null>
  >({});
  const [isLoaded, setIsLoaded] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const toast = useToast();

  // Initialize username from storage or create a new one
  const username = useRef<string>(
    getStoredUsername() || `user_${Math.floor(Math.random() * 10000)}`
  );
  const roomName = "schedule_voting_room";

  // Store username when it's generated or retrieved
  useEffect(() => {
    storeUsername(username.current);
  }, []);

  useEffect(() => {
    socketRef.current = io("http://localhost:5002");
    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.emit("join", {
        username: username.current,
        room: roomName,
      });
    });

    socket.on("status", (data) => {
      console.log("Status:", data.message);
    });

    socket.on("vote_update", (data) => {
      console.log("Vote update received:", data);
      setSchedules((prev) =>
        prev.map((schedule) => {
          if (schedule._id === data.schedule_id) {
            return {
              ...schedule,
              likes: data.likes,
              dislikes: data.dislikes,
            };
          }
          return schedule;
        })
      );

      if (data.username !== username.current) {
        toast({
          title: "Vote update",
          description: `${data.username} ${
            data.action === "add" ? "added" : "removed"
          } a ${data.vote_type} for schedule ${data.schedule_id}`,
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    });

    socket.on("comment_update", (data) => {
      console.log("Comment update received:", data);
      setSchedules((prev) =>
        prev.map((schedule) => {
          if (schedule._id === data.schedule_id) {
            return {
              ...schedule,
              comments: data.comments,
            };
          }
          return schedule;
        })
      );

      if (data.username !== username.current) {
        toast({
          title: "New comment",
          description: `${data.username} commented on schedule ${data.schedule_id}`,
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    });

    socket.on("error", (data) => {
      console.error("Error from server:", data.message);

      // Display error toast but don't remove schedules from UI
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });

    return () => {
      if (socket) {
        socket.emit("leave", {
          username: username.current,
          room: roomName,
        });
        socket.disconnect();
      }
    };
  }, [toast]);

  useEffect(() => {
    const loadUserVotes = () => {
      // Check if this is a new session
      if (isNewSession()) {
        console.log("New session detected - resetting user votes");
        localStorage.removeItem("userScheduleVotes");
        return {};
      }

      const savedVotes = localStorage.getItem("userScheduleVotes");
      if (savedVotes) {
        try {
          const parsedVotes = JSON.parse(savedVotes);
          setUserVotes(parsedVotes);
          return parsedVotes;
        } catch (err) {
          console.error("Failed to parse saved votes:", err);
          return {};
        }
      }
      return {};
    };

    const fetchSchedules = async () => {
      try {
        // First load user votes to ensure they're available when schedules are fetched
        const userVotesData = loadUserVotes();

        const res = await axios.get(
          "http://localhost:5002/schedulevotingmanager/all-schedules/redis"
        );

        setSchedules(res.data);
        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
        setIsLoaded(true);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("userScheduleVotes", JSON.stringify(userVotes));
    }
  }, [userVotes, isLoaded]);

  const handleLike = (id: string) => {
    if (!socketRef.current) {
      toast({
        title: "Connection Error",
        description: "Not connected to server",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const scheduleExists = schedules.some((schedule) => schedule._id === id);
    if (!scheduleExists) {
      toast({
        title: "Schedule Error",
        description: `Schedule with ID ${id} not found`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule._id === id) {
          const isLiked = userVotes[id] === "like";
          const isDisliked = userVotes[id] === "dislike";

          return {
            ...schedule,
            likes: isLiked ? schedule.likes - 1 : schedule.likes + 1,
            dislikes: isDisliked ? schedule.dislikes - 1 : schedule.dislikes,
          };
        }
        return schedule;
      })
    );

    if (userVotes[id] === "like") {
      socketRef.current.emit("vote", {
        username: username.current,
        room: roomName,
        schedule_id: id,
        vote_type: "like",
        action: "remove",
      });
      setUserVotes((prev) => ({ ...prev, [id]: null }));
    } else {
      socketRef.current.emit("vote", {
        username: username.current,
        room: roomName,
        schedule_id: id,
        vote_type: "like",
        action: "add",
      });

      if (userVotes[id] === "dislike") {
        socketRef.current.emit("vote", {
          username: username.current,
          room: roomName,
          schedule_id: id,
          vote_type: "dislike",
          action: "remove",
        });
      }

      setUserVotes((prev) => ({ ...prev, [id]: "like" }));
    }
  };

  const handleDislike = (id: string) => {
    if (!socketRef.current) {
      toast({
        title: "Connection Error",
        description: "Not connected to server",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const scheduleExists = schedules.some((schedule) => schedule._id === id);
    if (!scheduleExists) {
      toast({
        title: "Schedule Error",
        description: `Schedule with ID ${id} not found`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule._id === id) {
          const isLiked = userVotes[id] === "like";
          const isDisliked = userVotes[id] === "dislike";

          return {
            ...schedule,
            likes: isLiked ? schedule.likes - 1 : schedule.likes,
            dislikes: isDisliked
              ? schedule.dislikes - 1
              : schedule.dislikes + 1,
          };
        }
        return schedule;
      })
    );

    if (userVotes[id] === "dislike") {
      socketRef.current.emit("vote", {
        username: username.current,
        room: roomName,
        schedule_id: id,
        vote_type: "dislike",
        action: "remove",
      });
      setUserVotes((prev) => ({ ...prev, [id]: null }));
    } else {
      socketRef.current.emit("vote", {
        username: username.current,
        room: roomName,
        schedule_id: id,
        vote_type: "dislike",
        action: "add",
      });

      if (userVotes[id] === "like") {
        socketRef.current.emit("vote", {
          username: username.current,
          room: roomName,
          schedule_id: id,
          vote_type: "like",
          action: "remove",
        });
      }

      setUserVotes((prev) => ({ ...prev, [id]: "dislike" }));
    }
  };

  const handleComment = (id: string, comment: string) => {
    if (!socketRef.current) {
      toast({
        title: "Connection Error",
        description: "Not connected to server",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const scheduleExists = schedules.some((schedule) => schedule._id === id);
    if (!scheduleExists) {
      toast({
        title: "Schedule Error",
        description: `Schedule with ID ${id} not found`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule._id === id) {
          return {
            ...schedule,
            comments: [...schedule.comments, comment],
          };
        }
        return schedule;
      })
    );

    socketRef.current.emit("comment", {
      username: username.current,
      room: roomName,
      schedule_id: id,
      comment: comment,
    });
  };

  return (
    <Container maxW='100%' py={8} px={{ base: 4, md: 20 }} bg='gray.100'>
      <Stack spacing={8} mb={8}>
        <Heading as='h1' size='2xl' textAlign='center'>
          Schedules
        </Heading>
        <Text fontSize='lg' textAlign='center'>
          Explore and vote for your favorite schedules! Connected as{" "}
          {username.current}
        </Text>
      </Stack>
      {!isLoaded ? (
        <Box textAlign='center' py={10}>
          <Text fontSize='xl'>Loading schedules...</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {schedules.map((schedule) => (
            <SchedulePost
              key={schedule._id}
              schedule={schedule}
              onLike={() => handleLike(schedule._id)}
              onDislike={() => handleDislike(schedule._id)}
              onComment={(comment) => handleComment(schedule._id, comment)}
              userVote={userVotes[schedule._id] || null}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Schedules;
