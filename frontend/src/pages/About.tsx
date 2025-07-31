function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">About</h1>
        <p className="text-gray-300 text-lg mb-6">
          This is a React application built with Vite, TypeScript, and Tailwind
          CSS. It demonstrates how to set up client-side routing with
          react-router-dom.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
          <ul className="text-gray-300 space-y-2">
            <li>React 19 with TypeScript</li>
            <li>Vite for fast development and building</li>
            <li>Tailwind CSS for styling</li>
            <li>React Router DOM for navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
