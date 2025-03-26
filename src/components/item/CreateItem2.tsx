import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography,} from "@material-tailwind/react";
import usePost from "@/lib/api/Dashboard/hooks/usePost";
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";
import {CreateItemFormData, CreateItemProps} from "./types";
import {cleaningMethod} from "@/components/constants";
import {item} from "@/api";
import * as yup from "yup";
import {ErrorToast, SuccessToast} from "@/lib/common/CommonToaster";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "@/lib/common/Input";
import {orderByOptions} from "@/components/order-list/constants";


//Todo set scrolling of form also it is being updated and dailog is closed and success message is being showed even
// there are required fields empty

export const CreateItem2: React.FC<CreateItemProps> = ({
                                                         id,
                                                         categoryId,
                                                         name,
                                                         description,
                                                         price,
                                                         default_cleaning_method,
                                                         pieces,
                                                         label,
                                                         refetch,
                                                       }) => {
  const [open, setOpen] = useState(false);
  const urlAddArea = `${item}`;
  const urlUpdateArea = `${item}/${id}`;
  const {postData: addArea, loading: addLoading, errors: addError,} = usePost(urlAddArea);
  const {updateData: updateArea, loading: updateLoading, errors: updateError,} = useUpdate(urlUpdateArea);
  const isLoading = addLoading || updateLoading;

  const schema = yup.object().shape({
    category_id: yup.string().required(),
    name: yup.string().required("Item name is required"),
    description: yup.string(),
    price: yup.object().shape({
      dry_cleaning: yup.number().positive("Price must be a positive number").transform((value, originalValue) =>
        originalValue === "" ? null : value
      ).nullable(),
      washing: yup.number().positive("Price must be a positive number").transform((value, originalValue) =>
        originalValue === "" ? null : value
      ).nullable(),
      type: yup.string().required("Price type is required"),
    }),
    default_cleaning_method: yup
      .string()
      .oneOf(["wash", "dry_clean"], "Please select a cleaning method")
      .required("Handling method is required"),
    piece: yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .nullable()
      .required("Piece field is required"),
  }).test(
    "at-least-one-has-value",
    "Either washing price or dry cleaning price must have a value",
    (values) => {
      return !!values.price.dry_cleaning || !!values.price.washing;
    }
  );

  const initialValues = {
    category_id: categoryId,
    name: "",
    description: "",
    price: {
      dry_cleaning: null,
      washing: null,
      type: "",
    },
    default_cleaning_method: "",
    piece: 1
  }
  const {register, handleSubmit, formState: {errors}, reset, watch,} = useForm({
    resolver: yupResolver(schema as yup.ObjectSchema<CreateItemFormData>),
    defaultValues: initialValues
  })

  useEffect(() => {
    const Washing_Price = watch("price.washing");
    const Dryclean_Price = watch("price.dry_cleaning");
    if (Washing_Price && !Dryclean_Price) {
      reset({...watch(), default_cleaning_method: "wash"})
    } else if (!Washing_Price && Dryclean_Price) {
      reset({...watch(), default_cleaning_method: "dry_clean"})
    } else if (!Washing_Price && !Dryclean_Price) {
      reset({...watch(), default_cleaning_method: null})
    }
  }, [watch("price.washing"), watch("price.dry_cleaning")]);

  useEffect(() => {
    reset({
      category_id: categoryId,
      name: name || "",
      description: description || "",
      price: {
        dry_cleaning: price?.dry_cleaning || null,
        washing: price?.washing || null,
        type: price?.type,
      },

      default_cleaning_method: default_cleaning_method || "",
      piece: pieces || 1,
    })
  }, [name, description, categoryId, price?.dry_cleaning, price?.washing, pieces, default_cleaning_method]);

  const handleOpen = () => setOpen(!open);

  const onSubmit: SubmitHandler<CreateItemFormData> = async (payload) => {
    const response = name ? await updateArea(payload) : await addArea(payload);
    if (response.success) {
      SuccessToast(`Item ${name ? "updated" : "added"} successfully!`);
      refetch();
      reset(initialValues);
      handleOpen();
    } else if (!response.success) {

      ErrorToast(response.message || `Failed to ${name ? "updated" : "added"} item!`);
    }
  };

  return (<>
    <Button variant="text" color="blue-gray" size="sm" onClick={handleOpen}
            className={`${!label && "text-black text-center bg-gray-100"}`}>
      {label ? label : <i className=" fa-solid fa-plus "></i>}
    </Button>
    <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Item
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          {name ? (<span> Save After Editing Item.</span>) : (<span> Save After Adding Item.</span>)}{" "}
        </Typography>
      </DialogHeader>
      <DialogBody className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <span>
                      <Typography variant="small" color="blue-gray" className="font-medium">

              Name
            </Typography>
            <Input placeholder="Enter name here..." name="name" register={register} className="w-full"/>
            {errors?.name && (<p className="text-red-500 text-xs">{errors.name.message}</p>)}
            {addError?.name && (<p className="text-red-500 text-xs">{addError?.name}</p>)}
            {updateError?.name && (<p className="text-red-500 text-xs">{updateError?.name}</p>)}
          </span>
          <span>
                      <Typography variant="small" color="blue-gray" className="font-medium">

              Piece
            </Typography>
            <Input placeholder="e.g. 1,2... " name="piece" register={register} type="number" className="w-full"/>
            {errors?.piece && (<p className="text-red-500 text-xs">{errors.piece.message}</p>)}
            {addError?.piece && (<p className="text-red-500 text-xs">
              {addError?.piece}
            </p>)}
            {updateError?.piece && (<p className="text-red-500 text-xs">
              {updateError?.piece}
            </p>)}
          </span>

          <span>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Description
          </Typography>
          <Input placeholder="Enter description here...." name="description" register={register} className="w-full"/>
            {errors?.description && (<p className="text-red-500 text-xs">{errors.description.message}</p>)}
              </span>
          <span>
            <Typography variant="small" color="blue-gray" className="font-medium">
              Type
            </Typography>
            {/*<Input placeholder="e.g. 1,2... " name="price.type" register={register} type="string"/>*/}
            <select
              className="p-2.5 rounded border border-gray-400 w-full"  {...register("price.type")}>
                  <option value="">None</option>
              {[{label: "Fixed", value: "fixed"},].map(({label, value}) => <option key={value}
                                                                                   value={value}>{label}</option>)}
                </select>
            {errors?.price?.type && (<p className="text-red-500 text-xs">{errors?.price?.type?.message}</p>)}
            {addError?.price.type && (<p className="text-red-500 text-xs">
              {addError?.price.type}
            </p>)}
            {updateError?.price.type && (<p className="text-red-500 text-xs">
              {updateError?.price.type}
            </p>)}
          </span>
          <span>
                    <Typography variant="small" color="blue-gray" className="font-medium">

            Washing Price
          </Typography>
          <Input placeholder="e.g. 10.29" name="price.washing" register={register} type="number" className="w-full"/>
            {(errors as any)?.[""]?.message && (
              <p className="text-red-500 text-xs">{(errors as any)[""].message}</p>
            )}
            {errors?.price?.washing && (<p className="text-red-500 text-xs">
              {errors.price.washing.message}
            </p>)}
            {addError?.washing_price && (<p className="text-red-500 text-xs">
              {addError?.washing_price}
            </p>)}
            {updateError?.washing_price && (<p className="text-red-500 text-xs">
              {updateError?.washing_price}
            </p>)}
        </span>

          <span>
          <Typography variant="small" color="blue-gray" className="font-medium">
          Dry Cleaning Price
        </Typography>
          <Input placeholder="e.g. 10.29" name="price.dry_cleaning" register={register} type="number"
                 className="w-full"/>

            {errors?.price?.dry_cleaning && (<p className="text-red-500 text-xs">
              {errors?.price.dry_cleaning.message}
            </p>)}
            {addError?.dry_cleaning_price && (<p className="text-red-500 text-xs">
              {addError?.dry_cleaning_price}
            </p>)}
            {updateError?.dry_cleaning_price && (<p className="text-red-500 text-xs">
              {updateError?.dry_cleaning_price}
            </p>)}
        </span>
        </div>
        <Typography variant="small" color="blue-gray" className="font-medium">
          Default Washing Method
        </Typography>
        <Input name="default_cleaning_method" register={register} type="radio" value="wash"/>
        <label htmlFor="fold">&nbsp;{cleaningMethod.wash}</label>
        <br/>
        <Input name="default_cleaning_method" register={register} type="radio" value="dry_clean"/>
        <label>&nbsp;{cleaningMethod.dry_clean}</label>

        {errors?.default_cleaning_method && (
          <p className="text-red-500 text-xs">{errors.default_cleaning_method.message}</p>
        )} {addError?.default_cleaning_method && (
        <p className="text-red-500 text-xs">{addError.default_cleaning_method}</p>
      )}
        {updateError?.default_cleaning_method && (
          <p className="text-red-500 text-xs">{updateError.default_cleaning_method}</p>
        )}

      </DialogBody>
      <DialogFooter>
        <Button className="ml-auto" onClick={handleSubmit(onSubmit)}
          // disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </Dialog>
  </>);
};
