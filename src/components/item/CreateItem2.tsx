import React, {useEffect, useState} from "react";
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
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";
import {CreateItemFormData, CreateItemProps} from "./types";
import {cleaningMethod} from "@/components/constants";
import {item} from "@/api";
import * as yup from "yup";
import {SuccessToast} from "@/lib/common/CommonToaster";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "@/lib/common/Input";
import {CreateCategoryFormDataProps} from "@/components/category/types";


//Todo set scrolling of form also it is being updated and dailog is closed and success message is being showed even
// there are required fields empty

export const CreateItem2: React.FC<CreateItemProps> = ({
                                                         id,
                                                         categoryId,
                                                         name,
                                                         description,
                                                         washing_price,
                                                         dry_cleaning_price,
                                                         default_cleaning_method,
                                                         pieces,
                                                         label,
                                                         refetch,
                                                       }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateItemFormData>({
    name: "",
    description: "",
    washing_price: null,
    dry_cleaning_price: null,
    default_cleaning_method: null,
    piece: null
  })

  const urlAddArea = `${item}`;
  const urlUpdateArea = `${item}/${id}`;
  const {postData: addArea, loading: addLoading, errors: addError,} = usePost(urlAddArea);
  const {updateData: updateArea, loading: updateLoading, errors: updateError,} = useUpdate(urlUpdateArea);
  const isLoading = addLoading;

  const schema = yup.object().shape({
    name: yup.string().required("Item name is required"),
    description: yup.string(),
    washing_price: yup.number().nullable(),
    dry_cleaning_price: yup.number().nullable(),
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
      console.log("Errpr", errors)
      return !!values.washing_price || !!values.dry_cleaning_price;
    }
  );

  const initialValues = {
    category_id: categoryId,
    name: "",
    description: "",
    washing_price: null,
    dry_cleaning_price: null,
    default_cleaning_method: "",
    piece: 1
  }
  const {register, handleSubmit, formState: {errors}, reset, watch,} = useForm({
    resolver: yupResolver(schema as yup.ObjectSchema<CreateItemFormData>),
    defaultValues: initialValues
  })

  useEffect(() => {
    if (formData.washing_price && !formData.dry_cleaning_price) {
      setFormData(prevState => ({...prevState, default_cleaning_method: "wash"}));
    } else if (!formData.washing_price && formData.dry_cleaning_price) {
      setFormData(prevState => ({...prevState, default_cleaning_method: "dry_clean"}));
    } else if (!formData.washing_price && !formData.dry_cleaning_price) {
      setFormData(prevState => ({...prevState, default_cleaning_method: null}));
    }
  }, [formData.washing_price, formData.dry_cleaning_price]);

  useEffect(() => {
    if (name) setFormData(prevState => ({...prevState, name: name}));
    if (description) setFormData(prevState => ({...prevState, description: description}));
    if (dry_cleaning_price) setFormData(prevState => ({...prevState, dry_cleaning_price: +dry_cleaning_price}));
    if (washing_price) setFormData(prevState => ({...prevState, washing_price: +washing_price}));
    if (pieces) setFormData(prevState => ({...prevState, piece: pieces}));
    if (default_cleaning_method) setFormData(prevState => ({
      ...prevState,
      default_cleaning_method: default_cleaning_method
    }));
  }, [name, description, dry_cleaning_price, washing_price, pieces, default_cleaning_method]);

  const handleOpen = () => setOpen(!open);

  const onSubmit: SubmitHandler<CreateItemFormData> = async (payload) => {
    const response = name ? await updateArea(payload) : await addArea(payload);
    console.log("response2", response)
    if (response.success) {
      SuccessToast(`Item ${name ? "updated" : "added"} successfully!`);
      refetch();
      reset(initialValues);
      handleOpen();
    } else {

    }
  };

  return (<>
    <Button
      variant="text"
      color="blue-gray"
      size="sm"
      onClick={handleOpen}
      className={`${!label && "text-black text-center bg-gray-100"}`}
    >
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
      <DialogBody className="space-y-4 pb-6">
        <div className="grid grid-cols-2 gap-2">
          <span>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Name
            </Typography>
            <Input placeholder="Enter name here..." name="name" register={register} className="w-full"/>
            {errors?.name && (<p className="text-red-500 text-xs">{errors.name.message}</p>)}
            {addError?.name && (<p className="text-red-500 text-xs">{addError?.name}</p>)}
            {updateError?.name && (<p className="text-red-500 text-xs">{updateError?.name}</p>)}
          </span>
          <span>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
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
        </div>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          Description
        </Typography>
        <Input placeholder="Enter description here...." name="description" register={register} className="w-full"/>
        {errors?.description && (<p className="text-red-500 text-xs">{errors.description.message}</p>)}

        <div className="grid grid-cols-2 gap-2">
        <span>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            Washing Price
          </Typography>
          <Input placeholder="e.g. 10.29" name="washing_price" register={register} type="number" className="w-full"/>
          {(errors as any)?.[""]?.message && (
            <p className="text-red-500 text-xs">{(errors as any)[""].message}</p>
          )} {addError?.washing_price && (<p className="text-red-500 text-xs">
          {addError?.washing_price}
        </p>)}
          {updateError?.washing_price && (<p className="text-red-500 text-xs">
            {updateError?.washing_price}
          </p>)}
        </span>

          <span>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
          Dry Cleaning Price
        </Typography>
          <Input placeholder="e.g. 10.29" name="dry_cleaning_price" register={register} type="number"
                 className="w-full"/>
            {(errors as any)?.[""]?.message && (
              <p className="text-red-500 text-xs">{(errors as any)[""].message}</p>
            )} {addError?.dry_cleaning_price && (<p className="text-red-500 text-xs">
            {addError?.dry_cleaning_price}
          </p>)}
            {updateError?.dry_cleaning_price && (<p className="text-red-500 text-xs">
              {updateError?.dry_cleaning_price}
            </p>)}
        </span>
        </div>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-medium "
        >
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
        <Button
          className="ml-auto"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </Dialog>
  </>);
};
