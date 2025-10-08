const navbarItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experiences", label: "Experiences" },
  { to: "/projects", label: "Projects" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
  { to: "/ping", label: "Ping" },
] as const;

type NavbarItem = (typeof navbarItems)[number];

export type { NavbarItem };
export { navbarItems };
