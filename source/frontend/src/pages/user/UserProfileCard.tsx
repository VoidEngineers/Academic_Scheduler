import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Badge,
} from "@chakra-ui/react";

interface UserProfileData {
  registrationDate: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  skillOccupation?: string;
  biography?: string;
}

interface UserProfileCardProps {
  userData: UserProfileData;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='md' mb={4}>
              My Profile
            </Heading>
            <HStack justify='space-between'>
              <Text color='gray.500' fontSize='sm'>
                Registration Date
              </Text>
              <Text fontSize='sm'>{formatDate(userData.registrationDate)}</Text>
            </HStack>
          </Box>

          <VStack align='stretch' spacing={3}>
            <HStack justify='space-between'>
              <Text color='gray.500'>First Name</Text>
              <Text fontWeight='medium'>{userData.firstName}</Text>
            </HStack>

            <HStack justify='space-between'>
              <Text color='gray.500'>Last Name</Text>
              <Text fontWeight='medium'>{userData.lastName}</Text>
            </HStack>

            <HStack justify='space-between'>
              <Text color='gray.500'>Username</Text>
              <Text fontWeight='medium'>{userData.username}</Text>
            </HStack>

            <HStack justify='space-between'>
              <Text color='gray.500'>Email</Text>
              <Text fontWeight='medium'>{userData.email}</Text>
            </HStack>

            <HStack justify='space-between'>
              <Text color='gray.500'>Phone Number</Text>
              <Text fontWeight='medium'>
                {userData.phoneNumber || (
                  <Badge colorScheme='gray'>Not provided</Badge>
                )}
              </Text>
            </HStack>

            <HStack justify='space-between'>
              <Text color='gray.500'>Skill/Occupation</Text>
              <Text fontWeight='medium'>
                {userData.skillOccupation || (
                  <Badge colorScheme='gray'>Not provided</Badge>
                )}
              </Text>
            </HStack>
          </VStack>

          <Box>
            <Text color='gray.500' mb={2}>
              Biography
            </Text>
            <Text>
              {userData.biography || (
                <Badge colorScheme='gray'>Not provided</Badge>
              )}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default UserProfileCard;
