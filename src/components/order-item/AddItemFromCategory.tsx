import React, {useState, useEffect} from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Typography,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";

interface AddItemFromCategoryProps {
    dialogLabel?: string;
    onSuccess?: () => void;
}

export const AddItemFromCategory: React.FC<AddItemFromCategoryProps> = ({
                                                                            dialogLabel,
                                                                            onSuccess,
                                                                        }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const url = `${BASE_URL}/categories`;

    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const {data, error, loading, refetch} = useFetch<any>(url);

    useEffect(() => {
        if (data?.result?.length === 0) {
            toast.success("No categories found!");
        }
    }, [data]);

    const handleOpen = () => {
        refetch();
        setOpen((prev) => !prev);
    };

    const handleSave = () => {
        if (!selectedCategory) {
            toast.error("Please select a category.");
            return;
        }

        toast.success(`Category with ID ${selectedCategory} selected successfully!`);
        setOpen(false);
        onSuccess?.();
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
            <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
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
                                onChange={(e) => setSelectedCategory(e.target.value)}
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
                </DialogBody>
                <DialogFooter>
                    <Button
                        className="ml-auto"
                        onClick={handleSave}
                        disabled={loading || !selectedCategory}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default AddItemFromCategory;
