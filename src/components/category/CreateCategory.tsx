import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Switch, Typography,} from "@material-tailwind/react";
import toast from "react-hot-toast";
import usePost from "@/lib/api/Dashboard/hooks/usePost";
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";
import {config} from "@/config";
import {CreateCategoryFormData, CreateCategoryProps} from "@/components/category/types";
import {handlingOption} from "@/components/constants";

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
  const [formData, setFormData] = useState<CreateCategoryFormData>({
    inputValue: "",
    descriptions: "",
    hang: false,
    fold: false,
    default_handling_option: null,
  });
  const {
    postData: addArea,
    loading: addLoading,
    errors: addError,
  } = usePost(`${config.BASE_URL}/categories`);
  const {
    updateData: updateArea,
    loading: updateLoading,
    errors: updateError,
  } = useUpdate(`${config.BASE_URL}/categories/${id}`);
  const isLoading = addLoading || updateLoading;

  useEffect(() => {
    if (name) setFormData(prev => ({...prev, inputValue: name}));
    if (description) setFormData(prev => ({...prev, descriptions: description}));
    if (is_foldable) setFormData(prev => ({...prev, fold: is_foldable}));
    if (is_hangable) setFormData(prev => ({...prev, hang: is_hangable}));
    if (default_handling_option) {
      setFormData(prev => ({...prev, default_handling_option: default_handling_option}));
    } else if (is_foldable && is_hangable) {
      setFormData(prev => ({...prev, default_handling_option: default_handling_option}))
    } else if (is_foldable && !is_hangable) {
      setFormData(prev => ({...prev, default_handling_option: "fold"}))
    } else if (!is_foldable && is_hangable) {
      setFormData(prev => ({...prev, default_handling_option: "hang"}))
    } else if (!is_foldable && !is_hangable) {
      setFormData(prev => ({...prev, default_handling_option: null}))
    }
  }, [name, description, is_foldable, is_hangable, default_handling_option]);

  useEffect(() => {
    if (formData.fold && !formData.hang) {
      setFormData(prev => ({...prev, default_handling_option: "fold"}))
    } else if (!formData.fold && formData.hang) {
      setFormData(prev => ({...prev, default_handling_option: "hang"}))
    } else if (!formData.fold && !formData.hang) {
      setFormData(prev => ({...prev, default_handling_option: null}))
    } else if (formData.fold && formData.hang) {
      setFormData(prev => ({...prev, default_handling_option: default_handling_option}))
    }
  }, [formData.hang, formData.fold]);

  const handleOpen = () => setOpen(!open);

  const handleSave = async () => {
    const dataValue = {
      name: formData.inputValue,
      description: formData.descriptions,
      is_hangable: formData.hang,
      is_foldable: formData.fold,
      default_handling_option: formData.default_handling_option,
    };

    const newArea = name ? await updateArea(dataValue) : await addArea(dataValue);
    if (newArea) {
      toast.success(`Category ${name ? "updated" : "added"} successfully!`, {position: "bottom-center",});
      refetch();
      setFormData(prev => ({
        ...prev,
        inputValue: "",
        descriptions: "",
        hang: false,
        fold: false,
        default_handling_option: null,
      }))
      handleOpen();
    }
  };


  const handleHandlingOptionFold = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      fold: checked,
    }));
  }
  const handleHandlingOptionHang = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      hang: checked,
    }));
  }
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
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Name
            </Typography>
            <input
              className='p-2 rounded w-full border border-gray-400'
              placeholder="e.g. T-Shirt"
              name="name"
              value={formData.inputValue}
              onChange={(e) => setFormData(prev => ({...prev, inputValue: (e.target.value)}))}
            />
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
            <input
              className='p-2 rounded w-full border border-gray-400'
              placeholder="Description of the Category here..."
              name="description"
              value={formData.descriptions}
              onChange={(e) => setFormData(prev => ({...prev, descriptions: (e.target.value)}))}
            />
          </div>
          <div className="grid grid-cols-2 ">
            <div className="mt-4">
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
                  checked={formData.fold}
                  onChange={handleHandlingOptionFold}
                />
                &nbsp;{handlingOption.fold}
              </label><br/>
              <label>
                <Switch
                  crossOrigin="crossOrigin"
                  checked={formData.hang}
                  onChange={handleHandlingOptionHang}
                />
                &nbsp;{handlingOption.hang}
              </label><br/>
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
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Default Handling Option
            </Typography>
            <>
              <input type="radio" id="fold" name="handling_method" value="fold"
                     checked={formData.default_handling_option === "fold"}
                     onChange={(e) => setFormData(prev => ({
                       ...prev,
                       default_handling_option: (e.target.value)
                     }))}
              />
              <label htmlFor="fold">&nbsp;{handlingOption.fold}</label><br/></>

            <>
              <input type="radio" id="hang" name="handling_method" value="hang"
                     checked={formData.default_handling_option === "hang"}
                     onChange={(e) => setFormData(prev => ({
                       ...prev,
                       default_handling_option: (e.target.value)
                     }))}
              />
              <label htmlFor="hang">&nbsp;{handlingOption.hang}</label><br/></>
          </div>
          {addError?.default_handling_option && (
            <p className="text-red-500 text-xs">{addError.default_handling_option}</p>
          )}
          {updateError?.default_handling_option && (
            <p className="text-red-500 text-xs">{updateError.default_handling_option}</p>
          )}
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
    </>
  );
};

