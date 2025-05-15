import { Line, ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Card } from './index'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LecturerChart: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Lecturers Activity',
        data: [3, 2, 2, 5, 4, 6, 7], // Example data
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        fill: true
      }
    ]
  };

  return (
    <Card>
      <Line data={data} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
    </Card>
  );
};

export default LecturerChart;