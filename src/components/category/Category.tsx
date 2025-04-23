import React from "react";
import {Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";
import {CreateCategory} from "@/components/category/CreateCategory";
import useFetch from "@/lib/api/Dashboard/hooks/useFetch";
import {TableData} from "@/lib/common/TableData";
import {CategoryProps} from "@/components/category/types";
import {handlingOption, handlingOptions} from "@/components/constants";
import {category} from "@/api";
import CommonButtonWhite from "@/lib/common/CommonButtonWhite";
import {Link} from "react-router-dom";
import Arrow from "@/lib/common/Arrow";

export const Category: React.FC = () => {
  const {fetchData: data, errors, loading, refetch} = useFetch<any>(`${category}`);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white" className="flex items-center">
            Category
            <span className="ml-auto">
{!errors && (
  <CreateCategory refetch={refetch}/>
)}</span>
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0  pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
            <tr>
              {["Category", "Description", "Handling Option", "Default Handling", "Position",
                "Action"].map((el, idx) => (<th
                key={idx}
                className="border-b border-blue-gray-50 py-3 px-5 text-left"
              >
                <Typography
                  variant="small"
                  className="text-[11px] font-bold uppercase text-blue-gray-400"
                >
                  {el}
                </Typography>
              </th>))}
            </tr>
            </thead>
            <tbody>
            {errors && (<tr>
              <TableData colspan={4} data={errors.message} classes="text-center p-4 " textColor='red'/>
            </tr>)}

            {!errors && data?.result?.map(({
                                             name,
                                             description,
                                             id,
                                             is_hangable,
                                             is_foldable,
                                             default_handling_option,
                                             position,
                                             items,
                                           }: CategoryProps, key: number,) => {
              const className = `py-3 px-5 ${key === data.result.length - 1 ? null : "border-b border-blue-gray-50"}`;

              return (<React.Fragment key={id}>
                <tr>
                  <TableData classes={className} data={name}/>
                  <TableData classes={className} data={description ? description : "-"}/>
                  <TableData classes={className} data={
                    <span>
                      {is_hangable ? handlingOption.hang : null}
                      {(is_hangable && is_foldable) ? "-" : null}
                      {is_foldable ? handlingOption.fold : null}
                    </span>
                  }/>
                  <TableData classes={className}
                             data={
                               handlingOptions.find(element => element.value === default_handling_option)?.label
                             }
                  />
                  <TableData classes={className} data={position}/>
                  <TableData classes={className}
                             data={
                               <Link to={`${id}`}>
                                 <CommonButtonWhite>
                                   <Arrow/>
                                 </CommonButtonWhite>
                               </Link>
                             }/>
                </tr>
              </React.Fragment>);
            },)}

            {loading && (<tr>
              <TableData data=' Loading...' classes="text-center p-4 " colspan={7} noBold={true}/>
            </tr>)}
            {data?.result?.length === 0 && (<tr>
              <TableData data=' No Data' classes="text-center p-4 " colspan={7} noBold={true}/>
            </tr>)}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>);
};

export default Category;
