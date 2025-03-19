import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';
import MainLayout from './layouts/mainLayout/mainLayout';
import {
  NotFoundContainer,
  ErrorCode,
  ErrorTitle,
  ErrorMessage,
  ButtonContainer,
  HomeButton,
  BackButton,
  IllustrationContainer
} from './styles/404Style';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  
  const goHome = () => {
    navigate('/');
  };
  
  return (
    <MainLayout>
      <NotFoundContainer>
        <IllustrationContainer>
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0Z"
              fill={useColorModeValue('#F7FAFC', '#2D3748')}
            />
            <path
              d="M100 25C141.421 25 175 58.5786 175 100C175 141.421 141.421 175 100 175C58.5786 175 25 141.421 25 100C25 58.5786 58.5786 25 100 25Z"
              fill={useColorModeValue('#EDF2F7', '#1A202C')}
            />
            <path
              d="M65 80C69.9706 80 74 75.9706 74 71C74 66.0294 69.9706 62 65 62C60.0294 62 56 66.0294 56 71C56 75.9706 60.0294 80 65 80Z"
              fill={useColorModeValue('#805AD5', '#B794F4')}
            />
            <path
              d="M135 80C139.971 80 144 75.9706 144 71C144 66.0294 139.971 62 135 62C130.029 62 126 66.0294 126 71C126 75.9706 130.029 80 135 80Z"
              fill={useColorModeValue('#805AD5', '#B794F4')}
            />
            <path
              d="M65 140C82.6731 140 97 125.673 97 108H33C33 125.673 47.3269 140 65 140Z"
              fill={useColorModeValue('#E53E3E', '#FC8181')}
            />
            <path
              d="M135 140C152.673 140 167 125.673 167 108H103C103 125.673 117.327 140 135 140Z"
              fill={useColorModeValue('#E53E3E', '#FC8181')}
            />
          </svg>
        </IllustrationContainer>
        
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorMessage>
          Oops! The page you're looking for seems to have gone on a break or doesn't exist.
        </ErrorMessage>
        
        <ButtonContainer>
          <HomeButton 
            onClick={goHome}
            colorScheme="purple"
            size="lg"
          >
            Go Home
          </HomeButton>
          <BackButton 
            onClick={goBack}
            variant="outline"
            colorScheme="purple"
            size="lg"
          >
            Go Back
          </BackButton>
        </ButtonContainer>
      </NotFoundContainer>
    </MainLayout>
  );
};

export default NotFound;