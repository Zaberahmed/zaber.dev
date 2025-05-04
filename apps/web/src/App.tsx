import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { trpc } from "./configs/trpc.ts";

// Home component
const Home = () => {
  const [count, setCount] = useState(0);
  const { data, error, isLoading } = trpc.hello.useQuery();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img src="/vite-deno.svg" alt="Vite with Deno" />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold mb-4">Vite + React + tRPC</h1>

      {isLoading && <p className="text-blue-500">Loading tRPC data...</p>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <h3 className="font-bold">Error from tRPC:</h3>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      {data && (
        <h2 className="text-2xl text-green-600">
          tRPC Response: {data.greeting}
        </h2>
      )}

      <div className="card">
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code className="bg-gray-100 px-1 rounded">src/App.tsx</code> and
          save to test HMR
        </p>
      </div>
      <p className="read-the-docs mt-4 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

// About page component
const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">About Page</h1>
      <p className="mb-4">
        This is a simple about page to demonstrate React Router.
      </p>
      <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
        Go back to Home
      </Link>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
