import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CourseStatsWidget: React.FC = () => {
  // Sample data - replace with actual data from your API
  const courseData = {
    labels: ['Computer Science', 'Engineering', 'Business', 'Arts', 'Medicine'],
    datasets: [
      {
        label: 'Number of Courses',
        data: [42, 38, 30, 25, 15],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Courses by Department',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box bg="white" p={5} borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>Course Statistics</Heading>
      <Box height="200px">
        <Bar data={courseData} options={options} />
      </Box>
      <Box mt={4}>
        <Text fontSize="sm">Total Courses: 150</Text>
      </Box>
    </Box>
  );
};

export default CourseStatsWidget;