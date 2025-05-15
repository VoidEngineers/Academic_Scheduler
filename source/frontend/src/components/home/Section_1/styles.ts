import { BoxProps, CardProps, FlexProps, HeadingProps, TextProps, ButtonProps, AvatarProps, CircularProgressProps } from "@chakra-ui/react";

// Container styles
export const containerStyles: BoxProps = {
  maxW: '1200px',
  mx: 'auto',
  p: 6,
};

// Header section styles
export const headerFlexStyles: FlexProps = {
  align: 'center',
  mb: 8,
};

export const avatarStyles: AvatarProps = {
  size: 'lg',
  bg: 'blackAlpha.900',
  color: 'white',
  mr: 4,
};

export const welcomeHeadingStyles: HeadingProps = {
  as: 'h1',
  size: 'lg',
};

export const roleTextStyles: TextProps = {
  color: 'gray.600',
  fontSize: 'lg',
};

export const editButtonStyles: ButtonProps = {
  variant: 'link',
  color: 'blue.500',
  ml: 2,
  textDecoration: 'underline',
};

// Streak section styles
export const streakCardStyles: CardProps = {
  borderRadius: 'xl',
  mb: 6,
};

export const streakHeadingStyles: HeadingProps = {
  as: 'h2',
  size: 'md',
};

export const streakDescriptionStyles: TextProps = {
  color: 'gray.600',
};

export const streakCountStyles: TextProps = {
  fontSize: '3xl',
  fontWeight: 'bold',
};

export const streakLabelStyles: TextProps = {
  color: 'gray.600',
  fontSize: 'sm',
};

export const circularProgressStyles: CircularProgressProps = {
  value: 70,
  size: '80px',
  thickness: '4px',
  color: 'purple.500',
};

export const progressLabelTextStyles: TextProps = {
  fontSize: 'xs',
  color: 'gray.600',
};

// Courses section styles
export const courseSectionStyles: BoxProps = {
  mt: 8,
};

export const courseTitleFlexStyles: FlexProps = {
  justify: 'space-between',
  align: 'center',
  mb: 4,
};

export const courseSectionHeadingStyles: HeadingProps = {
  as: 'h2',
  size: 'md',
};

export const myLearningButtonStyles: ButtonProps = {
  variant: 'link',
  color: 'blue.500',
};

export const courseGridStyles = {
  columns: 1,
  spacing: 4,
};

// CourseCard styles
export const courseCardStyles: CardProps = {
  borderRadius: 'xl',
  mb: 4,
};

export const thumbnailBoxStyles: BoxProps = {
  position: 'relative',
  width: '120px',
  height: '80px',
  bg: 'gray.100',
  borderRadius: 'md',
  mr: 4,
};

export const thumbnailImageStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
  borderRadius: 'md',
};

export const playButtonStyles = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bg: 'white',
    _hover: { bg: 'gray.100' },
  };

export const courseTitleStyles: TextProps = {
  fontWeight: 'bold',
  fontSize: 'md',
};

export const courseSubtitleStyles: TextProps = {
  color: 'gray.600',
  fontSize: 'sm',
};

export const courseDurationStyles: TextProps = {
  color: 'gray.500',
  fontSize: 'xs',
};

export const menuButtonStyles = {
  size: 'sm',
  variant: 'ghost',
};