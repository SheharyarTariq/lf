import React, {memo, useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography,} from "@material-tailwind/react";
import {config} from "@/config";
import {CreateAreaProps} from "@/pages/dashboard/types";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import usePost from "@/lib/api/Dashboard/hooks/usePost";
import {areaSchema} from "@/components/area/constants";
import CommonToaster from "../../lib/common/CommonToaster";
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";

export const CreateArea: React.FC<CreateAreaProps> = memo(({dailogLabel, name, id, refetch}) => {
    const [open, setOpen] = useState(false);
    const {postData, loading: addLoading, errors: postError} = usePost(`${config.BASE_URL}/areas`);
    const {updateData, loading: updateLoading, errors: updateError} = useUpdate(`${config.BASE_URL}/areas/${id}`);
    const isLoading = addLoading || updateLoading;

    const {
      control,
      handleSubmit,
      formState: {errors},
      reset,
    } = useForm({
      resolver: yupResolver(areaSchema),
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
        ? await updateData(data)
        : await postData(data);
      console.log("create/upadate area handler call", createOrUpdateArea)
      if (createOrUpdateArea?.success === true) {
        CommonToaster({toastName: 'successToast', toastMessage: 'Form submitted!'});
        refetch();
        handleOpen();
      } else if (createOrUpdateArea?.success === false) {
        CommonToaster({toastName: 'dangerToast', toastMessage: "Not submitted"});

      } else if (postError?.message || updateError?.message) {
        CommonToaster({toastName: 'dangerToast', toastMessage: postError?.message || updateError?.message});
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
