import React, {useMemo} from 'react';
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {TableData} from "@/lib/common/TableData";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import {config} from "@/config";
import {Link, useSearchParams} from "react-router-dom";
import SearchBar from "@/lib/common/SearchBar";
import Pagination from "@/lib/common/Pagination";

export interface UsersListProps {
  id: string;
  full_name: string;
  email: string;
  email_verified_at: string;
  phone: string;
  address: {
    address_line_1: string;
    address_line_2: string;
    address_line_3: string;
    city: string;
    district: string;
    "county": string,
    "country": string,
    "postcode": string,
    "is_service_available": string
  }
  price_review_required: boolean;
  shirt_handling: string;
  payment_methods: []
}

export const UsersList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const currentPage = searchParams.get("page") || "";

  const queryParams = new URLSearchParams();

  if (currentPage) queryParams.set("page", currentPage);
  if (searchQuery) queryParams.set("search", searchQuery);

  const apiUrl = `${config.BASE_URL}/admin/users?${queryParams.toString()}`;
  const {data, error, loading, refetch} = useFetch<any>(apiUrl);

  const totalPage = useMemo(() => data?.result?.meta?.last_page || 1, [data]);

  const updateParams = (key: string, value: string) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      return params;
    });
  };

  const updatePage = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (page > 1) {
        params.set("page", page.toString());
      } else {
        params.delete("page");
      }
      return params;
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <>
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white" className="flex items-center">
              Users
            </Typography>
          </CardHeader>

          <div className="flex justify-end gap-2 px-2">
            <div className="mr-auto">
              <SearchBar updateParams={updateParams}/>
            </div>
          </div>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full table-auto">
              <thead>
              <tr>
                {["Full Name", "Email", "Phone", "Post Code", "Action"].map((el, idx) => (
                  <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {error ? (
                <tr><TableData colspan={8} data={error} classes="text-center p-4" textColor="red"/></tr>
              ) : (
                data?.result?.data.map(({
                                          id,
                                          full_name,
                                          email,
                                          email_verified_at,
                                          phone,
                                          address,
                                          price_review_required,
                                          shirt_handling
                                        }: UsersListProps, key: number) => {
                  const className = `py-3 px-5 ${key === data.result.data.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={id}>
                      <TableData classes={className} data={full_name}/>
                      <TableData classes={className} data={email}/>
                      <TableData classes={className} data={phone}/>
                      <TableData classes={className} data={address.postcode}/>
                      <TableData classes={className} data={<Link to={id}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </Link>}/>
                    </tr>

                  );
                })
              )}
              {loading && <tr><TableData data="Loading..." classes="text-center p-4" colspan={8} noBold={true}/></tr>}
              {data?.result?.data.length === 0 &&
                <tr><TableData data="No Data" classes="text-center p-4" colspan={8} noBold={true}/></tr>}
              </tbody>
            </table>
          </CardBody>
        </Card>

        <div className="flex flex-col sm:flex-row justify-center">
          <Pagination currentPage={parseInt(currentPage) || 1} setCurrentPage={updatePage} totalPage={totalPage}/>
        </div>
      </>
      {/*)}*/}
    </div>
  );
};
