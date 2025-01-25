import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography,} from "@material-tailwind/react";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import SelectItemFromDropDown from "@/components/order-item/SelectItemFromDropDown";
import {config} from "@/config";
import useCreateOrder from "@/lib/api/Dashboard/hooks/order-item/useCreateOrder";
import useUpdateServiceAvailability from "@/lib/api/Dashboard/hooks/serviceAvailability/useUpdateServiceAvailability";
import useUpdateOrderItem from "@/lib/api/Dashboard/hooks/order-item/useUpdateOrderItem";

interface AddItemFromCategoryProps {
  dialogLabel?: string;
  orderId: string;
  onSuccess?: () => void;
  refetchItemList: () => void;
  updateInitialQuantity?: number | null;
  updateInitialPrice_per_unit?: string | null;
  updating?: boolean;
  orderItemId?: string
}

interface ItemPayload {
  is_open_item: boolean;
  item_id: string;
  quantity: number | null;
  cleaning_method: string | null;
  handling_option: string | null;
  price_per_unit: number | null;

}

export const AddItemFromCategory: React.FC<AddItemFromCategoryProps> = ({
                                                                          dialogLabel,
                                                                          orderId,
                                                                          onSuccess,
                                                                          refetchItemList,
                                                                          updating,
                                                                          updateInitialQuantity,
                                                                          updateInitialPrice_per_unit,
                                                                          orderItemId
                                                                        }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const categoriesUrl = `${BASE_URL}/categories`;
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {data, error, loading, refetch} = useFetch<any>(categoriesUrl);
  const url = `${config.BASE_URL}/order-items/orders/${orderId}`;
  const {addOrderItem, loading: addLoading} = useCreateOrder(url);
  const {update, loading: updateLoading,} = useUpdateOrderItem(`${config.BASE_URL}/order-items/${orderItemId}`);
  const [formData, setFormData] = useState<ItemPayload>({
    is_open_item: false,
    item_id: "",
    quantity: null,
    cleaning_method: null,
    handling_option: null,
    price_per_unit: null,
  });


  const handleOpen = () => {
    refetch();
    setOpen((prev) => !prev);
  };
  const handleAddOrderItem = async () => {
    if (!updating) {
      await addOrderItem({...formData, is_open_item: false});
    } else {
      await update({price_per_unit: formData.price_per_unit, quantity: formData.quantity})
    }
    handleOpen();
    refetchItemList();
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
  };


  return (<>
    <Button
      variant="text"
      color="blue-gray"
      size="sm"
      onClick={handleOpen}
      className={`${!dialogLabel && "text-black hover:bg-gray-300 text-center bg-gray-100"}`}
    >
      {dialogLabel ? dialogLabel : <i className="fa-solid fa-plus"></i>}
    </Button>
    <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Select Category
        </Typography>

      </DialogHeader>
      <DialogBody className="space-y-4 pb-6">

        {!updating && <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Select Category to Order
          </Typography>
          {loading ? (<p className="text-gray-600">Loading categories...</p>) : error ? (
            <p className="text-red-500 text-xs">Error: {error}</p>) : data?.result?.length > 0 ? (
            <select
              className="p-2 rounded w-full border border-gray-400"
              value={selectedCategory || ""}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Choose a category
              </option>
              {data.result.map((category: { id: string; name: string }) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>))}
            </select>) : (<p className="text-gray-600">No categories available.</p>)}
        </div>}
        {(selectedCategory || updating) && <div>
          <SelectItemFromDropDown categoryId={selectedCategory} orderId={orderId} formData={formData}
                                  setFormData={setFormData} updating={updating}
                                  updateInitialQuantity={updateInitialQuantity}
                                  updateInitialPrice_per_unit={updateInitialPrice_per_unit}/>
        </div>}

      </DialogBody>
      <DialogFooter>
        <Button
          disabled={loading || addLoading || (!selectedCategory && !updating)}
          className={`border ml-auto p-2 mt-2 ${addLoading ? "cursor-not-allowed opacity-50" : ""}`}
          onClick={handleAddOrderItem}
        >
          {addLoading ? "Adding..." : "Add"}
        </Button>
      </DialogFooter>
    </Dialog>
  </>);
};

export default AddItemFromCategory;
