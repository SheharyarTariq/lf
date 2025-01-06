import React, {useState} from 'react';
import {config} from "@/config";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import {Typography} from "@material-tailwind/react";

interface Props {
    categoryId: string | null
}

const SelectItemFromDropDown: React.FC<Props> = ({categoryId}) => {
    const url = `${config.BASE_URL}/items?category_id=${categoryId}`
    const {data, error, loading, refetch} = useFetch<any>(url);
    const [selectedItems, setSelectedItems] = useState<string | null>();

    const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = e.target.value;
        setSelectedItems(categoryId);
    };
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
                {loading ? (<p className="text-gray-600">Loading items...</p>) : error ? (
                    <p className="text-red-500 text-xs">Error: {error}</p>) : data?.result?.length > 0 ? (
                    <select
                        className="p-2 rounded w-full border border-gray-400"
                        value={selectedItems || ""}
                        onChange={handleItemChange}
                    >
                        <option value="" disabled>
                            Choose an item
                        </option>
                        {data.result.map((item: { id: string; name: string }) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>))}
                    </select>) : (<p className="text-gray-600">No item available.</p>)}
            </div>
            {selectedItems && <div>

            </div>}
        </>);
}

export default SelectItemFromDropDown;