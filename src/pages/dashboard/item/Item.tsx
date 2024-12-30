import React from "react";
import {Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";

import {CreateItem} from "@/components/item/CreateItem";
import {TableData} from "@/lib/common/TableData";
import DeleteModal from "@/lib/common/DeleteModal";
import {ItemProps} from "@/pages/dashboard/types";


const Item: React.FC<ItemProps> = ({
                                       categoryId, categoryName, refetch, items,
                                   }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const url = `${BASE_URL}/items`;
    return (<div className="mt-12 mb-8 flex flex-col gap-12 px-16">
        <Card>
            <CardHeader variant="gradient" color="gray"
                        className="mb-8 p-6 border-2 shadow-2xl text-center ">
                <Typography variant="h6" color="white">
                    {categoryName} Items
                </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto">
                    <thead>
                    <tr>
                        {['Category', 'Description', 'Dry Cleaning Price', 'Washing Price', <CreateItem
                            id={null}
                            label={null}
                            name={null}
                            description={null}
                            dry_cleaning_price={null}
                            washing_price={null}
                            categoryId={categoryId}
                            refetch={refetch}
                        />].map((el, index) => <th className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                                   key={index}>
                            <Typography
                                variant="small"
                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                            >
                                {el}
                            </Typography>
                        </th>)}


                    </tr>
                    </thead>
                    <tbody>
                    {items?.map(({
                                     id, name, description, dry_cleaning_price, washing_price,
                                 }, key: number,) => {
                        const className = `py-3 px-5 ${key === items?.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                        return (<tr key={id}>
                            <TableData classes={`${className}`} data={name}/>
                            <TableData classes={`${className}`} data={description ? description : "-"}/>

                            <TableData classes={`${className}`}
                                       data={dry_cleaning_price ? dry_cleaning_price : "-"}/>
                            <TableData classes={`${className}`} data={washing_price ? washing_price : "-"}/>
                            <TableData classes={`${className}`} data={<div className={`flex`}>
                                <CreateItem
                                    id={`${id}`}
                                    label="Edit"
                                    categoryId={categoryId}
                                    name={name}
                                    description={description}
                                    dry_cleaning_price={dry_cleaning_price}
                                    washing_price={washing_price}
                                    refetch={refetch}
                                />


                                <DeleteModal toastMessage="Item"
                                             btnLabel='Delete'
                                             title="Delete Confirmation"
                                             description={`Are you sure you want to Delete this Item (${name})?`}
                                             refetch={refetch}
                                             url={`${url}/${id}`}/>
                            </div>}
                            />
                        </tr>);
                    },)}
                    {items?.length === 0 && (


                        <tr>
                            <TableData data=' No Data' classes="text-center p-4 " colspan={5} noBold={true}/>
                        </tr>

                    )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    </div>);
};

export default Item;
