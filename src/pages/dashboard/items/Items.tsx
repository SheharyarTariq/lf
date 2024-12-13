import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import { CreateItem } from "@/components/item/CreateItem";
import { DeleteItem } from "@/components/item/DeleteItem";

type Props = {
  categoryId: string;
  categoryName: string;
  items: [];
  refetch: () => void;
};
type Response = {
  result: Result[];
};
type Result = {
  id: string;
  name: string;
  description: string | null;
  dry_cleaning_price: null | number;
  washing_price: number | null;
  image: string | null;
  category: Category;
};
type Category = {
  id: string;
  name: string;
  description: string | null;
  category_handling_options: [];
};

const Items: React.FC<Props> = ({
  categoryId,
  categoryName,
  refetch,
  items,
}) => {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            {categoryName} Items
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {categoryName}
                  </Typography>
                </th>

                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Description
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Dry Cleaning Price
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Washing Price
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400 pl-9"
                  >
                    <CreateItem
                      id={null}
                      label={null}
                      name={null}
                      description={null}
                      dry_cleaning_price={null}
                      washing_price={null}
                      categoryId={categoryId}
                      refetch={refetch}
                    />
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {items?.map(
                (
                  {
                    id,
                    name,
                    description,
                    dry_cleaning_price,
                    washing_price,
                  }: {
                    name: string;
                    id: string;
                    description: string | null;
                    dry_cleaning_price: number | null;
                    washing_price: number | null;
                  },
                  key: number,
                ) => {
                  const className = `py-3 px-5 ${
                    key === items?.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={`${className}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={`${className}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {description ? description : "-"}
                        </Typography>
                      </td>
                      <td className={`${className}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {dry_cleaning_price ? dry_cleaning_price : "-"}
                        </Typography>
                      </td>
                      <td className={`${className}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {washing_price ? washing_price : "-"}
                        </Typography>
                      </td>
                      <td className={`${className} `}>
                        <CreateItem
                          id={`${id}`}
                          label="Edit"
                          categoryId={categoryId}
                          name={name}
                          description={description}
                          dry_cleaning_price={dry_cleaning_price}
                          washing_price={washing_price}
                          refetch={refetch}
                        />

                        <DeleteItem
                          id={`${id}`}
                          name={name}
                          refetch={refetch}
                        />
                      </td>
                    </tr>
                  );
                },
              )}
              {items?.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    <Typography className="text-blue-gray-600">
                      No Data
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Items;
