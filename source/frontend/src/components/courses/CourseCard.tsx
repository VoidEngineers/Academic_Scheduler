import React, { useMemo } from "react";
import { FiStar } from "react-icons/fi";
import {
  CardContainer,
  ImageContainer,
  CourseImage,
  FreeBadge,
  ContentContainer,
  CourseTitle,
  RatingContainer,
  RatingText,
  ProgressContainer,
  ProgressLabel,
  ProgressLabelText,
  ProgressValue,
  CourseProgress
} from "./styles";
import { CourseCardProps } from "./types";

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  image,
  rating,
  completedLessons,
  totalLessons,
  isFree = false,
}) => {
  const progress = useMemo(() => 
    (completedLessons / totalLessons) * 100, 
    [completedLessons, totalLessons]
  );

  return (
    <CardContainer>
      <ImageContainer>
        <CourseImage src={image} alt={title} />
        {isFree && <FreeBadge>FREE</FreeBadge>}
      </ImageContainer>

      <ContentContainer>
        <CourseTitle>{title}</CourseTitle>

        <RatingContainer>
          <FiStar style={{ color: "#F6E05E" }} />
          <RatingText>{rating.toFixed(2)}</RatingText>
        </RatingContainer>

        <ProgressContainer>
          <ProgressLabel>
            <ProgressLabelText>Completed Lessons:</ProgressLabelText>
            <ProgressValue>
              {completedLessons} of {totalLessons}
            </ProgressValue>
          </ProgressLabel>
          <CourseProgress value={progress} />
        </ProgressContainer>
      </ContentContainer>
    </CardContainer>
  );
};