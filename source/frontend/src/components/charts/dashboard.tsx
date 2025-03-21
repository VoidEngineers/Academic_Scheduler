import React from 'react';
import UserChart from '../charts/userChart/userChart';
import CourseChart from '../charts/courseChart/courseChart';
import LecturerChart from '../charts/lecturerChart/lecturerChart';
import Sidebar from '../../components/sideBar/sideBar';
import { Container, Title, ChartContainer } from '../../styles/dashboardStyles';
import { ContentContainer } from '../../styles/onBoardingStyle';

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <ContentContainer>
        <Container>
          <Title>Admin Dashboard</Title>
          <ChartContainer>
            <UserChart />
            <CourseChart />
            <LecturerChart />
          </ChartContainer>
        </Container>
      </ContentContainer>
    </div>
  );
};


export default Dashboard;