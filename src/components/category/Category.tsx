import React, {useState} from "react";
import {Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";
import {CreateCategory} from "@/components/category/CreateCategory";
import useFetch from "@/lib/api/Dashboard/hooks/useFetch";
import {TableData} from "@/lib/common/TableData";
import DeleteModal from "@/lib/common/DeleteModal";
import {CategoryProps} from "@/components/category/types";
import {handlingOption, handlingOptions} from "@/components/constants";
import {category} from "@/api";
import CommonButtonWhite from "@/lib/common/CommonButtonWhite";
import {Link} from "react-router-dom";

export const Category: React.FC = () => {
  const {fetchData: data, errors, loading, refetch} = useFetch<any>(`${category}`);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Category
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0  pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
            <tr>
              {["Category", "Description", "Handling Option", "Default Handling", "Position",
                <span className={`ml-9`}>Action</span>, !errors && (
                  <CreateCategory refetch={refetch}/>
                ),].map((el, idx) => (<th
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

                  <TableData classes={className} data={
                    <span className="flex">
                      <CreateCategory
                        is_hangable={is_hangable}
                        is_foldable={is_foldable}
                        default_handling_option={default_handling_option}
                        description={description}
                        position={position}
                        dailogLabel="Edit"
                        name={name}
                        id={id}
                        refetch={refetch}
                      />
                      <DeleteModal toastMessage="Category deleted successfully"
                                   btnLabel='Delete'
                                   title="Delete Confirmation"
                                   description={`Are you sure you want to Delete this Category (${name})?`}
                                   refetch={refetch}
                                   url={`${category}/${id}`}/>
                    </span>}/>

                  <TableData classes={className}
                             data={
                               <CommonButtonWhite>
                                 <Link to={`${id}`}>
                                   <svg xmlns="http://www.w3.org/2000/svg" className=" h-4 w-4" fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                           d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                   </svg>
                                 </Link>
                               </CommonButtonWhite>
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
