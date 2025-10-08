import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconCode,
  IconArticle,
  IconMail,
  IconActivity,
} from "@packages/shadcn/icons";
import { FloatingDock } from "@packages/shadcn/ui";
import { navbarItems, type NavbarItem } from "./Navbar.constant.ts";

const iconMap = {
  "/": IconHome,
  "/about": IconUser,
  "/experiences": IconBriefcase,
  "/projects": IconCode,
  "/blogs": IconArticle,
  "/contact": IconMail,
  "/ping": IconActivity,
} as const;

const Navbar = () => {
  return (
    <FloatingDock
      items={navbarItems.map((item: NavbarItem) => {
        const IconComponent = iconMap[item.to as keyof typeof iconMap];
        return {
          title: item.label,
          icon: (
            <IconComponent className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: item.to,
        };
      })}
    />
  );
};

export default Navbar;
