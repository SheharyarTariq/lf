import React from 'react';
import {OrderListProp} from "../types"; // Ensure the path to types is correct

const OrderItem: React.FC<OrderListProp> = ({id, number, status, created_at, note, pickup, dropoff}) => {
    return (
        <>
            <div className="mb-4">
                <h1 className="text-3xl font-semibold text-gray-800">Order #{number}</h1>
                <h6 className="text-gray-500 text-sm">Order ID: {id}</h6>
            </div>
            <div
                className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-8 mb-6"> {/* Added mb-6 for bottom margin */}

                {/* Status, Created At, and Note Section */}
                <div className="mb-4">
                    <p className="text-lg text-gray-800"><strong>Status:</strong> {status}</p>
                    <p className="text-lg text-gray-800"><strong>Created At:</strong> {created_at}</p>
                    <p className="text-lg text-gray-800"><strong>Note:</strong> {note || 'No additional notes'}</p>
                </div>

                <div className="border-t-2 mt-4 mb-4"></div>
                {/* Horizontal Line with bottom margin */}

                {/* Cards for Pickup and Dropoff Information */}
                <div
                    className="mt-4 flex flex-col sm:flex-row space-x-0 sm:space-x-4"> {/* Adjusted for responsiveness */}
                    <div
                        className="bg-white shadow-md rounded-lg w-full p-4 mb-4 sm:mb-0"> {/* Added sm:mb-0 for no margin on large screens */}
                        <h2 className="text-xl font-semibold text-gray-800">Pickup Information</h2>
                        <p className="text-gray-600"><strong>Date:</strong> {pickup.date}</p>
                        <p className="text-gray-600"><strong>Start Time:</strong> {pickup.start_time}</p>
                        <p className="text-gray-600"><strong>End Time:</strong> {pickup.end_time}</p>
                        <p className="text-gray-600"><strong>Point:</strong> {pickup.point}</p>
                    </div>

                    <div
                        className="bg-white shadow-md rounded-lg w-full p-4 mb-4 sm:mb-0"> {/* Added sm:mb-0 for no margin on large screens */}
                        <h2 className="text-xl font-semibold text-gray-800">Dropoff Information</h2>
                        <p className="text-gray-600"><strong>Date:</strong> {dropoff.date}</p>
                        <p className="text-gray-600"><strong>Start Time:</strong> {dropoff.start_time}</p>
                        <p className="text-gray-600"><strong>End Time:</strong> {dropoff.end_time}</p>
                        <p className="text-gray-600"><strong>Point:</strong> {dropoff.point}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderItem;
