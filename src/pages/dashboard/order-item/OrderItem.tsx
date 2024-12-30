import React from 'react';
import {OrderItems} from "../types";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {TableData} from "@/lib/common/TableData";
import {AddItemFromCategory} from "@/components/order-item/AddItemFromCategory";

interface Props {
    id: string;
}

const OrderItem: React.FC<Props> = ({id}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const url = `${BASE_URL}/admin/orders/${id}`;

    const {data, error, loading, refetch} = useFetch<any>(url);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading data: {error || "Unknown error"}</p>;
    }

    if (!data || !data.result) {
        return <p>No order details available.</p>;
    }

    const {result} = data;
    const orderItems = Array.isArray(result.data) ? result.data : [];

    return (
        <>
            <div className="mb-4">
                <h1 className="text-3xl font-semibold text-gray-800">Order #{result.number}</h1>
                <h6 className="text-gray-500 text-sm">Order ID: {id}</h6>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-8 mb-6">
                <div className="mb-4">
                    <p className="text-lg text-gray-800"><strong>Created At:</strong> {result.created_at}</p>
                    <p className="text-lg text-gray-800"><strong>Note:</strong> {result.note || 'No additional notes'}
                    </p>
                    <p><strong>Revenue:</strong> {result.revenue}</p>
                </div>
                <div className="border-t-2 mt-4 mb-4"></div>
                <div className="mt-4 flex flex-col sm:flex-row space-x-0 sm:space-x-4">
                    <div className="bg-white shadow-md rounded-lg w-full p-4 mb-4 sm:mb-0">
                        <h2 className="text-xl font-semibold text-gray-800">Pickup Information</h2>
                        <p className="text-gray-600"><strong>Date:</strong> {result.pickup?.date}</p>
                        <p className="text-gray-600"><strong>Time:</strong> {result.pickup?.time}</p>
                        <p className="text-gray-600"><strong>Point:</strong> {result.pickup?.point}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg w-full p-4 mb-4 sm:mb-0">
                        <h2 className="text-xl font-semibold text-gray-800">Dropoff Information</h2>
                        <p className="text-gray-600"><strong>Date:</strong> {result.dropoff?.date}</p>
                        <p className="text-gray-600"><strong>Time:</strong> {result.dropoff?.time}</p>
                        <p className="text-gray-600"><strong>Point:</strong> {result.dropoff?.point}</p>
                    </div>
                </div>
            </div>
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white" className="flex items-center">
                        Order Items
                        <AddItemFromCategory/>
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full table-auto">
                        <thead>
                        <tr>
                            {["Name", "Quantity", "Cleaning Method", "Unit Price", "Total Price", "Approved"].map((el, idx) => (
                                <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                    <Typography variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400">
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {result.order_items.length > 0 ? (
                            result.order_items.map(({
                                                        id,
                                                        name,
                                                        quantity,
                                                        cleaning_method,
                                                        price_per_unit,
                                                        total_price,
                                                        is_approved
                                                    }: OrderItems, idx: number) => (
                                <tr key={id}>
                                    <TableData classes="py-3 px-5" data={name}/>
                                    <TableData classes="py-3 px-5" data={quantity}/>
                                    <TableData classes="py-3 px-5" data={cleaning_method}/>
                                    <TableData classes="py-3 px-5" data={price_per_unit}/>
                                    <TableData classes="py-3 px-5" data={total_price}/>
                                    <TableData classes="py-3 px-5" data={is_approved ? "Yes" : "No"}/>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <TableData data="No items found." classes="text-center p-4" colspan={6}/>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </>
    );
};

export default OrderItem;
