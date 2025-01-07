import React, {useState} from 'react';
import {Input, Switch, Typography} from "@material-tailwind/react";

interface Props {
    selectedItem: {
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
}

interface ItemPayload {
    is_open_item: false;
    item_id: string;
    quantity: number | null;
    cleaning_method: "wash" | "dry_clean" | null;
    handling_option: "fold" | "hang" | null;
    price_per_unit: number | null;
}

const OrderItemForm: React.FC<Props> = ({selectedItem}) => {

    const [formData, setFormData] = useState<ItemPayload>({
        is_open_item: false,
        item_id: selectedItem.id,
        quantity: null,
        cleaning_method: selectedItem.defaults.cleaning_method,
        handling_option: selectedItem.defaults.handling_option,
        price_per_unit: selectedItem.defaults.cleaning_method === "wash" ? Number(selectedItem.price.wash) : Number(selectedItem.price.dry_clean),
    })
    return (
        <div>
            <Typography
                variant="small"
                color="blue-gray"
                className="mt-4 text-left font-medium"
            >
                Selected Item Details:
            </Typography>
            <br/>
            <div className="grid grid-cols-2 gap-2 ">

                <Input
                    crossOrigin="crossOrigin"
                    label="Name"
                    value={selectedItem.name || ""}
                    readOnly
                />
                <Input
                    crossOrigin="crossOrigin"
                    label="Description"
                    value={selectedItem.description || "No Description"}
                    readOnly
                />
            </div>
            <br/>
            <div className="grid grid-cols-2 gap-2 ">
                <Input
                    crossOrigin="crossOrigin"
                    label="Cleaning Method"
                    value={selectedItem.defaults.cleaning_method || "No Default Cleaning Method"}
                    readOnly
                />
                <Input
                    crossOrigin="crossOrigin"
                    label="Handling Option"
                    value={selectedItem.defaults.handling_option || "No Default Handling Option"}
                    readOnly
                />
            </div>
            <br/>
            <Input
                crossOrigin="crossOrigin"
                type="number"
                label="Quantity"
                required
                value={formData.quantity || ""}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        quantity: e.target.value === "" ? null : Number(e.target.value),
                    })
                }
            /><br/>
            <Input
                crossOrigin="crossOrigin"
                type="number"
                label="Price per piece"
                required
                value={formData.price_per_unit || ""}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        price_per_unit: e.target.value === "" ? null : Number(e.target.value),
                    })
                }
            />
            <br/>
            <label>
                <Switch
                    disabled
                    crossOrigin={`crossOrigin`}
                    checked={formData.is_open_item}
                />
                &nbsp;Is Order Open
            </label>
        </div>
    );
}

export default OrderItemForm;