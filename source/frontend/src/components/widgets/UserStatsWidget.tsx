import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const UserStatsWidget: React.FC = () => {
  // Sample data - replace with actual data from your API
  const userData = {
    labels: ['Students', 'Lecturers', 'Admins'],
    datasets: [
      {
        label: 'User Distribution',
        data: [300, 50, 5],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'User Distribution',
      },
    },
  };

  return (
    <Box bg="white" p={5} borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>User Statistics</Heading>
      <Box height="200px">
        <Doughnut data={userData} options={options} />
      </Box>
      <Box mt={4}>
        <Text fontSize="sm">Total Users: 355</Text>
      </Box>
    </Box>
  );
};

export default UserStatsWidget;