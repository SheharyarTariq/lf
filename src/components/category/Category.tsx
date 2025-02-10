import React, {useState} from "react";
import {Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";
import {CreateCategory} from "@/components/category/CreateCategory";
import useFetch from "@/lib/api/Dashboard/hooks/category/useFetchCategory";
import Item from "@/components/item/Item";
import {TableData} from "@/lib/common/TableData";
import {handleGetAllPostCodesClose, handleGetAllPostCodesOpen, handleGetPostCodes} from "@/lib/common/Dropdown";
import DeleteModal from "@/lib/common/DeleteModal";
import {config} from "@/config";
import {CategoryProps} from "@/components/category/types";
import {handlingOption, handlingOptions} from "@/components/constants";


export const Category: React.FC = () => {
  const {data, error, loading, refetch} = useFetch<any>(`${config.BASE_URL}/categories/with-items`);
  const [openAllDropdowns, setOpenAllDropdowns] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean; }>({});

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Category{" "}
            {data && (openAllDropdowns ? (<i onClick={() => handleGetAllPostCodesOpen({
              data, setOpenAllDropdowns, setOpenDropdowns
            })}
                                             className="fa-solid fa-caret-up cursor-pointer"/>) : (
              <i className="fa-solid fa-caret-down cursor-pointer"
                 onClick={() => handleGetAllPostCodesClose({
                   data, setOpenAllDropdowns, setOpenDropdowns
                 })}/>))}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0  pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
            <tr>
              {["Category", "Description", "Handling Option", "Default Handling",
                <span className={`ml-9`}>Action</span>, !error && (
                  <CreateCategory
                    is_hangable={null}
                    is_foldable={null}
                    default_handling_option={null}
                    description={null}
                    dailogLabel={null}
                    name={null}
                    id={null}
                    refetch={refetch}
                  />),].map((el, idx) => (<th
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
            {error && (<tr>
              <TableData colspan={4} data={error} classes="text-center p-4 " textColor='red'/>
            </tr>)}
            {!error && data?.result?.map(({
                                            name,
                                            description,
                                            id,
                                            is_hangable,
                                            is_foldable,
                                            default_handling_option,
                                            items,
                                          }: CategoryProps, key: number,) => {
              const className = `py-3 px-5 ${key === data.result.length - 1 ? null : "border-b border-blue-gray-50"}`;

              return (<React.Fragment key={id}>
                <tr>
                  <TableData classes={className} data={name}/>
                  <TableData classes={className} data={description ? description : "-"}/>
                  <TableData classes={className} data={
                    <div>
                      {is_hangable ? handlingOption.hang : null}
                      {(is_hangable && is_foldable) ? "-" : null}
                      {is_foldable ? handlingOption.fold : null}
                    </div>
                  }/>
                  <TableData classes={className}
                             data={
                               handlingOptions.find(element => element.value === default_handling_option)?.label
                             }
                  />
                  <TableData classes={className} data={
                    <div className="flex">
                      <CreateCategory
                        is_hangable={is_hangable}
                        is_foldable={is_foldable}
                        default_handling_option={default_handling_option}
                        description={description}
                        dailogLabel="Edit"
                        name={name}
                        id={id}
                        refetch={refetch}
                      />
                      <DeleteModal toastMessage="Category "
                                   btnLabel='Delete'
                                   title="Delete Confirmation"
                                   description={`Are you sure you want to Delete this Category (${name})?`}
                                   refetch={refetch}
                                   url={`${config.BASE_URL}/categories/${id}`}/>
                    </div>}/>
                  <TableData classes={className} data={openDropdowns[id] ? (
                    <i className="fa-solid fa-caret-up cursor-pointer"
                       onClick={() => handleGetPostCodes({id, setOpenDropdowns})}/>) : (
                    <i className="fa-solid fa-caret-down cursor-pointer"
                       onClick={() => handleGetPostCodes({id, setOpenDropdowns})}/>)}/>

                </tr>
                {openDropdowns[id] && (<tr>
                  <TableData colspan={8}
                             data={<Item
                               categoryName={name}
                               categoryId={`${id}`}
                               items={items}
                               refetch={refetch}
                             />} classes="p-0"/>

                </tr>)}
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
