import React from 'react';
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {CreatePostcode} from "@/components/postcode/CreatePostcode";
import {TableData} from "@/lib/common/TableData";
import SwitchBtn from "@/components/postcode/UpdatePostcodeSwitch";
import DeleteModal from "@/lib/common/DeleteModal";
import {postcode} from "@/api";
import {useParams} from "react-router-dom";

interface PostcodeTable {
  loading: boolean;
  data: {
    result: {
      postcodes: {
        id: string,
        postcode: string,
        is_active: boolean
      }[]

    }
  }
  refetch: () => void;
}

const PostcodeTable: React.FC<PostcodeTable> = ({data, refetch, loading}) => {
  const {areaId} = useParams();

  return (
    <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6 ">
        <Typography variant="h6" color="white" className="flex justify-between">
          Post Code
          <CreatePostcode areaId={areaId || ""} refetch={refetch}/>
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full table-auto">
          <thead>
          <tr>
            {[
              "Post Code", "Active", <span className="pl-4">Action</span>,].map((el, idx) => (
              <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  {el}
                </Typography>
              </th>))}
          </tr>
          </thead>
          <tbody>
          {data?.result?.postcodes.map((element: {
            id: string,
            postcode: string,
            is_active: boolean
          }, key: number) => {
            const className = `py-3 px-5 ${key == data?.result.postcodes.length - 1 ? null : "border-b border-blue-gray-50"}`;
            return (<tr key={element.id}>
              <TableData classes={`${className}`} data={element.postcode}/>
              <TableData classes={`${className}`} data={
                <SwitchBtn
                  is_active={element.is_active}
                  id={`${element.id}`}
                  refetch={refetch}
                />}
              />
              <TableData classes={className} data={
                <DeleteModal
                  toastMessage="Postcode deleted successfully"
                  btnLabel='Delete'
                  title="Delete confirmation"
                  description={`Are you sure you want to delete this postcode (${element.postcode})?`}
                  refetch={refetch}
                  url={`${postcode}/${element.id}`}/>
              }/>
            </tr>);
          })}
          {loading && (<tr>
            <TableData data='Loading...' classes="text-center p-4 " colspan={3} noBold={true}/>
          </tr>)}
          {data?.result?.postcodes?.length === 0 && (<tr>
            <TableData data='No Data' classes="text-center p-4 " colspan={3} noBold={true}/>
          </tr>)}

          </tbody>
        </table>
      </CardBody>
    </Card>);
}

export default PostcodeTable;