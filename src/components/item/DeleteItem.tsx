import React, { memo } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import useDeleteServiceAvailability from "@/lib/api/Dashboard/hooks/serviceAvailability/useDeleteServiceAvailability";

type Props = {
  name: string;
  id: string;
  refetch: Function;
};

export const DeleteItem: React.FC<Props> = memo(({ name, id, refetch }) => {
  const [open, setOpen] = React.useState(false);
  const url = `https://laundry-free-2a18b6e8d093.herokuapp.com/api/items/${id}`;
  const handleOpen = () => setOpen(!open);

  const { deleteArea, loading } = useDeleteServiceAvailability("Item", url);

  const handleDelete = async () => {
    await deleteArea();

    refetch();
    handleOpen();
  };
  return (
    <>
      <Button variant="text" color="blue-gray" size="sm" onClick={handleOpen}>
        Delete
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          Would you like to permanently delete this Item?
        </DialogHeader>
        <DialogBody>
          Once deleted,this ({" "}
          <strong>
            <b>{name}</b>
          </strong>{" "}
          ) will no longer be accessible.
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
});