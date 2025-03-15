import React, {memo, useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography,} from "@material-tailwind/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import usePost from "@/lib/api/Dashboard/hooks/usePost";
import {areaSchema} from "@/components/area/constants";
import {ErrorToast, SuccessToast} from "../../lib/common/CommonToaster";
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";
import {CreateAreaProps} from "@/components/area/types";
import {area} from "@/api";
import * as yup from "yup";
import Input from "@/lib/common/Input"

export const CreateArea: React.FC<CreateAreaProps> = memo(({dailogLabel, name, id, refetch}) => {
    const [open, setOpen] = useState(false);
    const {postData, loading: addLoading, errors: postError} = usePost(`${area}`);
    const {updateData, loading: updateLoading, errors: updateError} = useUpdate(`${area}/${id}`);
    const isLoading = addLoading || updateLoading;

    const {
      register,
      handleSubmit,
      formState: {errors},
      reset,
    } = useForm<CreateAreaProps>({
      resolver: yupResolver(areaSchema as yup.ObjectSchema<CreateAreaProps>),
      defaultValues: {name: ""},
    });

    useEffect(() => {
      if (name) {
        reset({name});
      }
    }, [name, reset]);

    const handleOpen = () => {
      setOpen((prev) => !prev);
      if (!name) reset({name: ""});
    };


    const onSubmit: SubmitHandler<CreateAreaProps> = async (data) => {

      const response = name ? await updateData(data) : await postData(data);
      if (response?.success) {
        SuccessToast(response.message || "Area added successfully")
        refetch();
        handleOpen();
      } else if (response?.success === false) {
        ErrorToast(response?.message || "Failed to add area")

      } else if (postError?.message || updateError?.message) {
        ErrorToast(postError?.message || updateError?.message || "An unexpected error occurred.")
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
          <DialogBody className="space-y-2">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium">
                Name
              </Typography>
              <Input placeholder="e.g. Manchester" register={register} name="name" className="w-full"/>
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              {postError?.name && <p className="text-red-500 text-xs">{postError?.name}</p>}
              {updateError?.name && <p className="text-red-500 text-xs">{updateError?.name}</p>}
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
