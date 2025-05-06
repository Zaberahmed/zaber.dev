import { Link } from "react-router-dom";
import { Button } from "ui/button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <p className="mb-4">
        This is a simple about page to demonstrate React Router.
      </p>
      <Link to="/about" className="text-blue-500 hover:text-blue-700 underline">
        Go to About
      </Link>
      <div className="mt-4">
        <Button variant="default">Click Me</Button>
      </div>
    </div>
  );
};
export default Home;
