import {
  HomeIcon,
  TableCellsIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Area } from "@/pages/dashboard/area/Area";
import { Home } from "@/pages/dashboard/home/Home";
import SignIn from "@/pages/auth/sign-in";
import Category from "@/pages/dashboard/category/Category";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "area",
        path: "/area",
        element: <Area />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Category",
        path: "/category",
        element: <Category />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;