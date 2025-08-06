# Learning Full-Stack Development

A hands-on learning project to practice and master React, Vite, Express.js, and TypeScript while exploring modern full-stack development patterns.

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI framework with hooks
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zod** - Schema validation

### Backend
- **Express.js** - Fast web framework
- **Prisma** - Modern database toolkit
- **PostgreSQL** - Robust relational database
- **TSyringe** - Dependency injection
- **Winston** - Structured logging
- **Zod** - Runtime validation

### Development
- **Docker** - Containerized development
- **ESLint** - Code quality assurance
- **Prettier** - Code formatting
- **JetBrains WebStorm** - Main IDE for development
- **Cursor** - AI coding assistant
- **Animal-Friendly** - No animals were hurt during development

## 📁 Project Structure

Components and services are grouped in folders to have an option to split code into multiple files and keep related code together. This structure also provides a great place to put unit tests next to source files.

```
react-vite-express-js-example/
├── frontend/          # React + Vite frontend application
├── backend/           # Express.js backend API
├── shared/            # Shared types and utilities
├── docker/            # Docker configuration files
└── infrastructure/    # Infrastructure as Code (planned)
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- Docker and Docker Compose
- npm or yarn

### Installation & Development

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start the database:**
   ```bash
   docker/dev-up.sh
   ```

3. **Generate database schema:**
   ```bash
   cd backend && npm run db:generate
   ```

4. **Start development servers:**
   ```bash
   npm run dev:all
   ```

### Health Check
Once everything is running, you can check the API health at:
```
GET /api/health
```

## 🔮 Future Plans

As this is a learning project, I initially focused on functionalities themselves. Here's what I plan to implement next:

### 🧪 Testing Framework
Tests are missing as this is a learning project and I focused on functionalities itself. Planning to add unit, integration, and E2E tests.

### 📚 Storybook Integration
To unify components and create a design system for better component documentation and consistency.

### 👥 User Rights & Authentication
Add user rights, so not everyone will be able to edit everything. Implementing proper access control and permissions.

### ☁️ Infrastructure as Code
Infrastructure as code for Azure CI/CD with automated deployments and scalable cloud infrastructure.

## 🎯 Learning Goals

This project serves as a practical exercise to:
- Master modern React patterns and hooks
- Understand full-stack TypeScript development
- Practice with modern build tools (Vite)
- Learn backend API design with Express.js
- Explore database management with Prisma
- Implement proper project structure and organization
- Practice with containerized development using Docker

## 🤝 Contributing

This is a personal learning project, but feel free to explore the code and suggest improvements or ask questions!

## 📝 License

Built as a learning exercise to practice modern web development skills.

© 2025 Michał Kutrzuba 