import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  FormErrorMessage,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import type {User,UserFormValues} from '../../types/user';

type UserFormModalProps =  {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void | Promise<void>;
  availableCourses?: { id: string; name: string }[];
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  user,
  isOpen,
  onClose,
  onSubmit,
  availableCourses = [],
}) => {
  const isEditMode = Boolean(user);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [courseInput, setCourseInput] = useState('');

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<UserFormValues>({
    defaultValues: user
      ? {
          userId: user.id || user.id || '',
          userName: user.name || user.name || '',
          userEmail: user.email || user.email || '',
          userRole: user.userRole || '',
          countryCode: user.countryCode || '+94',
          courses: user.courses || [],
        }
      : {
          userId: '',
          userName: '',
          userEmail: '',
          userRole: '',
          countryCode: '+94',
          courses: [],
        },
  });

  // Sync internal state with form state
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'courses') {
        setSelectedCourses((value.courses || []).filter((course): course is string => course !== undefined));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Reset form when modal opens/closes or user changes
// Only showing the part that needs to be changed

useEffect(() => {
  if (isOpen) {
    const defaultValues = user
      ? {
          userId: user.id || user.id || '',
          userName: user.name || user.name || '', // FIXED: changed from 'name' to 'userName'
          userEmail: user.email || user.email || '', // FIXED: changed from 'email' to 'userEmail'
          userRole: user.userRole || '',
          countryCode: user.countryCode || '+94',
          courses: user.courses || [],
        }
      : {
          userId: '',
          userName: '', // FIXED: changed from 'name' to 'userName'
          userEmail: '', // FIXED: changed from 'email' to 'userEmail'
          userRole: '',
          countryCode: '+94',
          courses: [],
        };
    
    reset(defaultValues);
    setSelectedCourses(defaultValues.courses.filter((course): course is string => course !== undefined));
  }
}, [isOpen, user, reset]);

  const handleAddCourse = () => {
    if (courseInput && !selectedCourses.includes(courseInput)) {
      const newCourses = [...selectedCourses, courseInput];
      setSelectedCourses(newCourses);
      setValue('courses', newCourses);
      setCourseInput('');
    }
  };

  const handleRemoveCourse = (course: string) => {
    const newCourses = selectedCourses.filter(c => c !== course);
    setSelectedCourses(newCourses);
    setValue('courses', newCourses);
  };

  const onFormSubmit = (data: UserFormValues) => {
    console.log('Form data being submitted:', data);
    
    // transformer
    const transformedData = {
      ...data,
      id: data.userId,           
      name: data.userName,       
      email: data.userEmail,     
      userRole: data.userRole,   
      countryCode: data.countryCode,
      courses: data.courses,
      password: data.password
    };
    
    console.log('Transformed data:', transformedData);
    onSubmit(transformedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? 'Edit User' : 'Add New User'}</ModalHeader>
        <ModalCloseButton />
        
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={!!errors.userId} isRequired>
                <FormLabel>User ID</FormLabel>
                <Input
                  {...register('userId', {
                    required: 'User ID is required',
                  })}
                  placeholder="e.g., u11123"
                />
                <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.userName} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register('userName', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                  placeholder="e.g., john doe"
                />
                <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.userEmail} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register('userEmail', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  placeholder="e.g., john.doe@example.com"
                />
                <FormErrorMessage>{errors.userEmail?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.countryCode} isRequired>
                <FormLabel>Country Code</FormLabel>
                <Input
                  {...register('countryCode', {
                    required: 'Country code is required',
                  })}
                  placeholder="e.g., +94"
                  defaultValue="+94"
                />
                <FormErrorMessage>{errors.countryCode?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.userRole} isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Select role"
                  {...register('userRole', { required: 'Role is required' })}
                >
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Admin">Admin</option>
                </Select>
                <FormErrorMessage>{errors.userRole?.message}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Courses</FormLabel>
                <HStack mb={2}>
                  {availableCourses.length > 0 ? (
                    <Select 
                      placeholder="Select course" 
                      value={courseInput}
                      onChange={(e) => setCourseInput(e.target.value)}
                    >
                      {availableCourses
                        .filter(course => !selectedCourses.includes(course.id))
                        .map(course => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                    </Select>
                  ) : (
                    <Input
                      placeholder="Course code (e.g., CS101)"
                      value={courseInput}
                      onChange={(e) => setCourseInput(e.target.value)}
                    />
                  )}
                  <Button onClick={handleAddCourse}>Add</Button>
                </HStack>
                
                <Box>
                  {selectedCourses.length > 0 ? (
                    <Flex wrap="wrap" gap={2}>
                      {selectedCourses.map(course => (
                        <Tag
                          key={course}
                          size="md"
                          borderRadius="full"
                          variant="solid"
                          colorScheme="blue"
                        >
                          <TagLabel>{course}</TagLabel>
                          <TagCloseButton onClick={() => handleRemoveCourse(course)} />
                        </Tag>
                      ))}
                    </Flex>
                  ) : (
                    <Text fontSize="sm" color="gray.500">No courses selected</Text>
                  )}
                </Box>
                
                {/* Hidden input for React Hook Form to track courses */}
                <Controller
                  name="courses"
                  control={control}
                  render={({ field }) => (
                    <input type="hidden" {...field} value={field.value?.join(',')} />
                  )}
                />
              </FormControl>

              {!isEditMode && (
                <FormControl isInvalid={!!errors.password} isRequired={!isEditMode}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    {...register('password', {
                      required: !isEditMode ? 'Password is required' : false,
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
            >
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};