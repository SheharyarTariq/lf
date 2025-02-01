import {Link, useLocation} from "react-router-dom";
import {Breadcrumbs, Button, IconButton, Navbar, Typography,} from "@material-tailwind/react";
import {Bars3Icon, Cog6ToothIcon, UserCircleIcon,} from "@heroicons/react/24/solid";
import {setOpenConfigurator, setOpenSidenav, useMaterialTailwindController,} from "@/lib/context/index";
import SignOut from "@/pages/auth/SignOut";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const {fixedNavbar, openSidenav} = controller;
  const {pathname} = useLocation();
  const [layout = "home", page = "dashboard"] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-black hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page || "Default Page"}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page || "Default Page"}
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500"/>
          </IconButton>
          <Button
            variant="text"
            color="blue-gray"
            onClick={SignOut}
            className="hidden items-center gap-1 px-4 xl:flex normal-case"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500"/>
            Signout
          </Button>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={SignOut}
            className="grid xl:hidden"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500"/>
          </IconButton>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500"/>
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}
