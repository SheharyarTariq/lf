import React from 'react';
import {OrderDetailsCardProps} from "@/components/order-item/types";
import {Button} from "@material-tailwind/react";
import usePost from "@/lib/api/Dashboard/hooks/usePost";
import {config} from "@/config";

const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({id, result}) => {
  function handleFinalizeOrder() {
    const {postData, loading, errors} = usePost(`${config.BASE_URL}/admin/orders/${id}/finalise`)
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">Order #{result.number}</h1>
        <h6 className="text-gray-500 text-sm">Order ID: {id}</h6>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-8 mb-6">
        <div className="mb-4 grid grid-cols-2">
          <span>
          <p className="text-lg text-gray-800 "><strong>Created At:</strong> {result.created_at} </p>
          <p className="text-lg text-gray-800"><strong>Note:</strong> {result.note || 'No additional notes'}</p>
          <p><strong>Revenue:</strong> {result.revenue}</p>
          </span>
          <span className="ml-auto"><Button onClick={handleFinalizeOrder}>Finalize</Button></span>
        </div>
        <div className="border-t-2 mt-4 mb-4"></div>
        <div className="mt-4 flex flex-col sm:flex-row space-x-0 sm:space-x-4">
          <div className="bg-white shadow-md border rounded-lg w-full p-4 mb-4 sm:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">Pickup Information</h2>
            <p className="text-gray-600"><strong>Date:</strong> {result.pickup?.date}</p>
            <p className="text-gray-600"><strong>Time:</strong> {result.pickup?.time}</p>
          </div>
          <div className="bg-white shadow-md border rounded-lg w-full p-4 mb-4 sm:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">Dropoff Information</h2>
            <p className="text-gray-600"><strong>Date:</strong> {result.dropoff?.date}</p>
            <p className="text-gray-600"><strong>Time:</strong> {result.dropoff?.time}</p>
          </div>
        </div>
      </div>
    </div>);
}

export default OrderDetailsCard;
