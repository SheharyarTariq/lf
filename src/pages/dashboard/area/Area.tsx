import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { CreateArea } from "@/components/area/CreateArea";
import { DeleteArea } from "@/components/area/DeleteArea";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import ServiceAvailability from "@/pages/dashboard/serviceAvailability/ServiceAvailability";

export const Area = () => {
  const url = "https://laundry-free-2a18b6e8d093.herokuapp.com/api/areas";
  const { data, error, loading, refetch } = useFetch<any>(url);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const handleGetPostCodes = (id: string) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Area
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {[
                  "Area",
                  <p className={`ml-9`}>Action</p>,
                  !error && (
                    <CreateArea
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
              {error ? (
                <tr>
                  <td colSpan={2} className="text-center p-4">
                    <Typography className="text-red-500">{error}</Typography>
                  </td>
                </tr>
              ) : (
                data?.result?.map(
                  (
                    {
                      name,
                      id,
                      service_availabilities,
                    }: {
                      name: string;
                      id: number;
                      service_availabilities: [];
                    },
                    key: number,
                  ) => {
                    const className = `py-3 px-5 ${
                      key === data.result.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <React.Fragment key={id}>
                        <tr>
                          <td className={`${className}`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <div className={`flex`}>
                              <CreateArea
                                dailogLabel="Edit"
                                name={name}
                                id={`${id}`}
                                refetch={refetch}
                              />
                              <DeleteArea
                                name={name}
                                id={`${id}`}
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
                            <td colSpan={3} className="p-0">
                              <ServiceAvailability
                                areaName={name}
                                areaId={`${id}`}
                                service_availabilities={service_availabilities}
                                refetch={refetch}
                              />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  },
                )
              )}
              {loading && (
                <tr>
                  <td colSpan={3} className="text-center p-4">
                    <Typography className="text-blue-gray-600">
                      Loading...
                    </Typography>
                  </td>
                </tr>
              )}
              {data?.result?.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-4">
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

export default Area;
