export type CourseCardProps = {
  title: string;
  image: string;
  rating: number;
  completedLessons: number;
  totalLessons: number;
  isFree?: boolean;
}