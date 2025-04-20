import React from "react";
import {Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";
import SwitchBtn from "@/components/postcode/UpdatePostcodeSwitch";
import {CreatePostcode} from "@/components/postcode/CreatePostcode";
import {TableData} from "@/lib/common/TableData";
import DeleteModal from "@/lib/common/DeleteModal";
import {PostcodeProps} from "@/components/postcode/types";
import {config} from "@/config";

const Postcode: React.FC<PostcodeProps> = ({
                                             areaId,
                                             areaName,
                                             service_availabilities,
                                             refetch,
                                           }) => {
  return (
    <span className="mt-12 mb-8 flex flex-col gap-12 px-16">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 text-center">
          <Typography variant="h6" color="white">
            {areaName} Post Codes
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
            <tr>
              {["Post Code", "Active", <CreatePostcode areaId={areaId} refetch={refetch}/>].map((el, idx) => (
                <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                    {el}
                  </Typography>
                </th>))}
            </tr>
            </thead>
            <tbody>
            {service_availabilities?.map(({postcode, id, is_active}, key: number,) => {
              const className = `py-3 px-5 ${key === service_availabilities?.length - 1 ? null : "border-b border-blue-gray-50"}`;
              return (<tr key={id}>
                <TableData classes={`${className}`} data={postcode}/>
                <TableData classes={`${className}`} data={
                  <SwitchBtn
                    is_active={is_active}
                    id={`${id}`}
                    refetch={refetch}
                  />}
                />
                <TableData classes={className} data={
                  <DeleteModal
                    toastMessage="Postcode deleted successfully"
                    btnLabel='Delete'
                    title="Delete confirmation"
                    description={`Are you sure you want to delete this postcode (${postcode})?`}
                    refetch={refetch}
                    url={`${config.BASE_URL}/post-codes/${id}`}/>
                }/>
              </tr>);
            })}
            {service_availabilities?.length === 0 && (<tr>
              <TableData data='No Data' classes="text-center p-4 " colspan={3} noBold={true}/>
            </tr>)}
            </tbody>
          </table>
        </CardBody>
      </Card>
      </span>

  );
};

export default Postcode;
