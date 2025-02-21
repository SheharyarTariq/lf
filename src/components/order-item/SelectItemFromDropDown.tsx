import React from "react";

interface Props {
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
                                                   formData,
                                                   setFormData,
                                                   updating,
                                                   Error,
                                                   selectedItem
                                                 }) => {


  return (
    <div>
      {(selectedItem || updating || formData.is_open_item) && (
        <OrderItemForm
          selectedItem={selectedItem}
          formData={formData}
          setFormData={setFormData}
          updating={updating}
          Error={Error}
        />
      )}
    </div>
  );
};

export default SelectItemFromDropDown;
