import React, {useState} from "react";
import {Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";
import {CreateCategory} from "@/components/category/CreateCategory";
import {DeleteCategory} from "@/components/category/DeleteCategory";
import useFetch from "@/lib/api/Dashboard/hooks/category/useFetchCategory";
import Item from "@/pages/dashboard/item/Item";
import {TableData} from "@/lib/common/TableData";
import {handleGetAllPostCodesClose, handleGetAllPostCodesOpen, handleGetPostCodes} from "@/lib/common/Dropdown";

export const Category = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const url = `${BASE_URL}/categories`;
    const {data, error, loading, refetch} = useFetch<any>(url);
    const [openAllDropdowns, setOpenAllDropdowns] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<{
        [key: string]: boolean;
    }>({});


    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Category{" "}
                        {data &&
                            (openAllDropdowns ? (
                                <i onClick={() => handleGetAllPostCodesOpen({
                                    data,
                                    setOpenAllDropdowns,
                                    setOpenDropdowns
                                })}
                                   className="fa-solid fa-caret-up cursor-pointer"/>
                            ) : (
                                <i className="fa-solid fa-caret-down cursor-pointer"
                                   onClick={() => handleGetAllPostCodesClose({
                                       data,
                                       setOpenAllDropdowns,
                                       setOpenDropdowns
                                   })}/>))}
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0  pt-0 pb-2">
                    <table className="w-full table-auto">
                        <thead>
                        <tr>
                            {[
                                "Category",
                                "Description",
                                "Option",
                                <span className={`ml-9`}>Action</span>,
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
                                <TableData colspan={4} data={error} classes="text-center p-4 " textColor='red'/>
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
                                        <React.Fragment key={id}>
                                            <tr>
                                                <TableData classes={className} data={name}/>
                                                <TableData classes={className} data={description ? description : "-"}/>

                                                <TableData classes={className} data={category_handling_options?.map(
                                                    ({handling_option}, index) => {
                                                        return (
                                                            <span
                                                                key={index}> {(handling_option === 'fold') && 'Fold'}{(handling_option === 'hang') && 'Hang'}</span>
                                                        );
                                                    },
                                                )}/>
                                                <TableData classes={className} data={<div className={`flex`}>

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
                                                </div>}/>
                                                <TableData classes={className} data={openDropdowns[id] ? (
                                                    <i className="fa-solid fa-caret-up cursor-pointer"
                                                       onClick={() => handleGetPostCodes({id, setOpenDropdowns})}/>) : (
                                                    <i className="fa-solid fa-caret-down cursor-pointer"
                                                       onClick={() => handleGetPostCodes({id, setOpenDropdowns})}/>)}/>

                                            </tr>
                                            {openDropdowns[id] && (
                                                <tr>
                                                    <TableData colspan={5}
                                                               data={<Item
                                                                   categoryName={name}
                                                                   categoryId={`${id}`}
                                                                   items={items}
                                                                   refetch={refetch}
                                                               />} classes="p-0"/>

                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                },
                            )}

                        {loading && (
                            <tr>
                                <TableData data=' Loading...' classes="text-center p-4 " colspan={5} noBold={true}/>
                            </tr>
                        )}
                        {data?.result?.length === 0 && (
                            <tr>
                                <TableData data=' No Data' classes="text-center p-4 " colspan={5} noBold={true}/>
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
