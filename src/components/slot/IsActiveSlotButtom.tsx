import React from 'react';
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import {slot} from "@/api";
import {ErrorToast, SuccessToast} from "@/lib/common/CommonToaster";

export const IsActiveSlotButtom = ({slots, isActive, refetch, id}: {
  slots: string
  isActive: boolean
  id: string
  refetch: () => void;
}) => {
  const urlUpdate = `${slot}/${id}/change-state`;
  const {updateData: updateSlot, loading} = useUpdate(urlUpdate);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  async function handleSlotActivation(isActive: boolean) {
    const dataValue = {is_active: !isActive};
    const response = await updateSlot(dataValue);
    if (response?.success) {

      SuccessToast(response.message || response?.result.is_active ? "Time slot activeted successfully" : "Time slot deactiveted successfully");

      refetch();
      handleOpen();
    } else {
      ErrorToast(response.message || "Something went wrong. please try again");
    }
  }

  return (
    <>
      <Button variant="text" color='blue-gray' size="sm"
              className={isActive ? 'bg-blue-gray-50 border border-green-500' : 'border border-red-500'}
              onClick={handleOpen}>
        {slots}
      </Button>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          {isActive ? 'Deactivate' : 'Activate'} Confirmation
        </DialogHeader>
        <DialogBody>Are you sure you want to {isActive ? 'Deactivate' : 'Activate'} this slots
          ({slots})?</DialogBody>
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
            <span>{loading ? (isActive ? "Deactivating..." : 'Activating...') : "Confirm"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default IsActiveSlotButtom;