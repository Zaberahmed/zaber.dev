import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { trpc } from "./configs/trpc.ts";

function App() {
  const [count, setCount] = useState(0);

  const { data, error, isLoading } = trpc.hello.useQuery();

  return (
    <>
      <img src="/vite-deno.svg" alt="Vite with Deno" />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + tRPC</h1>

      {isLoading && <p>Loading tRPC data...</p>}
      {error && (
        <div className="error">
          <h3>Error from tRPC:</h3>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      {data && <h2>tRPC Response: {data.greeting}</h2>}

      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
