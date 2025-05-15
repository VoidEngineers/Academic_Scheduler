import { BoxProps, CardProps, HeadingProps, TextProps, ButtonProps, FlexProps, IconProps, StackProps, ImageProps } from "@chakra-ui/react";

// Container styles
export const containerStyles: BoxProps = {
    maxW: '1200px',
    mx: 'auto',
    p: 6,
};

// Section styles
export const sectionStyles: BoxProps = {
    mb: 8,
};

// Heading styles
export const mainHeadingStyles: HeadingProps = {
    as: 'h2',
    size: 'lg',
    mb: 4,
};

export const subHeadingStyles: HeadingProps = {
    as: 'h3',
    size: 'md',
    mb: 2,
};

export const certificationTitleStyles: FlexProps = {
    align: 'center',
    mb: 4,
};

export const certificationTextStyles: TextProps = {
    fontSize: 'lg',
    fontWeight: 'semibold',
};

export const editButtonStyles: ButtonProps = {
    variant: 'link',
    color: 'purple.500',
    ml: 2,
};

// Path info box styles
export const pathInfoBoxStyles: BoxProps = {
    bg: 'purple.50',
    p: 6,
    borderRadius: 'lg',
    mb: 6,
};

export const pathInfoTextStyles: TextProps = {
    mb: 4,
};

export const viewAllButtonStyles: ButtonProps = {
    variant: 'link',
    color: 'purple.500',
};

// Path card styles
export const pathCardStyles: CardProps = {
    mb: 8,
    cursor: 'pointer',
    _hover: { shadow: "md" },
};

export const pathCardFlexStyles: FlexProps = {
    align: 'center',
    justify: 'space-between',
};

export const pathIconBoxStyles: BoxProps = {
    bg: 'purple.100',
    p: 4,
    borderRadius: 'full',
    mr: 4,
};

export const pathIconStyles = {
    boxSize: 6,
    color: 'purple.500',
};

export const pathCardTextBoxStyles: BoxProps = {};

export const pathTypeTextStyles: TextProps = {
    color: 'gray.600',
};

export const pathTitleStyles: HeadingProps = {
    size: 'md',
};

export const pathSubtitleStyles: TextProps = {
    color: 'gray.600',
};

export const chevronIconStyles = {
    boxSize: 6,
    color: 'gray.400',
};

// Course card styles
export const courseCardStyles: CardProps = {
    borderRadius: 'lg',
    overflow: 'hidden',
    h: '100%',
    m: 1,
    cursor: 'pointer',
    _hover: { transform: "scale(1.02)", transition: "transform 0.2s" },
};

export const courseImageStyles: ImageProps = {
    height: '160px',
    objectFit: 'cover',
};

export const courseInfoStackStyles: StackProps = {
    spacing: 2,
};

export const courseTitleStyles: HeadingProps = {
    size: 'md',
    noOfLines: 2,
};

export const instructorTextStyles: TextProps = {
    color: 'gray.600',
};

export const ratingStackStyles: StackProps = {};

export const ratingTextStyles: TextProps = {
    fontWeight: 'bold',
};

export const starStackStyles: StackProps = {
    spacing: 1,
};

export const starIconStyles = (rating: number, index: number): IconProps => ({
    color: index < Math.floor(rating) ? "yellow.400" : "gray.300",
});

export const totalRatingsTextStyles: TextProps = {
    color: 'gray.600',
};

// Carousel container styles
export const carouselContainerStyles: BoxProps = {
    mt: 10,
};