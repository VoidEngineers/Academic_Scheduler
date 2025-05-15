import { Pie, ChartJS, ArcElement, Tooltip, Legend, Card } from './index';
ChartJS.register(ArcElement, Tooltip, Legend);

const CourseChart: React.FC = () => {
  const data = {
    labels: ['Course 1', 'Course 2', 'Course 3', 'Course 4'],
    datasets: [
      {
        label: 'Courses',
        data: [10, 20, 30, 40], // Example data
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <Card>
      <Pie data={data} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Courses Distribution' } } }} />
    </Card>
  );
};

export default CourseChart;