import { Link } from "react-router-dom";
import { trpc } from "../configs/trpc.ts";

const Ping = () => {
  const { data, error, isLoading } = trpc.hello.useQuery();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
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
      <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
        Go back to Home
      </Link>
    </div>
  );
};
export default Ping;
