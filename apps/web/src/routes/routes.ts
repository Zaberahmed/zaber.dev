import About from "../pages/About.tsx";
import Blogs from "../pages/Blogs.tsx";
import Contact from "../pages/Contact.tsx";
import Experiences from "../pages/Experiences.tsx";
import Home from "../pages/Home.tsx";
import Navigation from "../pages/Navigation.tsx";
import NotFound from "../pages/NotFound.tsx";
import Ping from "../pages/Ping.tsx";
import Projects from "../pages/Projects.tsx";

const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/about",
    element: About,
  },
  {
    path: "/experiences",
    element: Experiences,
  },
  {
    path: "/projects",
    element: Projects,
  },
  {
    path: "/blogs",
    element: Blogs,
  },
  {
    path: "/contact",
    element: Contact,
  },
  {
    path: "/navigation",
    element: Navigation,
  },
  {
    path: "/ping",
    element: Ping,
  },
  {
    path: "*",
    element: NotFound,
  },
] as const;

export { routes };
