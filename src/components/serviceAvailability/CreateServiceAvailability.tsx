import React, {memo, useState} from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import useCreateServiceAvailability from "@/lib/api/Dashboard/hooks/serviceAvailability/useCreateServiceAvailability";

type Props = {
    areaId: string | null;
    refetch: () => void;
};

export const CreateServiceAvailability: React.FC<Props> = memo(
    ({areaId, refetch}) => {
        const [open, setOpen] = useState(false);
        const [inputValue, setInputValue] = useState<string>("");
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const urlAddArea = `${BASE_URL}/service-availabilities`;
        const {
            addArea,
            loading: addLoading,
            error: addError,
        } = useCreateServiceAvailability(urlAddArea);
        const isLoading = addLoading;

        const handleOpen = () => setOpen(!open);

        const handleSave = async () => {
            const dataValue = {
                postcode: inputValue,
                area_id: areaId,
            };

            const newArea = await addArea(dataValue);

            if (newArea) {
                toast.success(`postcode added successfully!`, {
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
                    className="text-black text-center bg-gray-100 ml-3"
                >
                    <i className=" fa-solid fa-plus text-center"></i>
                </Button>
                <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                    <DialogHeader className="relative m-0 block">
                        <Typography variant="h4" color="blue-gray">
                            Post Code
                        </Typography>
                        <Typography className="mt-1 font-normal text-gray-600">
                            Press Save After Adding Postcode.
                        </Typography>
                    </DialogHeader>
                    <DialogBody className="space-y-4 pb-6">
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Post code
                            </Typography>
                            <input
                                // crossOrigin={`crossorigin`}
                                // color="gray"
                                // size="lg"
                                className='p-2 rounded w-full border border-gray-400'

                                placeholder="e.g. KT2R 2ER"
                                name="name"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            {addError && <p className="text-red-500 text-xs">{addError}</p>}
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
