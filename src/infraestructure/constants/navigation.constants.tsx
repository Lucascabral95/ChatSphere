import { FaUser, FaUserPlus, FaUserFriends } from "react-icons/fa";
import { NavRoute } from "@/infraestructure/types/navigation.types";

export const MOBILE_NAV_ROUTES: NavRoute[] = [
  {
    href: "/application/my-friends",
    label: "Mis amigos",
    icon: FaUserFriends,
  },
  {
    href: "/application/friends-request",
    label: "Solicitudes de amistad",
    icon: FaUserPlus,
  },
  {
    href: "/application/add-friends",
    label: "Agregar amigos",
    icon: FaUser,
  },
];

export const ACTIVE_LINK_STYLES = {
  backgroundColor: "#E9E9E9",
  boxShadow:
    "0px 1px 2px rgba(64, 46, 88, 0.2), 0px 2px 4px rgba(64, 46, 88, 0.14), 0px 4px 8px rgba(64, 46, 88, 0.12)",
};

export const ACTIVE_ICON_STYLE = {
  color: "var(--color-chat)",
};
