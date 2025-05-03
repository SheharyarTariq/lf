import React, {useEffect, useState} from 'react';

interface PostcodeCardProps {
  children?: React.ReactNode;
  data?: {
    result: {
      name: string,
      id: string,
      postcodes: {
        is_active: boolean,
        postcode: string,
        id: string
      }[]

    }
  }
}

const PostcodeCard: React.FC<PostcodeCardProps> = ({children, data}) => {
  const [activePostcodes, setActivePostcodes] = useState(0);
  useEffect(() => {
    const countActivePostcodes = () => {
      let counter = 0;
      data?.result?.postcodes?.forEach((postcode: { is_active: boolean }) => {
        if (postcode.is_active) {
          counter += 1;
        }
      });
      return counter;
    };
    if (data != null) {
      setActivePostcodes(countActivePostcodes)
    }
  }, [data?.result.postcodes]);

  return (
    <>
      <div>
        <div className="mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">Area:&nbsp;{data?.result?.name}</h1>
          <h6 className="text-gray-500 text-sm">Area ID:&nbsp;{data?.result?.id}</h6>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-8 mb-6">
          <div className="mb-4 flex justify-between">
            <div>
              <p className="text-lg text-gray-800 "><strong>Name:&nbsp;</strong>{data?.result?.name}</p>
              <p className="text-lg text-gray-800">
                <strong>Total Postcodes:&nbsp;</strong>{data?.result?.postcodes?.length}</p>
              <p className="text-lg text-gray-800"><strong>Active Postcodes:&nbsp;</strong>{activePostcodes}</p>
            </div>
            <div>
              {children}
            </div>
          </div>

          {/*<div className="border-t-2 mt-4 mb-4"></div>*/}
          {/*<div className="mt-4 flex flex-col sm:flex-row space-x-0 sm:space-x-4">*/}
          {/*  <div className="bg-white shadow-md rounded-lg w-full p-4 mb-4 sm:mb-0">*/}
          {/*    <h2 className="text-xl font-semibold text-gray-800">Address</h2>*/}
          {/*    <p className="text-gray-600"><strong>City:</strong></p>*/}
          {/*    <p className="text-gray-600"><strong>Postcode:</strong></p>*/}
          {/*    <p className="text-gray-600"><strong>Street*/}
          {/*      Address:</strong>*/}
          {/*    </p>*/}
          {/*    <p className="text-gray-600"><strong>Country:</strong></p>*/}
          {/*  </div>*/}

          {/*  <div className="bg-white shadow-md rounded-lg w-full p-4 mb-4 sm:mb-0">*/}
          {/*    <h2 className="text-xl font-semibold text-gray-800">Information</h2>*/}
          {/*    <p className="text-gray-600"><strong>Email verified at:</strong></p>*/}
          {/*    <p className="text-gray-600"><strong>Active Address:</strong>*/}
          {/*    </p>*/}
          {/*    <p className="text-gray-600"><strong>Price*/}
          {/*      Preview:</strong></p>*/}
          {/*    <p className="text-gray-600"><strong>Shirt Handling Method:</strong></p>*/}
          {/*    <p className="text-gray-600"><strong>Payment Method:</strong></p>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </>);
}

export default PostcodeCard;