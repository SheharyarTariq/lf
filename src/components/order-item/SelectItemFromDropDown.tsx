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
}

interface ItemPayload {
  is_open_item: boolean;
  item_id: string;
  quantity: number | null;
  cleaning_method: string | null;
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

const SelectItemFromDropDown: React.FC<Props> = ({categoryId, orderId, formData, setFormData}) => {
  const url = `${config.BASE_URL}/items?category_id=${categoryId}`;
  const {data, error, loading} = useFetch<any>(url);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const itemId = e.target.value;
    setSelectedItemId(itemId);
  };

  const selectedItem = data?.result?.find((item: { id: string }) => item.id === selectedItemId);
  
  return (
    <>
      <div>
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
      </div>
      {selectedItem && (
        <OrderItemForm
          selectedItem={selectedItem}
          orderId={orderId}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
};

export default SelectItemFromDropDown;
