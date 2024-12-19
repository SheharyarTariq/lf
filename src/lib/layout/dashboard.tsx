import { Route, Routes, useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { Configurator } from "@/lib/layout/configurator";
import { DashboardNavbar } from "@/lib/layout/dashboard-navbar";
import { Sidenav } from "@/lib/layout/sidenav";

import routes from "@/routes";
import {
  setOpenConfigurator,
  useMaterialTailwindController,
} from "@/lib/context/index";
import React, { useEffect } from "react";
import { isAuthenticated } from "@/lib/api/auth/authenticate";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("auth/signin");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        brandName="LF - Free"
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route path={path} element={element} key={path} />
              )),
          )}
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
