import { Link } from "react-router-dom";
import { RoutePaths } from "@entities/index.ts";

// About page component
const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">About Page</h1>
      <p className="mb-4">
        This is a simple about page to demonstrate React Router.
      </p>
      <Link
        to={RoutePaths.HOME}
        className="text-blue-500 hover:text-blue-700 underline">
        Go back to Home
      </Link>
    </div>
  );
};
export default About;
