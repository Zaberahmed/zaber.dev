import { FloatingDock } from "@packages/shadcn/ui";
import { IconHome, IconUser } from "@packages/shadcn/icons";

const Navigation = () => {
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        items={[
          {
            title: "Home",
            icon: (
              <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/",
          },
          {
            title: "About",
            icon: (
              <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/about",
          },
        ]}
      />
    </div>
  );
};

export default Navigation;
