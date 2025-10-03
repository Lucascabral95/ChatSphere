"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useActiveRoute } from "@/presentation/hooks/useActiveRoute";
import {
  MOBILE_NAV_ROUTES,
  ACTIVE_LINK_STYLES,
  ACTIVE_ICON_STYLE,
} from "@/infraestructure/constants";
import "./DashboardMobile.scss";

const MotionHeader = motion.header as any;

const DashboardMobile = () => {
  const { isActive } = useActiveRoute();

  return (
    <MotionHeader className="dashboard-mobile">
      <div className="contenedor-dashboard-mobile">
        <div className="dashboard-mobile-secciones">
          {MOBILE_NAV_ROUTES.map((route) => {
            const Icon = route.icon;
            const active = isActive(route.href);

            return (
              <Link
                key={route.href}
                href={route.href}
                className="redireccion-dashboard"
                style={active ? ACTIVE_LINK_STYLES : undefined}
              >
                <div className="interior-dashboard">
                  <p className="dashboard-mobile-texto">{route.label}</p>
                </div>
                <div className="ii">
                  <Icon
                    className="dashboard-mobile-iconos"
                    style={active ? ACTIVE_ICON_STYLE : undefined}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </MotionHeader>
  );
};

export default DashboardMobile;
