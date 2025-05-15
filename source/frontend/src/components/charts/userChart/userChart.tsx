import { Bar, ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Card } from './index';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserChart: React.FC = () => {
  const data = {
    labels: ['Students', 'Admins', 'Lecturers', 'Instructors'],
    datasets: [
      {
        label: 'Number of Users',
        data: [120, 5, 20, 15], // Example data
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <Card>
      <Bar data={data} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
    </Card>
  );
};

export default UserChart;