import React, {memo, useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography,} from "@material-tailwind/react";
import toast from "react-hot-toast";
import useCreateArea from "@/lib/api/Dashboard/hooks/area/useCreateArea";
import useUpdateArea from "@/lib/api/Dashboard/hooks/area/useUpdateArea";
import {config} from "@/config";
import {CreateAreaProps} from "@/pages/dashboard/types";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export const CreateArea: React.FC<CreateAreaProps> = memo(
    ({dailogLabel, name, id, refetch}) => {
        const [open, setOpen] = useState(false);
        const {addArea, loading: addLoading} = useCreateArea(`${config.BASE_URL}/areas`);
        const {
            updateArea,
            loading: updateLoading,
        } = useUpdateArea(`${config.BASE_URL}/areas/${id}`);
        const isLoading = addLoading || updateLoading;

        const schema = yup.object().shape({
            name: yup
                .string()
                .required("Area name is required")
                .trim()
        });

        const {
            control,
            handleSubmit,
            formState: {errors},
            reset,
        } = useForm({
            resolver: yupResolver(schema),
            defaultValues: {name: ""},
        });

        useEffect(() => {
            if (name) {
                reset({name});
            }
        }, [name, reset]);

        const handleOpen = () => {
            setOpen(!open);
            if (!open && !name) {
                reset({name: ""});
            }
        };

        const onSubmit = async (data: { name: string }) => {
            const createOrUpdateArea = name
                ? await updateArea(data)
                : await addArea(data);

            if (createOrUpdateArea) {
                toast.success(`Area ${name ? "updated" : "added"} successfully!`, {
                    position: "bottom-center",
                });
                refetch();
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
                    {dailogLabel ? dailogLabel : <i className="fa-solid fa-plus"></i>}
                </Button>
                <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                    <DialogHeader className="relative m-0 block">
                        <Typography variant="h4" color="blue-gray">
                            Area
                        </Typography>
                    </DialogHeader>
                    <DialogBody className="space-y-4 pb-6">
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium">
                                Name
                            </Typography>
                            <Controller
                                name="name"
                                control={control}
                                render={({field}) => (
                                    <input
                                        {...field}
                                        className="p-2 rounded w-full border border-gray-400"
                                        placeholder="e.g. Manchester"
                                    />
                                )}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            className="ml-auto"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
        );
    }
);
