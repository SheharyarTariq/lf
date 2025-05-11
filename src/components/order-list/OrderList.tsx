import React, {useMemo, useState} from 'react';
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {TableData} from "@/lib/common/TableData";
import useFetch from "@/lib/api/Dashboard/hooks/useFetch";
import {Link, useSearchParams} from "react-router-dom";
import Pagination from "@/lib/common/Pagination";
import {orderByOptions, orderStatus, sortingOrderOptions} from "./constants";
import {OrderListProps} from "@/components/order-list/types";
import SearchBar from "@/lib/common/SearchBar";
import {MyIcon} from "@/assets/sort";
import {adminOrder} from "@/api";
import CommonButtonWhite from "@/lib/common/CommonButtonWhite";
import Arrow from "@/lib/common/Arrow";

export const OrderList: React.FC = () => {
  const [activeLabel, setActiveLable] = useState("")
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

  const {
    fetchData: data,
    errors: orderListError,
    loading,
    refetch
  } = useFetch<any>(`${adminOrder}?${queryParams.toString()}`);

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
              Orders
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="flex gap-2 px-2">
              <div className=" ">
                <SearchBar updateParams={updateParams}/>
              </div>
              <label> Status:&nbsp;
                <select className="p-2 rounded border border-gray-400" value={status}
                        onChange={e => updateParams("status", e.target.value)}>
                  <option value="">All</option>
                  {orderStatus.map(({label, value}) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              {/*<label>Order&nbsp;By:&nbsp;*/}
              {/*  <select className="p-2 rounded border border-gray-400" value={orderBy} onChange={e => updateParams("orderBy", e.target.value)}>*/}
              {/*    <option value="">None</option>*/}
              {/*    {orderByOptions.map(({label, value}) => <option key={value} value={value}>{label}</option>)}*/}
              {/*  </select>*/}
              {/*</label>*/}
              {/*<label>Sorting&nbsp;Order:&nbsp;*/}
              {/*  <select className="p-2 rounded border border-gray-400" value={sortingOrder}*/}
              {/*          onChange={e => updateParams("orderDirection", e.target.value)}>*/}
              {/*    <option value="">None</option>*/}
              {/*    {sortingOrderOptions.map(({label, value}) => <option key={value} value={value}>{label}</option>)}*/}
              {/*  </select>*/}
              {/*</label>*/}
            </div>
            <table className="w-full table-auto">
              <thead>
              <tr>
                {[<MyIcon text="Order#" setActiveLabel={setActiveLable} activeLabel={activeLabel}
                          updateParams={updateParams}/>,
                  <MyIcon text="Status" setActiveLabel={setActiveLable} activeLabel={activeLabel}
                          updateParams={updateParams}/>,
                  <MyIcon text="Created At" setActiveLabel={setActiveLable} activeLabel={activeLabel}
                          updateParams={updateParams}/>,
                  "Note", "User",
                  <MyIcon text="Pickup" setActiveLabel={setActiveLable} activeLabel={activeLabel}
                          updateParams={updateParams}/>,
                  <MyIcon text="Dropoff " setActiveLabel={setActiveLable} activeLabel={activeLabel}
                          updateParams={updateParams}/>,
                  "Action"].map((el, idx) => (
                  <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el || "-"}
                    </Typography>
                  </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {orderListError ? (
                <tr><TableData colspan={8} data={orderListError.message} classes="text-center p-4" textColor="red"/>
                </tr>
              ) : (
                data?.result?.data.map(({
                                          id,
                                          number,
                                          status,
                                          created_at,
                                          note,
                                          pickup,
                                          dropoff, user
                                        }: OrderListProps, key: number) => {
                  const className = `py-3 px-5 ${key === data.result.data.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={id}>
                      <TableData classes={className} data={number}/>
                      <TableData classes={className}
                                 data={orderStatus.find(element => element.value === status)?.label}/>
                      <TableData classes={className}
                                 data={<>{created_at.split(' ')[0]}<br/>{created_at.split(' ')[1]}</>}/>
                      <TableData classes={className} data={note || "-"}/>
                      <TableData classes={className} data={<>{user?.full_name}<br/>{user?.email}</>}/>
                      <TableData classes={className} data={<>{pickup?.date}<br/>{pickup?.time}</>}/>
                      <TableData classes={className} data={<>{dropoff?.date || "-"}<br/>{dropoff?.time || "-"}</>}/>
                      <TableData classes={className} data={
                        <Link to={id}>
                          <CommonButtonWhite>
                            <Arrow/>
                          </CommonButtonWhite>
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
