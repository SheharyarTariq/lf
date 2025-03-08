import React, {useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
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
import {useForm} from "react-hook-form";


//Todo set scrolling of form also it is being updated and dailog is closed and success message is being showed even
// there are required fields empty

export const CreateItem: React.FC<CreateItemProps> = ({
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

  // const schema = yup.object().shape({
  //   name: yup.string().required("Name is required"),
  //   description: yup.string(),
  //   washing_price: yup.number(),
  //   dry_cleaning_price: yup.number(),
  //   default_cleaning_method: yup.string().oneOf(["fold", "hang"], "Please select a handling method")
  //     .required("Handling method is required"),
  //   piece: yup.number().required("Piece is required")
  // }).test(
  //   "at-least-one-has-value",
  //   "Either washing_price or dry_cleaning_price must have value",
  //   (values) => {
  //     values.washing_price || values.dry_cleaning_price
  //   }
  // );
  // const initialValues = {
  //   name: "",
  //   description: "",
  //   washing_price: null,
  //   dry_cleaning_price: null,
  //   default_cleaning_method: "",
  //   piece: 1
  // }
  // const {register, handleSubmit, formState: {errors}, reset, watch,} = useForm({
  //   resolver: yupResolver(schema as yup.ObjectSchema<CreateItemProps>),
  //   defaultValues: initialValues
  // })

  const urlAddArea = `${item}`;
  const urlUpdateArea = `${item}/${id}`;

  const {postData: addArea, loading: addLoading, errors: addError,} = usePost(urlAddArea);
  const {updateData: updateArea, loading: updateLoading, errors: updateError,} = useUpdate(urlUpdateArea);
  const isLoading = addLoading;

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
  console.log("data", formData)

  const handleOpen = () => setOpen(!open);

  const handleSave = async () => {
    const payload = {
      category_id: categoryId,
      ...formData
    };
    const response = name ? await updateArea(formData) : await addArea(payload);

    if (response.success) {
      SuccessToast(`Item ${name ? "updated" : "added"} successfully!`);
      refetch();
      setFormData({
        name: "",
        description: "",
        washing_price: null,
        dry_cleaning_price: null,
        piece: null,
        default_cleaning_method: null
      });
      handleOpen();
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
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 mt-4 text-left font-medium"
          >
            Name
          </Typography>
          <Input
            crossOrigin="crossorigin"
            color="gray"
            size="lg"
            placeholder="Enter name here..."
            name="name"
            value={formData.name}
            onChange={(e) => setFormData(prevState => ({...prevState, name: e.target.value}))}
          />
          {addError?.name && (<p className="text-red-500 text-xs">{addError?.name}</p>)}
          {updateError?.name && (<p className="text-red-500 text-xs">{updateError?.name}</p>)}
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 mt-4 text-left font-medium"
          >
            Description
          </Typography>
          <input
            className='p-2 rounded w-full border border-gray-400'
            placeholder="Enter description here...."
            name="description"
            value={formData.description}
            onChange={(e) => setFormData(prevState => ({
              ...prevState, description: e.target.value
            }))}
          />

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 mt-4 text-left font-medium"
            >
              Washing Price
            </Typography>
            <Input
              type="number"
              crossOrigin={`crossorigin`}
              color="gray"
              size="lg"
              placeholder="e.g. 10.29"
              name="washing_price"
              value={`${formData.washing_price}`}
              onChange={(e) => setFormData(prevState => ({
                ...prevState, washing_price: parseFloat(e.target.value)
              }))}
            />

            {addError?.washing_price && (<p className="text-red-500 text-xs">
              {addError?.washing_price}
            </p>)}
            {updateError?.washing_price && (<p className="text-red-500 text-xs">
              {updateError?.washing_price}
            </p>)}
          </div>

          <div><Typography
            variant="small"
            color="blue-gray"
            className="mb-2 mt-4 text-left font-medium"
          >
            Dry Cleaning Price
          </Typography>
            <Input
              type="number"
              crossOrigin={`crossorigin`}
              color="gray"
              size="lg"
              placeholder="e.g. 8.70"
              name="dry_cleaning_price"
              value={`${formData.dry_cleaning_price}`}
              onChange={(e) => setFormData(prevState => ({
                ...prevState, dry_cleaning_price: parseFloat(e.target.value)
              }))}
            />

            {addError?.dry_cleaning_price && (<p className="text-red-500 text-xs">
              {addError?.dry_cleaning_price}
            </p>)}
            {updateError?.dry_cleaning_price && (<p className="text-red-500 text-xs">
              {updateError?.dry_cleaning_price}
            </p>)}</div>
          {/* : null}*/}
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 mt-4 text-left font-medium"
          >
            Piece
          </Typography>
          <Input
            type="number"
            crossOrigin={`crossorigin`}
            color="gray"
            size="lg"
            placeholder="Enter no of pieces"
            name="piece"
            value={`${formData.piece}`}
            onChange={(e) => setFormData(prevState => ({
              ...prevState, piece: parseFloat(e.target.value)
            }))}
          />

          {addError?.piece && (<p className="text-red-500 text-xs">
            {addError?.piece}
          </p>)}
          {updateError?.piece && (<p className="text-red-500 text-xs">
            {updateError?.piece}
          </p>)}

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Default Washing Method
            </Typography>
            <>
              <input type="radio" id="fold" name="handling_clean" value="wash"
                     checked={formData.default_cleaning_method === "wash"}
                     onChange={(e) => setFormData(prev => ({
                       ...prev,
                       default_cleaning_method: (e.target.value)
                     }))}
              />
              <label htmlFor="fold">&nbsp;{cleaningMethod.wash}</label><br/></>

            <>
              <input type="radio" id="dry_clean" name="handling_clean" value="dry_clean"
                     checked={formData.default_cleaning_method === "dry_clean"}
                     onChange={(e) => setFormData(prev => ({
                       ...prev,
                       default_cleaning_method: (e.target.value)
                     }))}
              />
              <label>&nbsp;{cleaningMethod.dry_clean}</label><br/></>

          </div>
          {addError?.default_cleaning_method && (
            <p className="text-red-500 text-xs">{addError.default_cleaning_method}</p>
          )}
          {updateError?.default_cleaning_method && (
            <p className="text-red-500 text-xs">{updateError.default_cleaning_method}</p>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          className="ml-auto"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </Dialog>
  </>);
};
