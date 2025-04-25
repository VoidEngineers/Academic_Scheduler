Academic Scheduler
A comprehensive scheduling platform tailored for academic institutions. It streamlines course management, timetable generation, and resource allocation to optimize administrative workflows and enhance user experience.

Project Structure
This project follows a modular monorepo architecture, consisting of:

frontend – React 19 application built with TypeScript and Vite

backend – Spring Boot application in Java with MongoDB integration

infrastructure – Terraform configurations for AWS deployment and NGINX setup

Tech Stack
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
Infrastructure as Code (IaC): Terraform

Cloud Provider: AWS

CI/CD: GitHub Actions, GitLab CI

Containerization: Docker

Web Server: NGINX

Getting Started
Prerequisites
Ensure the following tools are installed:

Node.js v20 or higher

pnpm v8 or higher

Docker and Docker Compose

Terraform

Frontend Setup
bash
Copy
Edit
# Navigate to the frontend directory
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm run dev
Backend Setup
bash
Copy
Edit
# Navigate to the backend directory
cd backend

# Run the Spring Boot application (via your IDE or terminal)
./mvnw spring-boot:run
Or use Docker Compose for local environment setup.

Infrastructure Deployment (AWS)
bash
Copy
Edit
# Navigate to the infrastructure directory
cd infrastructure

# Initialize and apply Terraform configuration
terraform init
terraform apply
Note: Ensure AWS credentials are configured in your environment.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
Contributions are welcome. Please follow the conventional commit format and submit pull requests to the appropriate branch.

Contact
For support or feature requests, please contact the maintainer or open an issue.
