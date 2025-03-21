# Academic Scheduler

A comprehensive scheduling system for academic institutions, featuring course management, timetable generation, and resource allocation.

## Project Structure

This project is organized as a monorepo with the following components:

- **frontend**: React application with TypeScript and Vite
- **backend**: Java with springboot
- **infrastructure**: Terraform configuration for cloud deployment and nginx configuration

## Tech Stack

### Frontend

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **UI Library**: Chakra UI
- **Styling**: Emotion

### Backend

- **Runtime**: Java
- **Framework**: Springboot
- **Database**: MongoDB

### Infrastructure

- **IaC**: Terraform
- **Cloud Provider**: AWS
- **CI/CD**: GitHub Actions, GitLabs
- **Containerization**: Docker
- **WebServing**: Nginx

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- [pnpm](https://pnpm.io/installation) v8 or later
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Terraform](https://developer.hashicorp.com/terraform/downloads) (for deployment)

### Frontend Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```
