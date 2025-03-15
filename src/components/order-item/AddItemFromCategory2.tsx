import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Switch, Typography,} from "@material-tailwind/react";
import useFetch from "@/lib/api/Dashboard/hooks/useFetch";
import usePost from "@/lib/api/Dashboard/hooks/usePost";
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";
import {category, item, orderItem} from "@/api";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import OrderItemForm2 from "@/components/order-item/OrderItemForm2";

interface AddItemFromCategoryProps {
  dialogLabel?: string;
  orderId: string | null;
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

export const schema = yup.object().shape({
  is_open_item: yup.boolean().required("Order should be either standard or open"),
  item_id: yup.string().when("is_open_item", {
    is: false, then: (schema) => schema.required("Item is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  open_item_name: yup.string().when("is_open_item", {
    is: true, then: (schema) => schema.required("Item name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  piece: yup.number().when("is_open_item", {
    is: true, then: (schema) => schema.required("Total piece field is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  cleaning_method: yup.string().required("Cleaning method is required"),
  handling_option: yup.string().required("Handling method is required"),
  quantity: yup.number().required("Quantity is required"),
  price_per_unit: yup.number().required("Price per unit is required"),
});

export const AddItemFromCategory2: React.FC<AddItemFromCategoryProps> = ({
                                                                           dialogLabel,
                                                                           orderId,
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
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // errors,
  const {fetchData: data, loading, refetch} = useFetch<any>(`${category}`);
  // errors: postError
  const {postData: addOrderItem, loading: addLoading,} = usePost(`${orderItem}/orders/${orderId}`)
  // errors: updateError
  const {updateData: update, loading: updateLoading,} = useUpdate(`${orderItem}/${orderItemId}`);

  const initialValues = {
    is_open_item: false,
    item_id: "",
    open_item_name: "",
    piece: 1,
    quantity: null,
    cleaning_method: null,
    handling_option: null,
    price_per_unit: null,
  }


  const {
    handleSubmit,
    register,
    formState: {errors},
    reset, watch, setValue
  } = useForm({
    resolver: yupResolver(schema as yup.ObjectSchema<ItemPayload>),
    defaultValues: initialValues
  });

  const {
    // errors: itemError,
    fetchData: fetchItemData, loading: itemLoading
  } = useFetch<any>(`${item}?category_id=${selectedCategory}`);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const itemId = e.target.value;
    reset({
      ...watch(), item_id: itemId
    })
    setSelectedItemId(itemId);
  };

  const selectedItem = fetchItemData?.result?.find((item: { id: string }) => item.id === selectedItemId);

  useEffect(() => {
    if (updating) {
      reset({
        is_open_item: updateValue_is_open_item,
        item_id: orderItemId,
        open_item_name: name,
        piece: piece ? +piece : watch('piece'),
        quantity: updateInitialQuantity ? updateInitialQuantity : watch('quantity'),
        cleaning_method: cleaning_method ? cleaning_method : watch('cleaning_method'),
        handling_option: handling_option ? handling_option : watch('handling_option'),
        price_per_unit: updateInitialPrice_per_unit ? +updateInitialPrice_per_unit : watch('price_per_unit')
      })

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

  const handleAddOrderItem: SubmitHandler<ItemPayload> = async (data) => {
    if (!updating) {
      if (watch('is_open_item')) { //open item post data
        const response = await addOrderItem(data);
        if (response.success) {
          handleOpen();
          refetchItemList();
        }
      } else {
        const response = await addOrderItem(data);
        console.log("response", response);
        if (response.success) {
          handleOpen();
          refetchItemList();
        }
      }
    } else {
      if (watch('is_open_item')) {
        const response = await update(data)
        if (response.success) {
          handleOpen();
          refetchItemList();
        }
      } else {
        const response = await update({price_per_unit: +watch('price_per_unit'), quantity: +watch('quantity')})
        if (response.success) {
          handleOpen();
          refetchItemList();
        }
      }
    }
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
    <Dialog size="md" open={open} handler={handleOpen} className="p-4">
      <DialogHeader className="relative m-0 block">
        <div className="grid grid-cols-2">
          <Typography variant="h4" color="blue-gray">
            {watch("is_open_item") ? "Open Order" : "Standard Order"}
          </Typography>
          {!updating &&
            <label>
              <Switch crossOrigin={`crossOrigin`} {...register("is_open_item")}/>
              &nbsp;Is Order Open
              {errors?.is_open_item && <p className="text-red-500 text-xs">{errors.is_open_item.message}</p>}
            </label>
          }
        </div>

      </DialogHeader>

      <DialogBody className="space-y-2 pb-6 min-h-full max-h-96 sm:max-h-auto overflow-y-scroll">
        <div className="grid sm:grid-cols-2 gap-2">
          {(!updating && !watch("is_open_item")) && <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Select Category to Order
            </Typography>
            {loading ? (<p className="text-gray-600">Loading categories...</p>)
              // : errors ? (
              // <p className="text-red-500 text-xs">Error: {errors.message}</p>)
              : data?.result?.length > 0 ? (
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
          {(!updating && !watch("is_open_item") && selectedCategory) && <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Add item to Order
            </Typography>
            {itemLoading ? (
                <p className="text-gray-600">Loading items...</p>
              )
              //   : itemError ? (
              //   <p className="text-red-500 text-xs">Error: {itemError.message}</p>
              // )
              : fetchItemData?.result?.length > 0 ? (
                <select
                  className="p-2 rounded w-full border border-gray-400"
                  value={selectedItemId || ""}
                  onChange={handleItemChange}
                >
                  <option value="" disabled>
                    Choose an item
                  </option>
                  {fetchItemData.result.map((item: { id: string; name: string }) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-gray-600">No item available.</p>
              )}
          </div>
          }
          {/*{(postError?.item_id || updateError?.item_id) &&*/}
          {/*  <p className="text-red-500 text-xs">{postError?.item_id || updateError?.item_id}</p>}*/}
        </div>

        {((selectedCategory && selectedItemId) || updating || watch("is_open_item")) && <div>
          {
            <OrderItemForm2
              selectedItem={selectedItem}
              updating={updating}
              Error={Error}
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          }
        </div>}

      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"

          disabled={loading || addLoading || (!selectedItem && !updating && !watch("is_open_item"))}
          onClick={handleSubmit(handleAddOrderItem)}
        >
          {addLoading ? "Adding..." : "Add"}
        </Button>

      </DialogFooter>
    </Dialog>
  </>);
};
