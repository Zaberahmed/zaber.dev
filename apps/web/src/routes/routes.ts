import About from "../pages/About.tsx";
import Home from "../pages/Home.tsx";
import NotFound from "../pages/NotFound.tsx";
import Ping from "../pages/Ping.tsx";

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
    path: "/ping",
    element: Ping,
  },
  {
    path: "*",
    element: NotFound,
  },
] as const;

export { routes };
