import React, {useEffect} from "react";
import {Input, Typography} from "@material-tailwind/react";

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
  updateValue_is_open_item?: boolean;
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
                                          orderId,
                                          formData,
                                          setFormData,
                                          updating,
                                          updateInitialQuantity,
                                          updateInitialPrice_per_unit,
                                          updateValue_is_open_item
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

  // useEffect(() => {
  //   if (updating && updateInitialQuantity && updateInitialPrice_per_unit) {
  //     setFormData({
  //       is_open_item: formData.is_open_item,
  //       item_id: formData.item_id,
  //       open_item_name: formData.open_item_name,
  //       piece: formData.piece,
  //       quantity: +updateInitialQuantity,
  //       cleaning_method: formData.cleaning_method,
  //       handling_option: formData.handling_option,
  //       price_per_unit: +updateInitialPrice_per_unit,
  //     });
  //   }
  //   if (updating && updateValue_is_open_item) {
  //     setFormData({
  //       ...formData,
  //       is_open_item: updateValue_is_open_item,
  //       open_item_name: formData.open_item_name,
  //       piece: formData.piece,
  //       cleaning_method: formData.cleaning_method,
  //       handling_option: formData.handling_option,
  //     });
  //   }
  // }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ItemPayload) => {
    const value = e.target.value === "" ? null : parseFloat(e.target.value);
    setFormData((prev) => ({...prev, [key]: value}));
  };

  return (
    <div>
      {(!updating || formData.is_open_item) && <>
        <Typography variant="small" color="blue-gray" className="mt-4 text-left font-medium">
          Selected Item Details:
        </Typography>
        <br/>
        <Input crossOrigin="crossOrigin" label="Name" readOnly={!formData.is_open_item}
               value={formData.is_open_item ? formData.open_item_name : selectedItem?.name}
               onChange={(e) => setFormData({...formData, open_item_name: e.target.value})}/>
        <br/>

        {!formData.is_open_item &&
          <Input crossOrigin="crossOrigin" label="Description" value={selectedItem?.description || ""}/>
        }
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
        </>}
    </div>
  );
};

export default OrderItemForm;
