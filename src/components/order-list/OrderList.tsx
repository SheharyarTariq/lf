import React, {useEffect, useMemo, useState} from 'react';
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {TableData} from "@/lib/common/TableData";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import {config} from "@/config";
import {Link, useSearchParams} from "react-router-dom";
import Pagination from "@/lib/common/Pagination";
import {orderByOptions, orderStatus, sortingOrderOptions} from "./constants";
import {OrderListProps} from "@/components/order-list/types";
import SearchBar from "@/components/order-list/SearchBar";

export const OrderList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";
  const orderBy = searchParams.get("orderBy") || "";
  const sortingOrder = searchParams.get("orderDirection") || "";
  const searchQuery = searchParams.get("search") || "";
  const currentPage = searchParams.get("page") || "";

  const queryParams = new URLSearchParams();
  if (status) queryParams.set("status", status);
  if (searchQuery) queryParams.set("search", searchQuery);
  if (orderBy) queryParams.set("orderBy", orderBy);
  if (sortingOrder) queryParams.set("orderDirection", sortingOrder);
  if (currentPage) queryParams.set("page", currentPage);

  const apiUrl = `${config.BASE_URL}/admin/orders?${queryParams.toString()}`;
  const {data, error, loading, refetch} = useFetch<any>(apiUrl);

  const totalPage = useMemo(() => data?.result?.meta?.last_page || 1, [data]);

  const updateParams = (key: string, value: string) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key); // Remove param if empty
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
              Orders
            </Typography>
          </CardHeader>

          <div className="flex justify-end gap-2 px-2">
            <div className="mr-auto">
              <SearchBar updateParams={updateParams}/>
            </div>
            <label> Status:&nbsp;
              <select className="p-2 rounded border border-gray-400" value={status}
                      onChange={e => updateParams("status", e.target.value)}>
                <option value="">All</option>
                {orderStatus.map(({label, value}) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label>Order By:&nbsp;
              <select
                className="p-2 rounded border border-gray-400" value={orderBy}
                onChange={e => updateParams("orderBy", e.target.value)}>
                <option value="">None</option>
                {orderByOptions.map(({label, value}) => <option key={value} value={value}>{label}</option>)}
              </select></label>
            <label htmlFor="">Sorting Order:&nbsp;
              <select className="p-2 rounded border border-gray-400" value={sortingOrder}
                      onChange={e => updateParams("orderDirection", e.target.value)}>
                <option value="">None</option>
                {sortingOrderOptions.map(({label, value}) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
          </div>

          {/* Orders Table */}
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full table-auto">
              <thead>
              <tr>
                {["Order#", "status", "created_at", "note", "pickup", "dropoff", "Action"].map((el, idx) => (
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
                <tr><TableData colspan={6} data={error} classes="text-center p-4" textColor="red"/></tr>
              ) : (
                data?.result?.data.map(({
                                          id,
                                          number,
                                          status,
                                          created_at,
                                          note,
                                          pickup,
                                          dropoff
                                        }: OrderListProps, key: number) => {
                  const className = `py-3 px-5 ${key === data.result.data.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={id}>
                      <TableData classes={className} data={number}/>
                      <TableData classes={className} data={status}/>
                      <TableData classes={className} data={created_at}/>
                      <TableData classes={className} data={note}/>
                      <TableData classes={className} data={pickup?.date || ""}/>
                      <TableData classes={className} data={dropoff?.date || ""}/>
                      <TableData classes={className} data={<Link to={id}>Click</Link>}/>
                    </tr>
                    // </Link>
                  );
                })
              )}
              {loading && <tr><TableData data="Loading..." classes="text-center p-4" colspan={6} noBold={true}/></tr>}
              {data?.result?.data.length === 0 &&
                <tr><TableData data="No Data" classes="text-center p-4" colspan={6} noBold={true}/></tr>}
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
