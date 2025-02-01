import React, {memo, useState} from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import useCreateServiceAvailability from "@/lib/api/Dashboard/hooks/serviceAvailability/useCreateServiceAvailability";
import {config} from "@/config";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {CreateServiceAvailabilityProps} from "@/components/serviceAvailability/types";

const schema = yup.object().shape({
  postcode: yup
    .string()
    .required("Postcode is required")
    .matches(
      /^[A-Za-z]{1,2}[0-9][0-9A-Za-z]? ?[0-9][A-Za-z]{2}$/,
      "Invalid postcode format"
    ),
});

export const CreateServiceAvailability: React.FC<CreateServiceAvailabilityProps> = memo(
  ({areaId, refetch}) => {
    const [open, setOpen] = useState(false);

    const {
      register,
      handleSubmit,
      formState: {errors},
      reset,
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {postcode: ""},
    });

    const {addArea, loading: addLoading, error: addError} = useCreateServiceAvailability(
      `${config.BASE_URL}/service-availabilities`
    );
    const isLoading = addLoading;

    const handleOpen = () => setOpen(!open);

    const onSubmit = async (data: { postcode: string }) => {
      const dataValue = {
        postcode: data.postcode,
        area_id: areaId,
      };

      const newArea = await addArea(dataValue);

      if (newArea) {
        toast.success(`Postcode added successfully!`, {
          position: "bottom-center",
        });
        refetch();
        reset();
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
          <i className="fa-solid fa-plus text-center"></i>
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
                className="p-2 rounded w-full border border-gray-400"
                placeholder="e.g. KT2R 2ER"
                {...register("postcode")}
              />
              {errors.postcode && (
                <p className="text-red-500 text-xs">{errors.postcode.message}</p>
              )}
              {addError && <p className="text-red-500 text-xs">{addError}</p>}
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
