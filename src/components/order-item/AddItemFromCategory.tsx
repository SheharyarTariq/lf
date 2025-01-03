import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Typography,
    Input,
    Textarea,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import {token} from "@/lib/token/Token";

interface AddItemFromCategoryProps {
    dialogLabel?: string;
    orderId: string;
    onSuccess?: () => void;
}

export const AddItemFromCategory: React.FC<AddItemFromCategoryProps> = ({
                                                                            dialogLabel,
                                                                            orderId,
                                                                            onSuccess,
                                                                        }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const categoriesUrl = `${BASE_URL}/categories`;
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const {data, error, loading, refetch} = useFetch<any>(categoriesUrl);
    const [items, setItems] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [itemsLoading, setItemsLoading] = useState(false);
    const [itemsError, setItemsError] = useState<string | null>(null);

    const handleOpen = () => {
        refetch();
        setOpen((prev) => !prev);
    };

    const handleGetItemsByCategory = async (categoryId: string) => {
        setItemsLoading(true);
        setItemsError(null);

        try {
            const response = await fetch(`${BASE_URL}/items?category_id=${categoryId}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            setItems(result.result || []);
        } catch (err) {
            setItemsError((err as Error).message);
        } finally {
            setItemsLoading(false);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        handleGetItemsByCategory(categoryId);
    };

    const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedItemId = e.target.value;
        const item = items.find((item: { id: string }) => item.id === selectedItemId);
        setSelectedItem({...item, quantity: null});
    };

    const handleSave = async () => {
        if (!selectedCategory || !selectedItem) {
            toast.error("Please select a category and item.");
            return;
        }

        const payload: any = {
            item_id: selectedItem.id,
            quantity: selectedItem.quantity,
            is_open_item: false,
            handling_option: "hang",
        };

        if (selectedItem.washing_price !== null) {
            payload.cleaning_method = "dry_cleaning";
            payload.price_per_unit = +selectedItem.washing_price;
        } else {
            payload.cleaning_method = "dry_cleaning";
            payload.price_per_unit = 20;
        }

        try {
            const response = await fetch(`${BASE_URL}/order-items/orders/${orderId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Failed to save item. Error: ${response.statusText}`);
            }

            toast.success("Item added to order successfully!");
            setOpen(false);
            onSuccess?.();
        } catch (error) {
            toast.error(`Failed to add item: ${(error as Error).message}`);
        }
    };


    return (
        <>
            <Button
                variant="text"
                color="blue-gray"
                size="sm"
                onClick={handleOpen}
                className={`${
                    !dialogLabel && "text-black hover:bg-gray-300 text-center bg-gray-100"
                }`}
            >
                {dialogLabel ? dialogLabel : <i className="fa-solid fa-plus"></i>}
            </Button>
            <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h4" color="blue-gray">
                        {dialogLabel || "Select"} Category
                    </Typography>
                    <Typography>
                        <span className="mt-1 font-normal text-gray-600">
                            Press Save After {dialogLabel || "Selecting"} a Category.
                        </span>
                    </Typography>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">

                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 text-left font-medium"
                        >
                            Select Category
                        </Typography>
                        {loading ? (
                            <p className="text-gray-600">Loading categories...</p>
                        ) : error ? (
                            <p className="text-red-500 text-xs">Error: {error}</p>
                        ) : data?.result?.length > 0 ? (
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
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className="text-gray-600">No categories available.</p>
                        )}
                    </div>

                    {selectedCategory && !itemsLoading && !itemsError && items.length > 0 && (
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Select an Item
                            </Typography>
                            <select
                                className="p-2 rounded w-full border border-gray-400"
                                onChange={handleItemSelect}
                            >
                                <option value="" disabled>
                                    Choose an item
                                </option>
                                {items.map((item: { id: string; name: string }) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {selectedItem && (
                        <div className="mt-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Edit Item Details
                            </Typography>
                            <form className="space-y-4">
                                <Input
                                    crossOrigin="crossOrigin"
                                    label="Name"
                                    value={selectedItem.name || ""}
                                    onChange={(e) =>
                                        setSelectedItem({...selectedItem, name: e.target.value})
                                    }
                                />
                                <Textarea
                                    label="Description"
                                    value={selectedItem.description || ""}
                                    onChange={(e) =>
                                        setSelectedItem({
                                            ...selectedItem,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    crossOrigin="crossOrigin"
                                    label="Washing Price"
                                    value={selectedItem.washing_price || ""}
                                    onChange={(e) =>
                                        setSelectedItem({
                                            ...selectedItem,
                                            washing_price: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    crossOrigin="crossOrigin"
                                    label="Dry Cleaning Price"
                                    value={selectedItem.dry_cleaning_price || ""}
                                    onChange={(e) =>
                                        setSelectedItem({
                                            ...selectedItem,
                                            dry_cleaning_price: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    crossOrigin="crossOrigin"
                                    label="Quantity"
                                    type="number"
                                    value={selectedItem.quantity}
                                    onChange={(e) =>
                                        setSelectedItem({
                                            ...selectedItem,
                                            quantity: parseInt(e.target.value, 10),
                                        })
                                    }
                                />
                            </form>
                        </div>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button
                        className="ml-auto"
                        onClick={handleSave}
                        disabled={loading || !selectedCategory || !selectedItem}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default AddItemFromCategory;
