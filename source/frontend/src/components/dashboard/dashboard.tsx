import { UserChart, CourseChart, LecturerChart, Container, Title, ChartContainer, ContentContainer, Flex } from './index';

const Dashboard: React.FC = () => {
  return (
    <Flex>
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
    </Flex>
  );
};


export default Dashboard;