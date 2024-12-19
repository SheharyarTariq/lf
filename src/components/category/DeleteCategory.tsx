import React, { memo } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import useDeleteCategory from "@/lib/api/Dashboard/hooks/category/useDeleteCategory";

type Props = {
  name: string;
  id: string | number;
  refetch: Function;
};

export const DeleteCategory: React.FC<Props> = memo(({ name, id, refetch }) => {
  const [open, setOpen] = React.useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const url = `${BASE_URL}/categories/${id}`;
  const handleOpen = () => setOpen(!open);
  const { deleteArea, loading } = useDeleteCategory("Category", url);

  const handleDelete = async () => {
    await deleteArea();
    refetch();
    handleOpen();
    ``;
  };
  return (
    <>
      <Button variant="text" color="blue-gray" size="sm" onClick={handleOpen}>
        Delete
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          Would you like to permanently delete this Category?
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
