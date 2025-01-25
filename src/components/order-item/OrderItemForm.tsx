import React, {useEffect, useState} from "react";
import {Button, DialogFooter, Input, Switch, Typography} from "@material-tailwind/react";
import {config} from "@/config";
import useCreateOrder from "@/lib/api/Dashboard/hooks/order-item/useCreateOrder";

interface Props {
  orderId: string;
  setFormData: React.Dispatch<React.SetStateAction<ItemPayload>>;
  formData: ItemPayload;
  selectedItem: {
    id: string;
    name: string;
    description: string | null;
    piece: number;
    default_handling_option: string | null;
    default_cleaning_method: string | null;
    price: {
      dry_clean: string | null;
      wash: string | null;
    };
    defaults: {
      cleaning_method: string | null;
      handling_option: string | null;
    };
  } | null;
  updateInitialQuantity?: number | null;
  updateInitialPrice_per_unit?: string | null;
  updating?: boolean;
}

interface ItemPayload {
  is_open_item: boolean;
  item_id: string;
  quantity: number | null;
  cleaning_method: string | null;
  handling_option: string | null;
  price_per_unit: number | null;
}

const OrderItemForm: React.FC<Props> = ({
                                          selectedItem,
                                          orderId,
                                          formData,
                                          setFormData,
                                          updating,
                                          updateInitialQuantity,
                                          updateInitialPrice_per_unit
                                        }) => {
  const url = `${config.BASE_URL}/order-items/orders/${orderId}`;
  const {addOrderItem, loading: addLoading} = useCreateOrder(url);
  useEffect(() => {
    setFormData({
      is_open_item: false,
      item_id: selectedItem?.id || "",
      quantity: null,
      cleaning_method: selectedItem?.default_cleaning_method || null,
      handling_option: selectedItem?.default_handling_option || null,
      price_per_unit:
        selectedItem?.default_cleaning_method === "wash"
          ? parseFloat(selectedItem?.price.wash || "0")
          : parseFloat(selectedItem?.price.dry_clean || "0"),
    });
  }, [selectedItem]);

  useEffect(() => {
    if (updating && updateInitialQuantity && updateInitialPrice_per_unit) {
      setFormData({
        is_open_item: false,
        item_id: "",
        quantity: +updateInitialQuantity,
        cleaning_method: null,
        handling_option: null,
        price_per_unit: +updateInitialPrice_per_unit,
      });
    }
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ItemPayload) => {
    const value = e.target.value === "" ? null : parseFloat(e.target.value);
    setFormData((prev) => ({...prev, [key]: value}));
  };

  const handleAddOrderItem = () => {
    addOrderItem({...formData, is_open_item: false});
  };

  return (
    <div>{!updating && <>
      <Typography variant="small" color="blue-gray" className="mt-4 text-left font-medium">
        Selected Item Details:
      </Typography>
      <br/>
      <div className="grid grid-cols-2 gap-2 ">
        <Input crossOrigin="crossOrigin" label="Name" value={selectedItem?.name} readOnly/>
        <Input
          crossOrigin="crossOrigin"
          label="Description"
          value={selectedItem?.description || ""}
          readOnly
        />
      </div>
      <br/>
      <div className="grid grid-cols-2 gap-2 ">
        <select
          className="p-2 rounded w-full border border-gray-400"
          value={formData.cleaning_method || ""}
          onChange={(e) => setFormData({...formData, cleaning_method: e.target.value || null})}
        >
          <option value="" disabled>
            Choose a category
          </option>
          <option key="wash" value="wash">
            Wash
          </option>
          <option key="dry_clean" value="dry_clean">
            Dry Clean
          </option>
        </select>
        <select
          className="p-2 rounded w-full border border-gray-400"
          value={formData.handling_option || ""}
          onChange={(e) => setFormData({...formData, handling_option: e.target.value || null})}
        >
          <option value="" disabled>
            Choose a category
          </option>
          <option key="hang" value="hang">
            Hang
          </option>
          <option key="fold" value="fold">
            Fold
          </option>
        </select>
      </div>
      <br/></>}
      <Input
        crossOrigin="crossOrigin"
        type="number"
        label="Quantity"
        required
        value={formData.quantity !== null ? formData.quantity : ""}
        onChange={(e) => handleInputChange(e, "quantity")}
      />
      <br/>
      <Input
        crossOrigin="crossOrigin"
        type="number"
        label="Price per piece"
        required
        value={formData.price_per_unit !== null ? formData.price_per_unit : ""}
        onChange={(e) => handleInputChange(e, "price_per_unit")}
      />
      {/*<br/>*/}
      {/*<label>*/}
      {/*  <Switch disabled crossOrigin={`crossOrigin`} checked={formData.is_open_item}/>*/}
      {/*  &nbsp;Is Order Open*/}
      {/*</label>*/}
      {/*<br/>*/}
      {/*<button*/}
      {/*  className={`border p-2 mt-2 ${addLoading ? "cursor-not-allowed opacity-50" : ""}`}*/}
      {/*  disabled={addLoading}*/}
      {/*  onClick={handleAddOrderItem}*/}
      {/*>*/}
      {/*  {addLoading ? "Adding..." : "Add"}*/}
      {/*</button>*/}
    </div>
  );
};

export default OrderItemForm;
