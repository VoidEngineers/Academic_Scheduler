Academic Scheduler
The Academic Scheduler is a web application designed to help students and faculty manage their academic timetables, schedule classes, exams, and track their academic activities efficiently. This project utilizes modern web technologies to offer a seamless, responsive, and user-friendly interface.

Technologies Used
Frontend
React: A JavaScript library for building user interfaces.
TypeScript: Strongly typed programming language that improves code quality and maintainability.
Chakra UI: A modern React UI library for building accessible and responsive web applications.
SCSS: Sassy CSS, a preprocessor to write cleaner and more powerful styles.
Backend
Spring Boot: A Java-based framework for building backend applications with minimal setup.
PostgreSQL: A relational database for storing academic and user data.
Development Tools
pnpm: Fast and efficient package manager to manage project dependencies.
GitHub Actions: Automate workflows for tasks like linting, testing, and deployment.
Installation

1. Clone the repository
   bash
   Copy
   git clone https://github.com/your-username/academic-scheduler.git
   cd academic-scheduler
2. Set up the Backend (Spring Boot with PostgreSQL)
   Clone or Download the Spring Boot Backend:

Follow the Spring Boot setup guide if you don't have the backend repository.
Install PostgreSQL: Make sure you have PostgreSQL installed on your machine. You can follow the PostgreSQL installation guide if it's not installed.

Configure the database:

Create a new database for the Academic Scheduler application.
Configure the database connection in the application.properties or application.yml file in the Spring Boot project.
Example configuration for application.properties:

properties
Copy
spring.datasource.url=jdbc:postgresql://localhost:5432/academic_scheduler_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.datasource.driver-class-name=org.postgresql.Driver
Run the Backend: Navigate to the Spring Boot project directory and run the application:

bash
Copy
./mvnw spring-boot:run
Your backend server should now be running on http://localhost:8080.

3. Set up the Frontend
   Install dependencies: Use pnpm to install the frontend dependencies:

bash
Copy
pnpm install
Run the frontend development server:

bash
Copy
pnpm dev
The app should now be running on http://localhost:3000 and will be able to interact with the backend.

4. Environment Configuration
   Set up .env (if needed): If your project requires environment variables (e.g., API keys), create a .env file and configure the variables:

Example .env file for the frontend:

env
Copy
REACT_APP_API_URL=http://localhost:8080
Ensure PostgreSQL and Spring Boot are running: Make sure that the PostgreSQL database and Spring Boot application are both running before interacting with the frontend.

GitHub Actions
The repository includes several GitHub Actions workflows for automating tasks like code linting, testing, and deployment.

Workflows
Auto Assign Workflow: Automatically assigns reviewers and labels to pull requests.

Proof HTML Workflow: Validates the HTML structure to ensure consistency and quality.

Contributing
We welcome contributions to improve the Academic Scheduler! If you'd like to contribute, please follow these steps:

Fork the repository
Create a new branch for your feature or bugfix
Make your changes
Run tests: Make sure everything works (pnpm test or your equivalent testing setup)
Submit a pull request with a detailed description of your changes
License
This project is licensed under the MIT License - see the LICENSE file for more information.

Acknowledgments
Thanks to the open-source community for the tools and libraries that made this project possible.
Special thanks to all contributors who help in improving the project.
