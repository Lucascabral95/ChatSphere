import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useActiveRoute = () => {
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  const isActive = (route: string): boolean => {
    return activeRoute === route;
  };

  return { activeRoute, isActive };
};
