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
import {
  navbarItems,
  type NavbarPaths,
  type NavbarItem,
} from "./Navbar.constant.ts";
import type { Icon, IconProps } from "tabler-icons-react";

const iconMap: Record<
  NavbarPaths,
  React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
> = {
  "/home": IconHome,
  "/about": IconUser,
  "/experiences": IconBriefcase,
  "/projects": IconCode,
  "/blogs": IconArticle,
  "/contact": IconMail,
  "/ping": IconActivity,
};

const Navbar = () => {
  return (
    <FloatingDock
      items={navbarItems.map((item: NavbarItem) => {
        const IconComponent = iconMap[item.path];
        return {
          title: item.label,
          icon: (
            <IconComponent className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: item.path,
        };
      })}
    />
  );
};

export default Navbar;
