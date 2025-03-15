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
import usePost from "@/lib/api/Dashboard/hooks/usePost";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreatePostcodeProps} from "@/components/postcode/types";
import {postcode} from "@/api";
import Input from "@/lib/common/Input";
import {schema} from "@/components/postcode/constants";


export const CreatePostcode: React.FC<CreatePostcodeProps> = memo(
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

    const {postData: addArea, loading: addLoading, errors: addError} = usePost(`${postcode}`);
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
          <DialogBody className="space-y-2">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Post code
              </Typography>
              <Input placeholder="e.g. KT2R 2ER" register={register} name="postcode" className="w-full"/>
              {errors.postcode && (
                <p className="text-red-500 text-xs">{errors.postcode.message}</p>
              )}
              {addError && <p className="text-red-500 text-xs">{addError.message}</p>}
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
