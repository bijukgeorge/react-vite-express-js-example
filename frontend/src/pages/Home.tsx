import { Link } from 'react-router-dom';
import { AppRoutes } from '@/AppRoutes';
import { Button, ButtonVariants } from '@/atoms/Button';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';

function Home() {
  const techStack = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React 19', description: 'Modern UI framework with hooks' },
        { name: 'Vite', description: 'Lightning-fast build tool' },
        { name: 'TypeScript', description: 'Type-safe JavaScript' },
        { name: 'Tailwind CSS', description: 'Utility-first styling' },
        { name: 'React Router', description: 'Client-side routing' },
        { name: 'Zod', description: 'Schema validation' },
      ],
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Express.js', description: 'Fast web framework' },
        { name: 'Prisma', description: 'Modern database toolkit' },
        { name: 'PostgreSQL', description: 'Robust relational database' },
        { name: 'TSyringe', description: 'Dependency injection' },
        { name: 'Winston', description: 'Structured logging' },
        { name: 'Zod', description: 'Runtime validation' },
      ],
    },
    {
      category: 'Development',
      technologies: [
        { name: 'Docker', description: 'Containerized development' },
        { name: 'ESLint', description: 'Code quality assurance' },
        { name: 'Prettier', description: 'Code formatting' },
        { name: 'JetBrains WebStorm', description: 'Main IDE for development' },
        { name: 'Cursor', description: 'AI coding assistant' },
        {
          name: 'Animal-Friendly',
          description: 'No animals were hurt during development',
        },
      ],
    },
  ];

  // HTML is AI generated and a little bit tweaked by hand
  // This isn't a main feature of the app, that's why I allowed myself to do a little shortcut here ;)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex flex-col items-center gap-10">
      <div className="flex flex-col items-center justify-center px-8 py-16">
        <div className="flex gap-8 mb-8">
          <a
            href="https://vite.dev"
            target="_blank"
            className="hover:scale-110 transition-transform duration-300"
          >
            <img src={viteLogo} className="h-20 w-20" alt="Vite logo" />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            className="hover:scale-110 transition-transform duration-300"
          >
            <img
              src={reactLogo}
              className="h-20 w-20 animate-spin"
              alt="React logo"
              style={{ animationDuration: '20s' }}
            />
          </a>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Learning Full-Stack Development
        </h1>

        <p className="text-xl text-gray-300 text-center mb-8 max-w-2xl">
          A hands-on learning project to practice and master React, Vite,
          Express.js, and TypeScript while exploring modern full-stack
          development patterns.
        </p>

        <div className="flex gap-4 mb-12">
          <Link to={AppRoutes.Products}>
            <Button
              variant={ButtonVariants.Primary}
              className="text-lg px-8 py-3"
            >
              Explore
            </Button>
          </Link>
          <Link to={AppRoutes.About}>
            <Button
              variant={ButtonVariants.Secondary}
              className="text-lg px-8 py-3"
            >
              About Me
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl w-full">
        <h2 className="text-3xl font-bold text-center mb-12">
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {techStack.map((stack, index) => (
            <div
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center text-blue-400">
                {stack.category}
              </h3>
              <div className="space-y-4">
                {stack.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex justify-between items-start bg-gray-900/50 rounded-md p-3"
                  >
                    <div>
                      <span className="font-medium text-white">
                        {tech.name}
                      </span>
                      <p className="text-sm text-gray-400 mt-1">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl w-full">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">
            Future Plans
          </h2>
          <div className="space-y-6">
            <p className="text-gray-300 text-center mb-8">
              As this is a learning project, I initially focused on
              functionalities themselves. Here's what I plan to implement next:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-yellow-400 text-2xl">🧪</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Testing Framework
                    </h3>
                    <p className="text-gray-300">
                      Tests are missing as this is a learning project and I
                      focused on functionalities itself. Planning to add unit,
                      integration, and E2E tests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-blue-400 text-2xl">📚</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Storybook Integration
                    </h3>
                    <p className="text-gray-300">
                      To unify components and create a design system for better
                      component documentation and consistency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-green-400 text-2xl">👥</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      User Rights & Authentication
                    </h3>
                    <p className="text-gray-300">
                      Add users rights, so not everyone will be able to edit
                      everything. Implementing proper access control and
                      permissions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-cyan-400 text-2xl">☁️</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Infrastructure as Code
                    </h3>
                    <p className="text-gray-300">
                      Infrastructure as a code for Azure CI/CD with automated
                      deployments and scalable cloud infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl w-full">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-8 text-orange-400">
            Folder Structure
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Components/services are grouped in the folders, as I wanted to have
            an option to split code into multiple files and keep related code
            together. Also it is a great place to put unit tests next to source
            files.
          </p>
        </div>
      </div>

      <div className="max-w-2xl w-full">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Practice & Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-3">
              <div className="text-2xl">🚀</div>
              <h3 className="font-semibold">Development</h3>
              <code className="block bg-gray-900 px-3 py-2 rounded text-sm">
                npm run install:all
              </code>
              <code className="block bg-gray-900 px-3 py-2 rounded text-sm">
                npm run dev:all
              </code>
            </div>
            <div className="space-y-3">
              <div className="text-2xl">🐳</div>
              <h3 className="font-semibold">Database</h3>
              <code className="block bg-gray-900 px-3 py-2 rounded text-sm">
                docker/dev-up.sh
              </code>
              <code className="block bg-gray-900 px-3 py-2 rounded text-sm">
                cd backend && npm run db:generate
              </code>
            </div>
            <div className="space-y-3">
              <div className="text-2xl">📊</div>
              <h3 className="font-semibold">Health Check</h3>
              <code className="block bg-gray-900 px-3 py-2 rounded text-sm">
                /api/health
              </code>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-8 text-gray-400 space-y-2">
        <p>
          Built as a learning exercise to practice modern web development
          skills.
        </p>
        <p className="text-sm">© 2025 Michał Kutrzuba</p>
      </div>
    </div>
  );
}

export default Home;
