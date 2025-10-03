import Link from "next/link";

import {
  ACTIVE_LINK_STYLES,
  ACTIVE_ICON_STYLE,
} from "@/infraestructure/constants/navigation.constants";
import { NavRoute } from "@/infraestructure/types/navigation.types";

interface NavLinkProps {
  route: NavRoute;
  isActive: boolean;
}

const NavLink = ({ route, isActive }: NavLinkProps) => {
  const Icon = route.icon;

  return (
    <Link
      href={route.href}
      className="redireccion-dashboard"
      style={isActive ? ACTIVE_LINK_STYLES : undefined}
    >
      <div className="interior-dashboard">
        <p className="dashboard-mobile-texto">{route.label}</p>
      </div>
      <div className="ii">
        <Icon
          className="dashboard-mobile-iconos"
          style={isActive ? ACTIVE_ICON_STYLE : undefined}
        />
      </div>
    </Link>
  );
};

export default NavLink;
