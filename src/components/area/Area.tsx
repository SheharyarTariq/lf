import React, {useState} from "react";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {CreateArea} from "@/components/area/CreateArea";
import useFetch from "@/lib/api/Dashboard/hooks/useFetch";
import {TableData} from "@/lib/common/TableData";
import {AreaProps} from "@/components/area/types";
import {area} from "@/api";
import {Link} from "react-router-dom";
import CommonButtonWhite from "@/lib/common/CommonButtonWhite";
import Arrow from "@/lib/common/Arrow";

export const Area: React.FC = () => {
  const {fetchData: data, errors: fetchAreaErrors, loading, refetch} = useFetch<any>(`${area}`);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white" className="flex items-center justify-between">
            Area
            {!fetchAreaErrors && (
              <CreateArea
                refetch={refetch}
              />)}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
            <tr>
              {["Area", "Action"].map((el, idx) => (
                <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{el}
                  </Typography>
                </th>))
              }
            </tr>
            </thead>
            <tbody>
            {fetchAreaErrors ? (
              <tr>
                <TableData colspan={4} data={fetchAreaErrors.message} classes="text-center p-4 " textColor="red"/>
              </tr>
            ) : (
              data?.result?.map(({name, id}: AreaProps, key: number) => {
                const className = `py-3 px-5 ${key === data.result.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                return (
                  <React.Fragment key={id}>
                    <tr>
                      <TableData classes={className} data={name}/>
                      <TableData classes={className}
                                 data={<Link to={`${id}`}><CommonButtonWhite><Arrow/></CommonButtonWhite></Link>}/>
                    </tr>
                  </React.Fragment>
                );
              })
            )}
            {loading && (
              <tr>
                <TableData data="Loading..." classes="text-center p-4 " colspan={4} noBold={true}/>
              </tr>
            )}
            {data?.result?.length === 0 && (
              <tr>
                <TableData data="No Data" classes="text-center p-4 " colspan={4} noBold={true}/>
              </tr>)}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>);
};

export default Area;
