import React from 'react';
import useFetch from "@/lib/api/Dashboard/hooks/useFetch";
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
  const {fetchData: data, errors, loading, refetch} = useFetch<any>(`${config.BASE_URL}/admin/users/${userId}`);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (errors) {
    return <p>Error loading data: {errors.message || "Unknown error"}</p>;
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
            <p className="text-lg text-gray-800"><strong>Phone:</strong> {data.result.phone}</p>
          </div>
          <div className="border-t-2 mt-4 mb-4"></div>
          <div className="mt-4 flex flex-col sm:flex-row space-x-0 sm:space-x-4">
            <div className="bg-white shadow-md rounded-lg w-full p-4 mb-4 sm:mb-0">
              <h2 className="text-xl font-semibold text-gray-800">Address</h2>
              <p className="text-gray-600"><strong>City:</strong> {data.result.address.city}</p>
              <p className="text-gray-600"><strong>Postcode:</strong> {data.result.address.postcode}</p>
              <p className="text-gray-600"><strong>Street
                Address:</strong> {`${data.result.address.line_1 ? data.result.address.line_1 + " " : ""} ${data.result.address.line_2 ? data.result.address.line_2 + " " : ""} ${data.result.address.line_3 ? data.result.address.line_3 + " " : ""}`}
              </p>
              <p className="text-gray-600"><strong>Country:</strong> {data.result.address.country}</p>

            </div>

            <div className="bg-white shadow-md rounded-lg w-full p-4 mb-4 sm:mb-0">
              <h2 className="text-xl font-semibold text-gray-800">Information</h2>
              <p className="text-gray-600"><strong>Email verified at:</strong> {data.result.email_verified_at}</p>
              <p className="text-gray-600"><strong>Active Address:</strong> {data.result.has_active_address}
              </p>
              <p className="text-gray-600"><strong>Price
                Preview:</strong> {data.result.price_review_required === true ? "Yes" : "No"}</p>
              <p className="text-gray-600"><strong>Shirt Handling Method:</strong> {data.result.shirt_handling}</p>
              <p className="text-gray-600"><strong>Payment Method:</strong> {data.result.payment_methods[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
