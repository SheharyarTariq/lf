import React from 'react';
import useFetch from "@/lib/api/Dashboard/hooks/useFetch";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {TableData} from "@/lib/common/TableData";
import DeleteModal from "@/lib/common/DeleteModal";
import OrderDetailsCard from "@/components/order-item/OrderDetailsCard";
import {OrderItems} from "@/components/order-item/types";
import {useParams} from "react-router-dom";
import {cleaningMethods, handlingOptions} from "@/components/constants";
import {adminOrder, orderItem} from "@/api";
import {AddItemFromCategory2} from "@/components/order-item/AddItemFromCategory2";

const OrderItem: React.FC = () => {
  const {orderId} = useParams();
  // if ()
  const {fetchData: data, errors: orderDetailError, loading, refetch} = useFetch<any>(`${adminOrder}/${orderId}`);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (orderDetailError) {
    return <p>Error loading data: {orderDetailError.message || "Unknown error"}</p>;
  }

  if (!data || !data.result) {
    return <p>No order details available.</p>;
  }

  const {result} = data;
  return (
    <>
      <OrderDetailsCard result={result} id={orderId || null}/>
      <br/>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white" className="flex items-center">
            <div className="flex items-center">
              Order Items
            </div>
            <span className="ml-auto">
        {!orderDetailError && (<AddItemFromCategory2 orderId={orderId || ""} refetchItemList={refetch}/>)}
      </span>
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
            <tr>
              {["Name", "Quantity", "Cleaning Method", "Handling Option", "Unit Price", "Total Price", "Approved", "Open item", "Action"].map((el, idx) => (
                <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small"
                              className="text-[11px] font-bold uppercase text-blue-gray-400">
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {result.order_items.length > 0 ? (
              result.order_items.map(({
                                        id,
                                        name,
                                        quantity,
                                        cleaning_method,
                                        handling_option,
                                        price_per_unit,
                                        total_price,
                                        is_approved,
                                        is_open_item,
                                        piece
                                      }: OrderItems, idx: number) => (
                <tr key={id}>
                  <TableData classes="py-3 px-5" data={name}/>
                  <TableData classes="py-3 px-5" data={quantity}/>
                  <TableData classes="py-3 px-5"
                             data={cleaningMethods.find(element => element.value === cleaning_method)?.label}/>
                  <TableData classes="py-3 px-5"
                             data={handlingOptions.find(element => element.value === handling_option)?.label}/>
                  <TableData classes="py-3 px-5" data={price_per_unit}/>
                  <TableData classes="py-3 px-5" data={total_price}/>
                  <TableData classes="py-3 px-5" data={is_approved ? "Yes" : "No"}/>
                  <TableData classes="py-3 px-5" data={is_open_item ? "Yes" : "No"}/>
                  <TableData classes="py-3 px-5" data={<span className={`flex`}>
                    <AddItemFromCategory2
                      orderId={id}
                      refetchItemList={refetch}
                      dialogLabel="Edit"
                      updating={true}
                      name={name}
                      updateInitialQuantity={quantity}
                      cleaning_method={cleaning_method}
                      updateInitialPrice_per_unit={price_per_unit}
                      orderItemId={id}
                      updateValue_is_open_item={is_open_item}
                      handling_option={handling_option}
                      piece={piece}
                    />
                    <DeleteModal
                      toastMessage="Order Item deleted" btnLabel='Delete'
                      title="Delete Confirmation"
                      refetch={refetch}
                      description={`Are you sure you want to Delete this Order item (${name})?`}
                      url={`${orderItem}/${id}`}
                    />
                  </span>}/></tr>
              ))
            ) : (
              <tr>
                <TableData data="No items found." classes="text-center p-4" colspan={9} noBold={true}/>
              </tr>
            )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
};

export default OrderItem;
