export type CourseCardProps = {
  title: string;
  instructor: string;
  rating: number;
  totalRatings: string;
  imageUrl: string;
  onClick?: () => void;
}

export type PathCardProps = {
  title: string;
  subtitle: string;
  type: string;
  onClick?: () => void;
}