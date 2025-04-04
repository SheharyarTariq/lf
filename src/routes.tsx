import {HomeIcon, TableCellsIcon, ServerStackIcon} from "@heroicons/react/24/solid";
import Area from "@/components/area/Area";
import Category from "@/components/category/Category";
import {OrderList} from "@/components/order-list/OrderList";
import Home from "@/components/home/Home";
import {UsersList} from "@/components/user/UsersList";

const icon = {className: "w-5 h-5 text-inherit"};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "area",
        path: "/area",
        element: <Area/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Category",
        path: "/category",
        element: <Category/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Order",
        path: "/admin/orders",
        element: <OrderList/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "User",
        path: "/admin/users",
        element: <UsersList/>,
      },
    ],
  },
];

export default routes;
