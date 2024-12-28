import React, {memo, useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography,} from "@material-tailwind/react";
import toast from "react-hot-toast";
import useCreateArea from "@/lib/api/Dashboard/hooks/area/useCreateArea";
import useUpdateArea from "@/lib/api/Dashboard/hooks/area/useUpdateArea";

type Props = {
    name: string | null;
    id: string | null;
    refetch: () => void;
    dailogLabel: string | null;
};

export const CreateArea: React.FC<Props> = memo(
    ({dailogLabel, name, id, refetch}) => {
        const [open, setOpen] = useState(false);
        const [inputValue, setInputValue] = useState<string>("");
        const BASE_URL = import.meta.env.VITE_BASE_URL;

        const urlAddArea = `${BASE_URL}/areas`;
        const urlUpdateArea = `${BASE_URL}/areas/${id}`;
        const {
            addArea,
            loading: addLoading,
            error: addError,
        } = useCreateArea(urlAddArea);
        const {
            updateArea,
            loading: updateLoading,
            error: updateError,
        } = useUpdateArea(urlUpdateArea);
        const isLoading = addLoading || updateLoading;

        useEffect(() => {
            if (name) setInputValue(name);
        }, [name]);

        const handleOpen = () => setOpen(!open);

        const handleSave = async () => {
            const dataValue = {
                name: inputValue,
            };

            const newArea = name
                ? await updateArea(dataValue)
                : await addArea(dataValue);

            if (newArea) {
                toast.success(`Area ${name ? "updated" : "added"} successfully!`, {
                    position: "bottom-center",
                });
                refetch();
                setInputValue("");
                handleOpen();
            }
        };

        return (
            <>
                <Button
                    variant="text"
                    color="blue-gray"
                    size="sm"
                    onClick={handleOpen}
                    className={`${!dailogLabel && "text-black hover:bg-gray-300 text-center bg-gray-100"}`}
                >
                    {dailogLabel ? dailogLabel : <i className=" fa-solid fa-plus"></i>}
                </Button>
                <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                    <DialogHeader className="relative m-0 block">
                        <Typography variant="h4" color="blue-gray">
                            Area
                        </Typography>
                        <Typography>
                            {dailogLabel ? (
                                <span className="mt-1 font-normal text-gray-600">
                  {" "}
                                    Press Save After {dailogLabel}ing Area.
                </span>
                            ) : (
                                <span className="mt-1 font-normal text-gray-600">
                  Press Save After Adding Area.
                </span>
                            )}
                        </Typography>
                    </DialogHeader>
                    <DialogBody className="space-y-4 pb-6">
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Area Name
                            </Typography>
                            <input
                                // crossOrigin={`crossorigin`}
                                // color="gray"
                                // size="lg"
                                className='p-2 rounded w-full border border-gray-400'
                                placeholder="e.g. Manchester"
                                name="name"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            {addError && <p className="text-red-500 text-xs">{addError}</p>}
                            {updateError && (
                                <p className="text-red-500 text-xs">{updateError}</p>
                            )}
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            className="ml-auto"
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
        );
    },
);
