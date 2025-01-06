import React, {useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography,} from "@material-tailwind/react";
import toast from "react-hot-toast";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import {token} from "@/lib/token/Token";
import SelectItemFromDropDown from "@/components/order-item/SelectItemFromDropDown";

interface AddItemFromCategoryProps {
    dialogLabel?: string;
    orderId: string;
    onSuccess?: () => void;
}

export const AddItemFromCategory: React.FC<AddItemFromCategoryProps> = ({
                                                                            dialogLabel, orderId, onSuccess,
                                                                        }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const categoriesUrl = `${BASE_URL}/categories`;
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const {data, error, loading, refetch} = useFetch<any>(categoriesUrl);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [itemsLoading, setItemsLoading] = useState(false);
    const [itemsError, setItemsError] = useState<string | null>(null);

    const handleOpen = () => {
        refetch();
        setOpen((prev) => !prev);
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

                <div>
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
                </div>
                {selectedCategory && <div>
                  <SelectItemFromDropDown categoryId={selectedCategory}/>
                </div>}

            </DialogBody>
            <DialogFooter>
                <Button
                    className="ml-auto"
                    disabled={loading || !selectedCategory || !selectedItem}
                >
                    Save
                </Button>
            </DialogFooter>
        </Dialog>
    </>);
};

export default AddItemFromCategory;
