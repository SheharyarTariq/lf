import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { CreateCategory } from "@/components/category/CreateCategory";
import { DeleteCategory } from "@/components/category/DeleteCategory";
import useFetch from "@/lib/api/Dashboard/hooks/category/useFetchCategory";
import Items from "@/pages/dashboard/items/Items";

export const Category = () => {
  const url = `https://laundry-free-2a18b6e8d093.herokuapp.com/api/categories`;
  const { data, error, loading, refetch } = useFetch<any>(url);
  const [allDropdownsOpen, setAllDropdownsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const handleGetPostCodes = (id: string) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleGetAllPostCodesOpen = () => {
    setAllDropdownsOpen((prevState) => !prevState);
    data.result.map(({ id }: { id: string }) =>
      setOpenDropdowns((prevState) => ({
        ...prevState,
        [id]: false,
      })),
    );
  };
  const handleGetAllPostCodesClose = () => {
    setAllDropdownsOpen((prevState) => !prevState);
    data.result.map(({ id }: { id: string }) =>
      setOpenDropdowns((prevState) => ({
        ...prevState,
        [id]: true,
      })),
    );
  };
  console.log(allDropdownsOpen);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Category{" "}
            {data &&
              (allDropdownsOpen ? (
                <i
                  className="fa-solid fa-caret-up cursor-pointer"
                  onClick={handleGetAllPostCodesOpen}
                />
              ) : (
                <i
                  className="fa-solid fa-caret-down cursor-pointer"
                  onClick={handleGetAllPostCodesClose}
                />
              ))}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {[
                  "Category",
                  "Description",
                  "Option",
                  <p className={`ml-9`}>Action</p>,
                  !error && (
                    <CreateCategory
                      handlingOption={null}
                      description={null}
                      dailogLabel={null}
                      name={null}
                      id={null}
                      refetch={refetch}
                    />
                  ),
                ].map((el, idx) => (
                  <th
                    key={idx}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    <Typography className="text-red-500">{error}</Typography>
                  </td>
                </tr>
              )}
              {!error &&
                data?.result?.map(
                  (
                    {
                      name,
                      description,
                      id,
                      category_handling_options,
                      items,
                    }: {
                      name: string;
                      description: string | null;
                      id: number;
                      category_handling_options: [] | null;
                      items: [];
                    },
                    key: number,
                  ) => {
                    const className = `py-3 px-5 ${
                      key === data.result.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <>
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
                              {description}
                            </Typography>
                          </td>

                          <td className={`${className}`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {category_handling_options?.map(
                                ({ handling_option }, index) => {
                                  return (
                                    <span key={index}> {handling_option}</span>
                                  );
                                },
                              )}
                            </Typography>
                          </td>

                          <td className={className}>
                            <div className={`flex`}>
                              <CreateCategory
                                handlingOption={category_handling_options}
                                description={description}
                                dailogLabel="Edit"
                                name={name}
                                id={id}
                                refetch={refetch}
                              />
                              <DeleteCategory
                                name={name}
                                id={id}
                                refetch={refetch}
                              />
                            </div>
                          </td>
                          <td className={`${className}`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold px-4"
                            >
                              {openDropdowns[id] ? (
                                <i
                                  className="fa-solid fa-caret-up cursor-pointer"
                                  onClick={() => handleGetPostCodes(`${id}`)}
                                />
                              ) : (
                                <i
                                  className="fa-solid fa-caret-down cursor-pointer"
                                  onClick={() => handleGetPostCodes(`${id}`)}
                                />
                              )}
                            </Typography>
                          </td>
                        </tr>
                        {openDropdowns[id] && (
                          <tr>
                            <td colSpan={5} className="p-0">
                              <Items
                                categoryName={name}
                                categoryId={`${id}`}
                                items={items}
                                refetch={refetch}
                              />
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  },
                )}

              {loading && (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    <Typography className="text-blue-gray-600">
                      Loading...
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

export default Category;
