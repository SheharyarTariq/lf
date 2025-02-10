import React from 'react';
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import {useParams} from "react-router-dom";
import {config} from "@/config";


interface UserDetail {
  id: string,
  full_name: string,
  email: string,
  email_verified_at: string,
  phone: string,
  address_line_1: string | null,
  address_line_2: string | null,
  address_line_3: string | null,
  city: string | null,
  district: string | null,
  county: string | null,
  country: string | null,
  postcode: string,
  is_service_available: boolean,
  price_review_required: boolean,
  shirt_handling: string | null,
  payment_methods: []
}

const UserDetail: React.FC = () => {
  const {userId} = useParams();
  const {data, error, loading, refetch} = useFetch<any>(`${config.BASE_URL}/admin/users/${userId}`);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error || "Unknown error"}</p>;
  }

  if (!data || !data.result) {
    return <p>No order details available.</p>;
  }

  // const {result} = data;
  console.log("daras", data);

  return (
    <>

      <div>
        <div className="mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">Name: {data.result.full_name}</h1>
          <h6 className="text-gray-500 text-sm">User ID: {data.result.id}</h6>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-8 mb-6">
          <div className="mb-4">
            <p className="text-lg text-gray-800 "><strong>
              Name:</strong> {data.result.full_name}</p>
            <p className="text-lg text-gray-800">
              <strong>Email:</strong> {data.result.email || 'No additional notes'}</p>
            <p><strong>Phone:</strong> {data.result.phone}</p>
          </div>
          <div className="border-t-2 mt-4 mb-4"></div>
          <div className="mt-4 flex flex-col sm:flex-row space-x-0 sm:space-x-4">
            {/*<div className="bg-white shadow-md rounded-lg w-full p-4 mb-4 sm:mb-0">*/}
            {/*  <h2 className="text-xl font-semibold text-gray-800">Pickup Information</h2>*/}
            {/*  <p className="text-gray-600"><strong>Date:</strong> {data.result.postcode}</p>*/}
            {/*  <p className="text-gray-600"><strong>Time:</strong> {data.result.pickup?.time}</p>*/}
            {/*  <p className="text-gray-600"><strong>Point:</strong> {data.result.pickup?.point}</p>*/}
            {/*</div>*/}

            {/*<div className="bg-white shadow-md rounded-lg w-full p-4 mb-4 sm:mb-0">*/}
            {/*  <h2 className="text-xl font-semibold text-gray-800">Dropoff Information</h2>*/}
            {/*  <p className="text-gray-600"><strong>Date:</strong> {data.result.email}</p>*/}
            {/*  <p className="text-gray-600"><strong>Time:</strong> {data.result.dropoff?.time}</p>*/}
            {/*  <p className="text-gray-600"><strong>Point:</strong> {data.result.dropoff?.point}</p>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
