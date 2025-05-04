const navbarItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ping", label: "Ping" },
] as const;

type NavbarItem = (typeof navbarItems)[number];

export type { NavbarItem };
export { navbarItems };
