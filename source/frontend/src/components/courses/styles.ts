import styled from "@emotion/styled";
import { 
  Box, 
  Image as ChakraImage, 
  Text, 
  Progress as ChakraProgress, 
  HStack as ChakraHStack, 
  VStack as ChakraVStack, 
  Badge as ChakraBadge, 
  Flex as ChakraFlex 
} from "@chakra-ui/react";

export const CardContainer = styled(Box)`
  background-color: white;
  border-radius: var(--chakra-radii-lg);
  overflow: hidden;
  box-shadow: var(--chakra-shadows-sm);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: var(--chakra-shadows-md);
  }
`;

export const ImageContainer = styled(Box)`
  position: relative;
`;

export const CourseImage = styled(ChakraImage)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const FreeBadge = styled(ChakraBadge)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color-scheme: red;
  font-size: 0.875rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

export const ContentContainer = styled(ChakraVStack)`
  padding: 1.5rem;
  align-items: stretch;
  spacing: 4;
`;

export const CourseTitle = styled(Text)`
  font-size: 1.25rem;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RatingContainer = styled(ChakraHStack)`
  spacing: 2;
`;

export const RatingText = styled(Text)`
  color: var(--chakra-colors-gray-600);
`;

export const ProgressContainer = styled(Box)`
`;

export const ProgressLabel = styled(ChakraFlex)`
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const ProgressLabelText = styled(Text)`
  color: var(--chakra-colors-gray-600);
`;

export const ProgressValue = styled(Text)`
  font-weight: bold;
`;

export const CourseProgress = styled(ChakraProgress)`
  size: sm;
  color-scheme: blue;
  border-radius: full;
`;