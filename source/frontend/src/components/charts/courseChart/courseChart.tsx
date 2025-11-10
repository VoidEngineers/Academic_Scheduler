import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { Card } from '../../../styles/courseChartStyles';
import { CourseChartProps } from './types';



const CHART_COLORS = {
  background: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)'
  ],
  border: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)'
  ]
};

const CourseChart: React.FC<CourseChartProps> = ({
  courseData = [10, 20, 30, 40],
  courseLabels = ['Course 1', 'Course 2', 'Course 3', 'Course 4'],
  title = 'Courses Distribution'
}) => {
  const chartData: ChartData<'pie'> = {
    labels: courseLabels,
    datasets: [
      {
        label: 'Courses',
        data: courseData,
        backgroundColor: CHART_COLORS.background,
        borderColor: CHART_COLORS.border,
        borderWidth: 1
      }
    ]
  };

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: title
      }
    }
  };

  return (
    <Card>
      <Pie data={chartData} options={chartOptions} />
    </Card>
  );
};


export default CourseChart;