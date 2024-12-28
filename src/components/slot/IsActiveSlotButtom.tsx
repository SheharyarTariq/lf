import React from 'react';
import useUpdateServiceAvailability from "@/lib/api/Dashboard/hooks/slot/useUpdateSlot";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";


export const IsActiveSlotButtom = ({slot, isActive, refetch, id}: {
    slot: string
    isActive: boolean
    id: string
    refetch: () => void;

}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const urlUpdate = `${BASE_URL}/slot-availabilities/${id}/change-state`;
    const {updateArea, loading} = useUpdateServiceAvailability(urlUpdate);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    async function handleSlotActivation(isActive: boolean) {
        const dataValue = {is_active: !isActive};
        await updateArea(dataValue)
        refetch();
        handleOpen();
    }

    return (
        <>
            <Button variant="text" color='blue-gray' size="sm"
                    className={isActive ? ' bg-blue-gray-50' : 'border border-blue-gray-50'}
                    onClick={handleOpen}>
                {slot}
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>
                    {isActive ? 'Deactivate' : 'Activate'} Confirmation
                </DialogHeader>
                <DialogBody>Are you sure you want to {isActive ? 'Deactivate' : 'Activate'} this slot
                    ({slot})?</DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" onClick={() => handleSlotActivation(isActive)} disabled={loading}>
                        <span>{loading ? (isActive ? "Deactivating..." : 'Activating') : "Confirm"}</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default IsActiveSlotButtom;