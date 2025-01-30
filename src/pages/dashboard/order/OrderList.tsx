import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {TableData} from "@/lib/common/TableData";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import OrderItem from "@/pages/dashboard/order-item/OrderItem";
import {OrderListProps} from "@/pages/dashboard/types";
import {config} from "@/config";
import {useSearchParams} from "react-router-dom";
import Pagination from "@/lib/common/Pagination";
import {orderByOptions, OrderStatus, sortingOrderOptions} from "@/lib/enum/constants";

const OrderList: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') || 'created';
  const orderBy = searchParams.get('orderBy') || 'number';
  const sortingOrder = searchParams.get('orderDirection') || 'desc';
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const apiUrl = `${config.BASE_URL}/admin/orders?status=${status}&page=${currentPage}&orderBy=${orderBy}&orderDirection=${sortingOrder}`;
  const {data, error, loading, refetch} = useFetch<any>(apiUrl);

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
    if (pageFromParams <= totalPage) {
      setCurrentPage(pageFromParams);
    }
  }, [searchParams, totalPage]);

  useEffect(() => {
    if (data?.result?.meta) {
      setTotalPage(data.result.meta.last_page);
    } else {
      setTotalPage(1);
    }
  }, [data]);

  const updatePage = (page: number) => {
    setCurrentPage(page);
    setSearchParams({status, page: page.toString()});
  };

  const formatPickupDropoff = (data: Record<string, string>) => {
    return Object.entries(data)
      .filter(([key]) => key === "date" || key === "time")
      .map(([key, value]) => <div key={key}>{value}</div>);
  };

  const handleRowClick = (orderId: string) => {
    setSelectedOrder(orderId);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({status: e.target.value, page: "1"});
  };
  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({orderBy: e.target.value, page: "1"});
  };
  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({orderDirection: e.target.value, page: "1"});
  };

  return (

    <div className="mt-12 mb-8 flex flex-col gap-12">
      {selectedOrder ? (
        <div className="w-full">
          <OrderItem id={selectedOrder}/>
          <button
            onClick={handleBackToList}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md"
          >
            Back to Orders List
          </button>
        </div>
      ) : (<>
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
              <Typography variant="h6" color="white" className="flex items-center">
                Orders
              </Typography>
            </CardHeader>
            <div className="flex justify-end gap-2 px-2">
              <select className="p-2 rounded border border-gray-400"
                      value={status}
                      onChange={handleStatusChange}
              >
                {Object.entries(OrderStatus)
                  .map(([key, status]) => (
                    <option key={status} value={status}>
                      {key} - {status.replace(/_/g, ' ').toUpperCase()}
                    </option>))}
              </select>
              <select className="p-2 rounded border border-gray-400 "
                      value={orderBy}
                      onChange={handleOrderByChange}
              >
                {orderByOptions.map(({label, value}) => (
                  <option key={value} value={value}>
                    {label}
                  </option>))}
              </select>
              <select className="p-2 rounded border border-gray-400 "
                      value={sortingOrder}
                      onChange={handleSortingChange}
              >
                {sortingOrderOptions.map(({label, value}) => (
                  <option key={value} value={value}>
                    {label}
                  </option>))}
              </select>
            </div>

            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full table-auto">

                <thead>

                <tr>
                  {["Order#", "status", "created_at", "note", "pickup", "dropoff"].map(
                    (el, idx) => (
                      <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
                </thead>
                <tbody>
                {error ? (
                  <tr>
                    <TableData colspan={6} data={error} classes="text-center p-4 " textColor="red"/>
                  </tr>
                ) : (
                  data?.result?.data.map(
                    ({id, number, status, created_at, note, pickup, dropoff}: OrderListProps, key: number) => {
                      const className = `py-3 px-5 ${key === data.result.data.length - 1 ? " " : "border-b border-blue-gray-50"}`;

                      return (
                        <tr key={id} onClick={() => handleRowClick(id)} className="cursor-pointer">
                          <TableData classes={className} data={number}/>
                          <TableData classes={className} data={status}/>
                          <TableData classes={className} data={created_at}/>
                          <TableData classes={className} data={note}/>
                          <TableData classes={className} data={formatPickupDropoff(pickup)}/>
                          <TableData classes={className} data={formatPickupDropoff(dropoff)}/>
                        </tr>
                      );
                    }
                  )
                )}
                {loading && (
                  <tr>
                    <TableData data="Loading..." classes="text-center p-4 " colspan={6} noBold={true}/>
                  </tr>
                )}
                {data?.result?.data.length === 0 && (
                  <tr>
                    <TableData data="No Data" classes="text-center p-4 " colspan={6} noBold={true}/>
                  </tr>
                )}
                </tbody>
              </table>
            </CardBody>
          </Card>
          <div className="flex flex-col sm:flex-row justify-center ">
            <Pagination currentPage={currentPage} setCurrentPage={updatePage} totalPage={totalPage}/>
          </div>
        </>
      )
      }
    </div>


  )
    ;
};

export default OrderList;
