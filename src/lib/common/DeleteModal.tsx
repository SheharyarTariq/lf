import React from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import useDeleteArea from "@/lib/api/Dashboard/hooks/area/useDeleteArea";

type Props = {
    btnLabel: string
    refetch: Function
    url: string
    title: string
    description: string
}


export const DeleteModal: React.FC<Props> = ({btnLabel, url, refetch, title, description}) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const {deleteArea, loading} = useDeleteArea("Area", url);

    const handleDelete = async () => {
        await deleteArea();

        refetch();
        handleOpen();
    };
    return (
        <>
            <Button variant="text" color="blue-gray" size="sm" onClick={handleOpen}>
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