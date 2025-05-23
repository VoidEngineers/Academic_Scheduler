🎓 Academic Scheduler
Academic Scheduler is a comprehensive scheduling platform tailored for academic institutions. It streamlines course management, timetable generation, and resource allocation to optimize administrative workflows and enhance user experience.

📁 Project Structure
This monorepo follows a modular architecture and consists of:

Module	Description
frontend	React 19 application using TypeScript and Vite
backend	Spring Boot application with MongoDB integration
infrastructure	Terraform configurations for AWS deployment and NGINX setup

🛠️ Tech Stack
Frontend
Framework: React 19

Language: TypeScript

Build Tool: Vite

Package Manager: pnpm

UI Library: Chakra UI

Styling: Emotion

Backend
Language: Java

Framework: Spring Boot

Database: MongoDB

Infrastructure
IaC: Terraform

Cloud Provider: AWS

CI/CD: GitHub Actions, GitLab CI

Containerization: Docker

Web Server: NGINX

🚀 Getting Started
✅ Prerequisites
Ensure the following tools are installed:

Node.js v20+

pnpm v8+

Docker & Docker Compose

Terraform

Java 17+

Maven

📦 Frontend Setup
bash
Copy
Edit
# Navigate to the frontend directory
cd frontend

# Install dependencies
pnpm install

# Start the development server
pnpm run dev
🧠 Backend Setup
bash
Copy
Edit
# Navigate to the backend directory
cd backend

# Run the Spring Boot application
./mvnw spring-boot:run
Or using Docker Compose:

bash
Copy
Edit
docker-compose up --build
☁️ Infrastructure Deployment (AWS)
bash
Copy
Edit
# Navigate to the infrastructure directory
cd infrastructure

# Initialize and apply Terraform configuration
terraform init
terraform apply
Note: Ensure your AWS credentials are properly configured in your environment.

🧪 Running Tests
Frontend: pnpm test

Backend: ./mvnw test

🤝 Contributing
We welcome contributions! Please:

Follow the Conventional Commits specification.

Submit pull requests to the appropriate feature or dev branch.

Ensure all commits are tested and documented.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

📬 Contact
For support, bug reports, or feature requests, please open an issue or contact the maintainer.

Would you like help adding badges (build status, license, etc.) or a project diagram as well?









