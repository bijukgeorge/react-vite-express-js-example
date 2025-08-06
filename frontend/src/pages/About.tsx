import { Button } from '@/atoms/Button';

// HTML is AI generated and a little bit tweaked by hand
// This isn't a main feature of the app, that's why I allowed myself to do a little shortcut here ;)

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-gray-300">
            Software Developer & Continuous Learner
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 flex flex-col items-center justify-center">
            <div className="mb-6">
              <img
                src="https://media.licdn.com/dms/image/v2/C4D03AQHc8C96rjJ3QQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1647467440514?e=1757548800&v=beta&t=nPMzjMUKD1Fgp6B4JVWBK2Cle9sb6Aqtq1JdJXWVuKI"
                alt="Michał Kutrzuba Profile"
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-400 shadow-lg"
              />
            </div>
            <Button
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/michalkutrzuba/',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
              className="inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                  clipRule="evenodd"
                />
              </svg>
              Connect on LinkedIn
            </Button>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Hello, I'm Michał
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              I'm a passionate software developer focused on building modern web
              applications. This project represents my journey in mastering
              full-stack development with cutting-edge technologies.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I believe in continuous learning and hands-on practice. This
              application serves as both a learning exercise and a demonstration
              of my skills in React, TypeScript, and modern web development
              patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
