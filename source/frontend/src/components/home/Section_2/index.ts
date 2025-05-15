// ** Re-export component
export { default as Section2 } from './Section2';

// ** Re-export types
export * from './types';

// ** Import all styles
import * as AllStyles from './styles';

// Group and re-export styles by section
export const containerStyles = AllStyles.containerStyles;

// ** Layout and section styles
export const layoutStyles = {
  sectionStyles: AllStyles.sectionStyles,
  mainHeadingStyles: AllStyles.mainHeadingStyles,
  subHeadingStyles: AllStyles.subHeadingStyles,
};

// ** Certification path styles
export const certificationStyles = {
  certificationTitleStyles: AllStyles.certificationTitleStyles,
  certificationTextStyles: AllStyles.certificationTextStyles,
  editButtonStyles: AllStyles.editButtonStyles,
  pathInfoBoxStyles: AllStyles.pathInfoBoxStyles,
  pathInfoTextStyles: AllStyles.pathInfoTextStyles,
  viewAllButtonStyles: AllStyles.viewAllButtonStyles,
};

// ** Path card styles
export const pathCardStyles = {
  pathCardStyles: AllStyles.pathCardStyles,
  pathCardFlexStyles: AllStyles.pathCardFlexStyles,
  pathIconBoxStyles: AllStyles.pathIconBoxStyles,
  pathIconStyles: AllStyles.pathIconStyles,
  pathCardTextBoxStyles: AllStyles.pathCardTextBoxStyles,
  pathTypeTextStyles: AllStyles.pathTypeTextStyles,
  pathTitleStyles: AllStyles.pathTitleStyles,
  pathSubtitleStyles: AllStyles.pathSubtitleStyles,
  chevronIconStyles: AllStyles.chevronIconStyles,
};

// ** Course card styles
export const courseStyles = {
  courseCardStyles: AllStyles.courseCardStyles,
  courseImageStyles: AllStyles.courseImageStyles,
  courseInfoStackStyles: AllStyles.courseInfoStackStyles,
  courseTitleStyles: AllStyles.courseTitleStyles,
  instructorTextStyles: AllStyles.instructorTextStyles,
  ratingStackStyles: AllStyles.ratingStackStyles,
  ratingTextStyles: AllStyles.ratingTextStyles,
  starStackStyles: AllStyles.starStackStyles,
  starIconStyles: AllStyles.starIconStyles,
  totalRatingsTextStyles: AllStyles.totalRatingsTextStyles,
  carouselContainerStyles: AllStyles.carouselContainerStyles,
};

// ** Also re-export individual styles for backward compatibility
export * from './styles';