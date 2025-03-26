import React from 'react';

export interface Category {

  data?: {
    id: string;
    name: string;
    description: string;
    position: number;
    is_hangable: boolean; // 1 or 0 from API, so converting it to boolean is better
    is_foldable: boolean; // 1 or 0 from API, so converting it to boolean is better
    default_handling_option: "hang" | "fold";
    items: [];
  }
}

const CategoryCard: React.FC<Category> = ({data}) => {


  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">Category: {data?.name}</h1>
        <h6 className="text-gray-500 text-sm">Category ID: {data?.id}</h6>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-8 mb-6">
        <div className="mb-4 grid grid-cols-2">
          <span>
          <p className="text-lg text-gray-800 "><strong>Name:</strong> {data?.name} </p>
          <p className="text-lg text-gray-800"><strong>Category Id:</strong> {data?.id}</p>
          <p className="text-lg text-gray-800"><strong>Total Items:</strong> {data?.items.length}</p>
          </span>
        </div>
        <div className="border-t-2 mt-4 mb-4"></div>
        <div className="mt-4 flex flex-col sm:flex-row space-x-0 sm:space-x-4">

          <div className="bg-white shadow-md border rounded-lg w-full p-4 mb-4 sm:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">Information</h2>
            <p className="text-gray-600"><strong>Position:</strong> {data?.position}</p>
            <p className="text-gray-600"><strong>Foldable:</strong> {data?.is_foldable ? "Yes" : "No"}</p>
            <p className="text-gray-600"><strong>Hangable:</strong> {data?.is_hangable ? "Yes" : "No"}</p>
            <p className="text-gray-600"><strong>Handling Option:</strong> {data?.default_handling_option}</p>
          </div>
          <div className="bg-white shadow-md border rounded-lg w-full p-4 mb-4 sm:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">Description</h2>
            <p className="text-gray-600"> {data?.description}</p>
            {/*<p className="text-gray-600"><strong>Time:</strong> {data?.position}</p>*/}
          </div>
        </div>
      </div>
    </div>);
}

export default CategoryCard;
