import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { DeleteServiceAvailability } from "@/components/serviceAvailability/DeleteServiceAvailability";
import SwitchBtn from "@/components/serviceAvailability/UpdateServiceAvailabilitySwitch";
import { CreateServiceAvailability } from "@/components/serviceAvailability/CreateServiceAvailability";

type Props = {
  areaId: string;
  areaName: string;
  service_availabilities: [];
  refetch: () => void;
};

const ServiceAvailability: React.FC<Props> = ({
  areaId,
  areaName,
  service_availabilities,
  refetch,
}) => {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            {areaName} Post Codes
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
                    Post Code
                  </Typography>
                </th>

                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Active
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    <CreateServiceAvailability
                      areaId={areaId}
                      refetch={refetch}
                    />
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {service_availabilities?.map(
                (
                  {
                    postcode,
                    id,
                    is_active,
                  }: {
                    postcode: string;
                    id: string;
                    is_active: boolean;
                  },
                  key: number,
                ) => {
                  const className = `py-3 px-5 ${
                    key === service_availabilities?.length - 1
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
                          {postcode}
                        </Typography>
                      </td>
                      <td className={`${className}`}>
                        <SwitchBtn
                          is_active={is_active}
                          id={`${id}`}
                          refetch={refetch}
                        />
                      </td>
                      <td className={className}>
                        <DeleteServiceAvailability
                          id={`${id}`}
                          name={postcode}
                          refetch={refetch}
                        />
                      </td>
                    </tr>
                  );
                },
              )}
              {service_availabilities?.length === 0 && (
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

export default ServiceAvailability;
