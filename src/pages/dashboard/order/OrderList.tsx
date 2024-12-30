import React, {useState} from 'react';
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {TableData} from "@/lib/common/TableData";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import OrderItem from "@/pages/dashboard/order-item/OrderItem";
import {OrderListProps} from "@/pages/dashboard/types";


const OrderList: React.FC = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const url = `${BASE_URL}/admin/orders`;
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const {data, error, loading, refetch} = useFetch<any>(url);

    const handleRowClick = (orderId: string) => {
        setSelectedOrder(orderId);
    };

    const handleBackToList = () => {
        setSelectedOrder(null);

    };

    return (<div className="mt-12 mb-8 flex flex-col gap-12">
        {selectedOrder ? (<div className="w-full">
            <OrderItem id={selectedOrder}/>
            <button
                onClick={handleBackToList}
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md"
            >
                Back to Orders List
            </button>
        </div>) : (<Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white" className="flex items-center">
                    Orders
                </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto">
                    <thead>
                    <tr>
                        {["Order#", "status", "created_at", "note", "pickup", "dropoff"].map((el, idx) => (
                            <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                <Typography variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400">
                                    {el}
                                </Typography>
                            </th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {error ? (<tr>
                        <TableData colspan={6} data={error} classes="text-center p-4 " textColor='red'/>
                    </tr>) : (data?.result?.data.map(({
                                                          id,
                                                          number,
                                                          status,
                                                          created_at,
                                                          note,
                                                          pickup,
                                                          dropoff
                                                      }: OrderListProps, key: number) => {
                        const className = `py-3 px-5 ${key === data.result.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                        return (<tr key={id} onClick={() => handleRowClick(id)}
                                    className="cursor-pointer">
                            <TableData classes={className} data={number}/>
                            <TableData classes={className} data={status}/>
                            <TableData classes={className} data={created_at}/>
                            <TableData classes={className} data={note}/>
                            <TableData classes={className} data={Object.entries(pickup)
                                .filter(([key]) => key === "date" || key === "time")
                                .map(([key, value]) => (<div key={key}>{value}</div>))}
                            />
                            <TableData classes={className} data={Object.entries(dropoff)
                                .filter(([key]) => key === "date" || key === "time")
                                .map(([key, value]) => (<div key={key}>{value}</div>))}
                            />
                        </tr>);
                    }))}
                    {loading && (<tr>
                        <TableData data=' Loading...' classes="text-center p-4 " colspan={6} noBold={true}/>
                    </tr>)}
                    {data?.result?.length === 0 && (<tr>
                        <TableData data=' No Data' classes="text-center p-4 " colspan={6} noBold={true}/>
                    </tr>)}
                    </tbody>
                </table>
            </CardBody>
        </Card>)}
    </div>);
}

export default OrderList;
