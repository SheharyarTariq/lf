import React from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import useDelete from "@/lib/api/Dashboard/hooks/useDelete";
import CommonToaster, {ErrorToast, SuccessToast} from "@/lib/common/CommonToaster";

type Props = {
  btnLabel: string
  refetch: Function
  url: string
  title: string
  description: string
  toastMessage: string
}

export const DeleteModal: React.FC<Props> = ({btnLabel, url, refetch, title, description, toastMessage}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const {deleteData, loading, errors: deleteError} = useDelete(url);
  const handleDelete = async () => {
    const response = await deleteData();
    if (response?.success) {
      refetch();
      handleOpen();
      SuccessToast(response.message || toastMessage);
    } else if (response?.success === false) {
      ErrorToast("Failed to Delete");
    } else if (deleteError?.message) {
      ErrorToast(deleteError?.message);
    }
  };

  return (
    <>
      <Button
        variant="text" color="blue-gray" size="sm"
        onClick={handleOpen}>
        {btnLabel}
      </Button>
      <Dialog size={`sm`} open={open} handler={handleOpen}>
        <DialogHeader>
          {title}
        </DialogHeader>
        <DialogBody>
          {description}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={handleDelete} disabled={loading}>
            <span>{loading ? "Deleting..." : "Confirm"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DeleteModal;