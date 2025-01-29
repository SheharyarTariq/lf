import React, {useState} from "react";
import {config} from "@/config";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import {Typography} from "@material-tailwind/react";
import OrderItemForm from "@/components/order-item/OrderItemForm";

interface Props {
  categoryId: string | null;
  orderId: string;
  setFormData: React.Dispatch<React.SetStateAction<ItemPayload>>;
  formData: ItemPayload;
  updateInitialQuantity?: number | null;
  updateInitialPrice_per_unit?: string | null;
  updating?: boolean;
  updateValue_is_open_item?: boolean;
  Error?: {
    [key: string]: any
  } | null

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

interface Item {
  id: string;
  name: string;
  description: string | null;
  piece: number;
  price: {
    dry_clean: string | null;
    wash: string | null;
  };
  defaults: {
    cleaning_method: "wash" | "dry_clean";
    handling_option: "fold" | "hang";
  };
}

const SelectItemFromDropDown: React.FC<Props> = ({
                                                   categoryId,
                                                   orderId,
                                                   formData,
                                                   setFormData,
                                                   updateInitialQuantity,
                                                   updateInitialPrice_per_unit,
                                                   updating, updateValue_is_open_item,
                                                   Error
                                                 }) => {
  const url = `${config.BASE_URL}/items?category_id=${categoryId}`;
  const {data, error, loading} = useFetch<any>(url);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const itemId = e.target.value;
    setFormData({...formData, item_id: e.target.value});
    setSelectedItemId(itemId);
  };

  const selectedItem = data?.result?.find((item: { id: string }) => item.id === selectedItemId);

  return (
    <>
      {(!updating && !formData.is_open_item) && <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-2 text-left font-medium"
        >
          Add item to Order
        </Typography>
        {loading ? (
          <p className="text-gray-600">Loading items...</p>
        ) : error ? (
          <p className="text-red-500 text-xs">Error: {error}</p>
        ) : data?.result?.length > 0 ? (
          <select
            className="p-2 rounded w-full border border-gray-400"
            value={selectedItemId || ""}
            onChange={handleItemChange}
          >
            <option value="" disabled>
              Choose an item
            </option>
            {data.result.map((item: { id: string; name: string }) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-gray-600">No item available.</p>
        )}
      </div>}
      {Error?.item_id && <p className="text-red-500 text-xs">{Error?.item_id}</p>}

      {(selectedItem || updating || formData.is_open_item) && (
        <OrderItemForm
          selectedItem={selectedItem}
          formData={formData}
          setFormData={setFormData}
          updating={updating}
          Error={Error}
        />
      )}
    </>
  );
};

export default SelectItemFromDropDown;
