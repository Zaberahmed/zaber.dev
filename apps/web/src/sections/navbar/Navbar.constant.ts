import { RoutePaths } from "../../entities/route-paths.ts";

export type NavbarPaths = Exclude<RoutePaths, "*" | "/">;
type NavbarLabels =
  | "Home"
  | "About"
  | "Experiences"
  | "Projects"
  | "Blogs"
  | "Contact"
  | "Ping";
export type NavbarItem = {
  path: NavbarPaths;
  label: NavbarLabels;
};

export const navbarItems: NavbarItem[] = [
  { path: RoutePaths.HOME, label: "Home" },
  { path: RoutePaths.ABOUT, label: "About" },
  { path: RoutePaths.EXPERIENCES, label: "Experiences" },
  { path: RoutePaths.PROJECTS, label: "Projects" },
  { path: RoutePaths.BLOGS, label: "Blogs" },
  { path: RoutePaths.CONTACT, label: "Contact" },
  { path: RoutePaths.PING, label: "Ping" },
];
