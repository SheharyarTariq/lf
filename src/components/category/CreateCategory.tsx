import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Switch, Typography,} from "@material-tailwind/react";
import usePost from "@/lib/api/Dashboard/hooks/usePost";
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";
import {CreateCategoryFormData, CreateCategoryFormDataProps, CreateCategoryProps} from "@/components/category/types";
import {handlingOption} from "@/components/constants";
import {category} from "@/api";
import {ErrorToast, SuccessToast} from "@/lib/common/CommonToaster";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "@/lib/common/Input";

export const CreateCategory: React.FC<CreateCategoryProps> = ({
                                                                dailogLabel,
                                                                name,
                                                                description,
                                                                id,
                                                                is_hangable,
                                                                is_foldable,
                                                                default_handling_option,
                                                                refetch
                                                              }) => {
  const [open, setOpen] = useState(false);
  const {postData: addArea, loading: addLoading, errors: addError,} = usePost(`${category}`);
  const {updateData: updateArea, loading: updateLoading, errors: updateError,} = useUpdate(`${category}/${id}`);
  const isLoading = addLoading || updateLoading;
  const initialValue = {
    name: "",
    description: "",
    is_hangable: false,
    is_foldable: false,
    default_handling_option: ""
  }
  const schema = yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    description: yup.string(),
    is_hangable: yup.boolean(),
    is_foldable: yup.boolean(),
    default_handling_option: yup.string()
      .oneOf(["fold", "hang"], "Please select a handling method")
      .required("Handling method is required"),
  })
    .test(
      "at-least-one-true",
      "Either is_hangable or is_foldable must be true",
      (values) => {
        return values.is_hangable || values.is_foldable
      }
    );

  const {register, handleSubmit, formState: {errors}, reset, watch} = useForm({
    resolver: yupResolver(schema as yup.ObjectSchema<CreateCategoryFormDataProps>),
    defaultValues: initialValue
  })

  useEffect(() => {
    reset({
      name: name || "",
      description: description || "",
      is_foldable: is_foldable || false,
      is_hangable: is_hangable || false,
      default_handling_option: default_handling_option || "",
    });
  }, [name, description, is_foldable, is_hangable, default_handling_option]);

  useEffect(() => {
    const Fold = watch("is_foldable");
    const Hang = watch("is_hangable");
    if (Fold && !Hang) {
      reset({...watch(), default_handling_option: "fold"})
    } else if (!Fold && Hang) {
      reset({...watch(), default_handling_option: "hang"})
    } else if (!Fold && !Hang) {
      reset({...watch(), default_handling_option: ""})
    } else if (Fold && Hang) {
      reset({...watch(), default_handling_option: watch("default_handling_option")})
    }
  }, [watch("is_foldable"), watch("is_hangable")]);

  const handleOpen = () => setOpen(!open);

  const onSubmit: SubmitHandler<CreateCategoryFormDataProps> = async (data) => {

    const response = name ? await updateArea(data) : await addArea(data);
    if (response.success) {
      SuccessToast(response.message || `Category ${name ? "updated" : "added"} successfully!`)
      refetch();
      reset(initialValue);
      handleOpen();
    } else if (!response.success) {
      ErrorToast(response.message || `Failed to ${name ? "updated" : "added"} category!`);
    }
  };


  return (
    <>
      <Button
        variant="text"
        color="blue-gray"
        size="sm"
        onClick={handleOpen}
        className={`${!dailogLabel && "text-black text-center bg-gray-100"}`}
      >
        {dailogLabel ? dailogLabel : <i className=" fa-solid fa-plus "></i>}
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Category
          </Typography>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div className="grid grid-cols-2">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Name
              </Typography>
              <Input name="name" register={register} placeholder="e.g. T-Shirt"/>
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

              {addError?.name && (
                <p className="text-red-500 text-xs">{addError.name}</p>
              )}
              {updateError?.name && (
                <p className="text-red-500 text-xs">{updateError.name}</p>
              )}
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Description
              </Typography>
              <Input name="description" register={register} placeholder="Description here..."/>
              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}

            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Handling Options
              </Typography>
              <label>
                <Switch
                  crossOrigin="crossOrigin"
                  {...register("is_foldable")}
                />
                &nbsp;{handlingOption.fold}
              </label>
              <br/>

              <label>
                <Switch
                  crossOrigin="crossOrigin"
                  {...register("is_hangable")}
                />
                &nbsp;{handlingOption.hang}
              </label>
              <br/>
              {(errors as any)?.[""]?.message && (
                <p className="text-red-500 text-xs">{(errors as any)[""].message}</p>
              )}
              {(addError?.is_foldable || addError?.is_hangable) && (
                <p className="text-red-500 text-xs">
                  {addError.is_foldable || addError.is_hangable}
                </p>
              )}
              {(updateError?.is_foldable || updateError?.is_hangable) && (
                <p className="text-red-500 text-xs">
                  {updateError.is_foldable || updateError.is_hangable}
                </p>
              )}
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Default Handling Option
              </Typography>
              <Input name="default_handling_option" register={register} type="radio" value="fold"/>
              <label htmlFor="fold">&nbsp;{handlingOption.fold}</label><br/>
              <Input name="default_handling_option" register={register} type="radio" value="hang"/>
              <label htmlFor="hang">&nbsp;{handlingOption.hang}</label><br/>
              {errors.default_handling_option &&
                <p className="text-red-500 text-xs">{errors.default_handling_option.message}</p>}
              {addError?.default_handling_option && (
                <p className="text-red-500 text-xs">{addError.default_handling_option}</p>
              )}
              {updateError?.default_handling_option && (
                <p className="text-red-500 text-xs">{updateError.default_handling_option}</p>
              )}
            </div>
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
};

