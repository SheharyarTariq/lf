import React, {useEffect} from "react";
import {Input, Typography} from "@material-tailwind/react";

interface Props {
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

  updating?: boolean;

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

const OrderItemForm: React.FC<Props> = ({
                                          selectedItem,
                                          formData,
                                          setFormData,
                                          updating,
                                          Error,
                                        }) => {

  useEffect(() => {
    if (!updating) {
      setFormData({
        is_open_item: formData.is_open_item,
        item_id: selectedItem?.id || "",
        quantity: 1,
        open_item_name: formData.open_item_name,
        piece: formData.piece,
        cleaning_method: selectedItem?.default_cleaning_method || null,
        handling_option: selectedItem?.default_handling_option || null,
        price_per_unit:
          selectedItem?.default_cleaning_method === "wash"
            ? parseFloat(selectedItem?.price.wash || "0")
            : parseFloat(selectedItem?.price.dry_clean || "0"),
      });
    }
  }, [selectedItem]);
  console.log(formData.is_open_item)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ItemPayload) => {
    const value = e.target.value === "" ? null : parseFloat(e.target.value);
    setFormData((prev) => ({...prev, [key]: value}));
  };

  return (
    <div>
      {(!updating || formData.is_open_item) &&
        <>
          <Typography variant="small" color="blue-gray" className="mt-4 text-left font-medium">
            Selected Item Details:
          </Typography>
          <br/>
          <Input crossOrigin="crossOrigin" label="Name" readOnly={!formData.is_open_item}
                 value={formData.is_open_item ? formData.open_item_name : selectedItem?.name}
                 onChange={(e) => setFormData({...formData, open_item_name: e.target.value})}/>
          {Error?.open_item_name && <p className="text-red-500 text-xs">{Error?.open_item_name}</p>}

          <br/>

          {!formData.is_open_item &&
            <Input crossOrigin="crossOrigin" label="Description" value={selectedItem?.description || ""}/>
          }


          <br/>
          <div className="grid grid-cols-2 gap-2 ">
            <>
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
              {Error?.cleaning_method && <p className="text-red-500 text-xs">{Error?.cleaning_method}</p>}
            </>
            <>
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
              {Error?.handling_option && <p className="text-red-500 text-xs">{Error?.handling_option}</p>}
            </>
          </div>

          <br/>
        </>
      }
      <Input
        crossOrigin="crossOrigin"
        type="number"
        label="Quantity"
        required
        value={formData.quantity !== null ? formData.quantity : ""}
        onChange={(e) => handleInputChange(e, "quantity")}
      />
      {Error?.quantity && <p className="text-red-500 text-xs">{Error?.quantity}</p>}

      <br/>
      <Input
        crossOrigin="crossOrigin"
        type="number"
        label="Price per piece"
        required
        value={formData.price_per_unit !== null ? formData.price_per_unit : ""}
        onChange={(e) => handleInputChange(e, "price_per_unit")}
      />
      {Error?.price_per_unit && <p className="text-red-500 text-xs">{Error?.price_per_unit}</p>}

      <br/>
      {formData.is_open_item &&
        <>
          <Input
            crossOrigin="crossOrigin"
            type="number"
            label="Piece"
            required
            value={formData.piece}
            onChange={(e) => handleInputChange(e, "piece")}
          />
          {Error?.piece && <p className="text-red-500 text-xs">{Error?.piece}</p>}


        </>}
    </div>
  );
};

export default OrderItemForm;
