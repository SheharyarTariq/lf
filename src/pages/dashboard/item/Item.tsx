import React from "react";
import {Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";

import {CreateItem} from "@/components/item/CreateItem";
import {TableData} from "@/lib/common/TableData";
import DeleteModal from "@/lib/common/DeleteModal";
import {ItemProps} from "@/pages/dashboard/types";
import {config} from "@/config";

const Item: React.FC<ItemProps> = ({
                                       categoryId, categoryName, refetch, items, is_dry_cleanable, is_washable
                                   }) => {
    const url = `${config.BASE_URL}/items`;
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
                        {['Category', 'Description', 'Dry Cleaning Price', 'Washing Price', "piece", <CreateItem
                            id={null}
                            label={null}
                            name={null}
                            is_dry_cleanable={is_dry_cleanable}
                            is_washable={is_washable}
                            pieces={null}
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
                                     id, name, description, price, piece
                                 }, key: number,) => {
                        const className = `py-3 px-5 ${key === items?.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                        return (<tr key={id}>
                            <TableData classes={`${className}`} data={name}/>
                            <TableData classes={`${className}`} data={description ? description : "-"}/>

                            <TableData classes={`${className}`}
                                       data={price.dry_clean ? price.dry_clean : "-"}/>
                            <TableData classes={`${className}`} data={price.wash ? price.wash : "-"}/>
                            <TableData classes={`${className}`} data={piece ? piece : "-"}/>
                            <TableData classes={`${className}`} data={<div className={`flex`}>
                                <CreateItem
                                    pieces={piece}
                                    id={`${id}`}
                                    label="Edit"
                                    is_dry_cleanable={is_dry_cleanable}
                                    is_washable={is_washable}
                                    categoryId={categoryId}
                                    name={name}
                                    description={description}
                                    dry_cleaning_price={price.dry_clean}
                                    washing_price={price.wash}
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
                            <TableData data=' No Data' classes="text-center p-4 " colspan={6} noBold={true}/>
                        </tr>

                    )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    </div>);
};

export default Item;
