# Multi-Agent AI Chat Application

## Overview

The Multi-Agent AI Chat Application is a scalable, microservices-based platform that enables users to interact with AI-powered agents through a modern and intuitive chat interface. The system is designed with a strong emphasis on modularity, maintainability, and scalability by separating core functionalities into independent services.

The application provides secure user authentication, persistent conversation management, intelligent AI interactions, and a responsive frontend experience. An API Gateway serves as the single entry point for all client requests, ensuring secure and efficient communication between services.

## Architecture

The application follows a **microservices architecture**, where each service is responsible for a specific business domain.

* **API Gateway** – Central entry point that authenticates incoming requests and routes them to the appropriate service.
* **Authentication Service** – Handles user registration, login, logout, and JWT-based authentication.
* **Chat Service** – Manages conversations, stores messages, and maintains users' chat history.
* **Agent Service** – Processes user prompts, integrates with Google's Gemini Large Language Model (LLM), and generates AI responses.
* **Frontend** – A React-based Single Page Application (SPA) that provides a clean and responsive user interface.

## Technology Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis
* JSON Web Tokens (JWT)
* Google Gemini API
* express-http-proxy

### AI & Orchestration

* Large Language Models (LLMs)
* Google Gemini
* Grok
* LangChain
* LangGraph

### Frontend

* React.js
* Vite
* CSS

### DevOps

* Docker

## Key Features

* Secure JWT-based authentication
* Microservices architecture
* API Gateway pattern
* AI-powered conversational interface
* Persistent conversation and message history
* Google Gemini integration
* RESTful APIs
* Redis for caching and messaging
* Responsive React frontend
* Dockerized deployment

## Design Principles

The project is built around the following engineering principles:

* Separation of concerns
* Modular service architecture
* Scalability
* Maintainability
* Secure API communication
* Independent service deployment

## Conclusion

The Multi-Agent AI Chat Application demonstrates a modern approach to building AI-powered systems using a scalable microservices architecture. By combining secure authentication, modular backend services, intelligent AI integration, and a responsive frontend, the platform provides a robust foundation for developing next-generation conversational applications while remaining flexible for future expansion.

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### Install Dependencies

Install dependencies for each service.

```bash
cd gateway && npm install
cd ../auth-service && npm install
cd ../chat-service && npm install
cd ../agent-service && npm install
cd ../frontend && npm install
```

### Configure Environment Variables

Create a `.env` file in each backend service and add the required environment variables (e.g., `MONGODB_URI`, `JWT_SECRET`, `REDIS_URL`, `GEMINI_API_KEY`).

### Run the Application

Start each service in a separate terminal.

```bash
# Gateway
cd gateway && npm run dev

# Authentication Service
cd auth-service && npm run dev

# Chat Service
cd chat-service && npm run dev

# Agent Service
cd agent-service && npm run dev

# Frontend
cd frontend && npm run dev
```

### Docker (Optional)

```bash
docker compose up --build
```
