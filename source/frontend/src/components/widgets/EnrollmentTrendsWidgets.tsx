import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EnrollmentTrendsWidget: React.FC = () => {
  // Sample data - replace with actual data from your API
  const enrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Course Enrollments',
        data: [65, 78, 90, 81, 86, 95, 110],
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
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
        text: 'Monthly Enrollments',
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
      <Heading size="md" mb={4}>Enrollment Trends</Heading>
      <Box height="200px">
        <Line data={enrollmentData} options={options} />
      </Box>
      <Box mt={4}>
        <Text fontSize="sm">Average Monthly Enrollments: 86</Text>
      </Box>
    </Box>
  );
};

export default EnrollmentTrendsWidget;