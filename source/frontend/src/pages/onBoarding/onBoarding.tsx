// import React, { useState } from 'react';
import {
  Step,
  StepDescription as ChakraStepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useColorModeValue,
  Box
} from '@chakra-ui/react';
import { CheckIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { FaUser, FaBook, FaCalendarAlt } from 'react-icons/fa';
// Removed MainLayout import as we no longer need it
import {
  OnboardingContainer,
  ContentContainer,
  StepsContainer,
  ContentBox,
  NavigationContainer,
  StepHeading,
  StepDescription,
  CardGrid,
  StepCard,
  CardContent,
  FeatureIcon,
  CardHeading,
  CardDescription,
  CompletionContainer,
  CompletionIcon,
  NextButton,
  BackButton
} from '../../styles/onBoardingStyle';

const steps = [
  { title: 'Profile Setup', description: 'Tell us about yourself' },
  { title: 'Course Preferences', description: 'Select your interests' },
  { title: 'Schedule Setup', description: 'Set your availability' },
];

const OnBoarding: React.FC = () => {
  // const [isLoggedIn] = useState(true); // Normally from auth context
  // const [userName] = useState('New User');
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');
  const accentColor = useColorModeValue('purple.600', 'purple.300');

  const handleNextStep = () => setActiveStep(activeStep + 1);
  const handlePrevStep = () => setActiveStep(activeStep - 1);
  
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <StepHeading>Welcome to Academic Scheduler!</StepHeading>
            <StepDescription>
              Let's start by setting up your profile. This information helps us personalize
              your experience and connect you with relevant courses.
            </StepDescription>
            <CardGrid columns={{ base: 1, md: 2 }}>
              <StepCard bgColor={cardBg}>
                <CardContent>
                  <FeatureIcon as={FaUser} accentColor={accentColor} />
                  <CardHeading>Personal Details</CardHeading>
                  <CardDescription>Complete your profile information to get started</CardDescription>
                </CardContent>
              </StepCard>
              <StepCard bgColor={cardBg}>
                <CardContent>
                  <FeatureIcon as={FaCalendarAlt} accentColor={accentColor} />
                  <CardHeading>Academic Background</CardHeading>
                  <CardDescription>Tell us about your education and academic interests</CardDescription>
                </CardContent>
              </StepCard>
            </CardGrid>
          </>
        );
      case 1:
        return (
          <>
            <StepHeading>Course Preferences</StepHeading>
            <StepDescription>
              Select subjects and topics that interest you. This helps us recommend courses
              that align with your academic goals.
            </StepDescription>
            <CardGrid columns={{ base: 1, md: 3 }}>
              <StepCard bgColor={cardBg}>
                <CardContent>
                  <FeatureIcon as={FaBook} accentColor={accentColor} />
                  <CardHeading>Subject Areas</CardHeading>
                  <CardDescription>Select your preferred academic subjects</CardDescription>
                </CardContent>
              </StepCard>
              <StepCard bgColor={cardBg}>
                <CardContent>
                  <FeatureIcon as={FaCalendarAlt} accentColor={accentColor} />
                  <CardHeading>Course Format</CardHeading>
                  <CardDescription>Choose your preferred learning formats</CardDescription>
                </CardContent>
              </StepCard>
              <StepCard bgColor={cardBg}>
                <CardContent>
                  <FeatureIcon as={FaBook} accentColor={accentColor} />
                  <CardHeading>Difficulty Level</CardHeading>
                  <CardDescription>Select your preferred course difficulty</CardDescription>
                </CardContent>
              </StepCard>
            </CardGrid>
          </>
        );
      case 2:
        return (
          <>
            <StepHeading>Schedule Setup</StepHeading>
            <StepDescription>
              Set up your availability and scheduling preferences to help us find courses
              that fit your timetable.
            </StepDescription>
            <CardGrid columns={{ base: 1, md: 2 }}>
              <StepCard bgColor={cardBg}>
                <CardContent>
                  <FeatureIcon as={FaCalendarAlt} accentColor={accentColor} />
                  <CardHeading>Weekly Availability</CardHeading>
                  <CardDescription>Mark your available times during the week</CardDescription>
                </CardContent>
              </StepCard>
              <StepCard bgColor={cardBg}>
                <CardContent>
                  <FeatureIcon as={FaCalendarAlt} accentColor={accentColor} />
                  <CardHeading>Term Planning</CardHeading>
                  <CardDescription>Set your academic goals for this term</CardDescription>
                </CardContent>
              </StepCard>
            </CardGrid>
          </>
        );
      default:
        return (
          <CompletionContainer>
            <CompletionIcon as={CheckIcon} accentColor={accentColor} />
            <StepHeading>All Set!</StepHeading>
            <StepDescription>
              You've completed the onboarding process. Your academic scheduler is now ready to use!
            </StepDescription>
            <NextButton 
              size="lg" 
              rightIcon={<ArrowForwardIcon />}
            >
              Go to Dashboard
            </NextButton>
          </CompletionContainer>
        );
    }
  };

  // Removed MainLayout wrapper
  return (
    <OnboardingContainer bgColor={bgColor}>
      <ContentContainer>
        <StepsContainer>
          <Stepper index={activeStep} width="100%" colorScheme="purple">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus 
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink={0}>
                  <StepTitle>{step.title}</StepTitle>
                  <ChakraStepDescription>{step.description}</ChakraStepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          
          <ContentBox>
            {renderStepContent()}
          </ContentBox>
          
          <NavigationContainer>
            <BackButton 
              isDisabled={activeStep === 0} 
              onClick={handlePrevStep}
            >
              Back
            </BackButton>
            <NextButton 
              onClick={handleNextStep}
              rightIcon={activeStep < steps.length - 1 ? <ArrowForwardIcon /> : undefined}
            >
              {activeStep < steps.length - 1 ? 'Next' : 'Complete'}
            </NextButton>
          </NavigationContainer>
        </StepsContainer>
      </ContentContainer>
    </OnboardingContainer>
  );
};

export default OnBoarding;