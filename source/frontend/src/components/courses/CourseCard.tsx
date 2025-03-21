import React from "react";
import {
  Box,
  Image,
  Text,
  Progress,
  HStack,
  VStack,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";

interface CourseCardProps {
  title: string;
  image: string;
  rating: number;
  completedLessons: number;
  totalLessons: number;
  isFree?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  image,
  rating,
  completedLessons,
  totalLessons,
  isFree = false,
}) => {
  const progress = (completedLessons / totalLessons) * 100;

  return (
    <Box
      bg='white'
      borderRadius='lg'
      overflow='hidden'
      shadow='sm'
      transition='all 0.2s'
      _hover={{ shadow: "md" }}
    >
      <Box position='relative'>
        <Image src={image} alt={title} w='full' h='200px' objectFit='cover' />
        {isFree && (
          <Badge
            position='absolute'
            top={4}
            right={4}
            colorScheme='red'
            fontSize='sm'
            px={3}
            py={1}
          >
            FREE
          </Badge>
        )}
      </Box>

      <VStack p={6} align='stretch' spacing={4}>
        <Text fontSize='xl' fontWeight='bold' noOfLines={2}>
          {title}
        </Text>

        <HStack spacing={2}>
          <FiStar style={{ color: "#F6E05E" }} />
          <Text color='gray.600'>{rating.toFixed(2)}</Text>
        </HStack>

        <Box>
          <Flex justify='space-between' mb={2}>
            <Text color='gray.600'>Completed Lessons:</Text>
            <Text fontWeight='bold'>
              {completedLessons} of {totalLessons}
            </Text>
          </Flex>
          <Progress
            value={progress}
            size='sm'
            colorScheme='blue'
            borderRadius='full'
          />
        </Box>
      </VStack>
    </Box>
  );
};
