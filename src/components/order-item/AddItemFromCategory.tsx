import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Switch, Typography,} from "@material-tailwind/react";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import SelectItemFromDropDown from "@/components/order-item/SelectItemFromDropDown";
import {config} from "@/config";
import usePost from "@/lib/api/Dashboard/hooks/usePost";
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";

interface AddItemFromCategoryProps {
  dialogLabel?: string;
  orderId: string | null;
  // onSuccess?: () => void;
  refetchItemList: () => void;
  updateInitialQuantity?: number | null;
  updateInitialPrice_per_unit?: string | null;
  updating?: boolean;
  orderItemId?: string
  updateValue_is_open_item?: boolean
  name?: string
  cleaning_method?: string | null;
  handling_option?: string | null;
  piece?: string | null;
}

interface ItemPayload {
  is_open_item: boolean;
  item_id: string;
  open_item_name: string,
  piece: number,
  quantity: number | null;
  cleaning_method?: string | null;
  handling_option: string | null;
  price_per_unit: number | null;
}

export const AddItemFromCategory: React.FC<AddItemFromCategoryProps> = ({
                                                                          dialogLabel,
                                                                          orderId,
                                                                          // onSuccess,
                                                                          refetchItemList,
                                                                          updating,
                                                                          updateInitialQuantity,
                                                                          updateInitialPrice_per_unit,
                                                                          orderItemId,
                                                                          updateValue_is_open_item,
                                                                          name,
                                                                          cleaning_method,
                                                                          handling_option,
                                                                          piece
                                                                        }) => {
  const categoriesUrl = `${config.BASE_URL}/categories`;
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {data, error, loading, refetch} = useFetch<any>(categoriesUrl);
  const url = `${config.BASE_URL}/order-items/orders/${orderId}`;
  // const {addOrderItem, loading: addLoading} = useCreateOrder(url);
  const {postData: addOrderItem, loading: addLoading, errors: postError} = usePost(url)
  // const {update, loading: updateLoading,} = useUpdateOrderItem(`${config.BASE_URL}/order-items/${orderItemId}`);
  const {
    updateData: update,
    loading: updateLoading,
    errors: updateError
  } = useUpdate(`${config.BASE_URL}/order-items/${orderItemId}`);
  const [formData, setFormData] = useState<ItemPayload>({
    is_open_item: false,
    item_id: "",
    open_item_name: "",
    piece: 1,
    quantity: null,
    cleaning_method: null,
    handling_option: null,
    price_per_unit: null,
  });
  console.log("Errors", postError);

  useEffect(() => {
    if (updating) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        is_open_item: updateValue_is_open_item ?? prevFormData.is_open_item,
        item_id: orderItemId ?? prevFormData.item_id,
        open_item_name: name ?? prevFormData.open_item_name,
        piece: piece ? +piece : prevFormData.piece,
        cleaning_method: cleaning_method ?? prevFormData.cleaning_method,
        handling_option: handling_option ?? prevFormData.handling_option,
        quantity: updateInitialQuantity ?? prevFormData.quantity,
        price_per_unit: updateInitialPrice_per_unit
          ? +updateInitialPrice_per_unit
          : prevFormData.price_per_unit,
      }));
    }
  }, [
    updating,
    updateValue_is_open_item,
    orderItemId,
    name,
    piece,
    cleaning_method,
    handling_option,
    updateInitialQuantity,
    updateInitialPrice_per_unit,
  ]);


  const handleOpen = () => {
    refetch();
    setOpen((prev) => !prev);
  };

  const handleAddOrderItem = async () => {
    if (!updating) {
      if (formData.is_open_item) { //open item post data
        const payload = {
          is_open_item: formData.is_open_item,
          open_item_name: formData.open_item_name,
          piece: formData.piece,
          quantity: formData.quantity,
          cleaning_method: formData.cleaning_method,
          handling_option: formData.handling_option,
          price_per_unit: formData.price_per_unit,
        }
        const response = await addOrderItem(payload);
        if (response.success) {
          handleOpen();
          refetchItemList();
        }
      } else {// not open item post data
        const payload = {
          is_open_item: formData.is_open_item,
          item_id: formData.item_id,
          quantity: formData.quantity,
          cleaning_method: formData.cleaning_method,
          handling_option: formData.handling_option,
          price_per_unit: formData.price_per_unit,
        }
        const response = await addOrderItem(payload);
        if (response.success) {
          handleOpen();
          refetchItemList();
        }
      }
    } else {
      if (formData.is_open_item) {
        const response = await update(formData)
        if (response.success) {
          handleOpen();
          refetchItemList();
        }
      } else {
        const response = await update({price_per_unit: formData.price_per_unit, quantity: formData.quantity})
        if (response.success) {
          handleOpen();
          refetchItemList();
        }
      }
    }
    // handleOpen();
    // refetchItemList();
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
  };

  const handleOpenItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, is_open_item: e.target.checked});
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
        {!updating &&
          <> <br/>
            <label>
              <Switch crossOrigin={`crossOrigin`} checked={formData.is_open_item} onChange={handleOpenItem}/>
              &nbsp;Is Order Open
            </label>
            <br/></>
        }
        {(!updating && !formData.is_open_item) && <div>
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
        {(selectedCategory || updating || formData.is_open_item) && <div>
          <SelectItemFromDropDown categoryId={selectedCategory}
                                  orderId={orderId || ""}
                                  formData={formData}
                                  setFormData={setFormData}
                                  updating={updating}
                                  updateInitialQuantity={updateInitialQuantity}
                                  updateInitialPrice_per_unit={updateInitialPrice_per_unit}
                                  updateValue_is_open_item={updateValue_is_open_item}
                                  Error={postError || updateError}
          />
        </div>}

      </DialogBody>
      <DialogFooter>
        <Button
          disabled={loading || addLoading || (!selectedCategory && !updating && !formData.is_open_item)}
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
