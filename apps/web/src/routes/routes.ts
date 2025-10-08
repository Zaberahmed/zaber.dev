import { RoutePaths } from "@entities/route-paths.ts";
import About from "@pages/About.tsx";
import Blogs from "@pages/Blogs.tsx";
import Contact from "@pages/Contact.tsx";
import Experiences from "@pages/Experiences.tsx";
import Home from "@pages/Home.tsx";
import NotFound from "@pages/NotFound.tsx";
import Ping from "@pages/Ping.tsx";
import Projects from "@pages/Projects.tsx";
import UnderConstruction from "@pages/UnderConstruction.tsx";

const routeMap = {
  [RoutePaths.HOME]: Home,
  [RoutePaths.ABOUT]: About,
  [RoutePaths.EXPERIENCES]: Experiences,
  [RoutePaths.PROJECTS]: Projects,
  [RoutePaths.BLOGS]: Blogs,
  [RoutePaths.CONTACT]: Contact,
  [RoutePaths.PING]: Ping,
  [RoutePaths.NOT_FOUND]: NotFound,
  [RoutePaths.TEMP]: UnderConstruction,
};

const routes = Object.entries(routeMap).map(([path, Component]) => ({
  path,
  element: Component,
}));

export { routes };
