import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Switch, Typography,} from "@material-tailwind/react";
import toast from "react-hot-toast";
import useCreateCategory from "@/lib/api/Dashboard/hooks/category/useCreateCategory";
import useUpdateCategory from "@/lib/api/Dashboard/hooks/category/useUpdateCategory";
import {config} from "@/config";
import {CreateCategoryFormData, CreateCategoryProps} from "@/pages/dashboard/types";

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
    defaultHandlingOption: null,
  });

  const urlAddArea = `${config.BASE_URL}/categories`;
  const urlUpdateArea = `${config.BASE_URL}/categories/${id}`;
  const {
    addArea,
    loading: addLoading,
    error: addError,
  } = useCreateCategory(urlAddArea);
  const {
    updateArea,
    loading: updateLoading,
    error: updateError,
  } = useUpdateCategory(urlUpdateArea);
  const isLoading = addLoading || updateLoading;

  useEffect(() => {
    if (name) setFormData(prev => ({...prev, inputValue: name}));
    if (description) setFormData(prev => ({...prev, descriptions: description}));
    if (is_foldable) setFormData(prev => ({...prev, fold: is_foldable}));
    if (is_hangable) setFormData(prev => ({...prev, hang: is_hangable}));
    if (default_handling_option) setFormData(prev => ({
      ...prev,
      defaultHandlingOption: default_handling_option
    }));
  }, [name, description, is_foldable, is_hangable, default_handling_option]);

  useEffect(() => {
    if (formData.fold && !formData.hang) {
      setFormData(prev => ({...prev, defaultHandlingOption: "fold"}))
    } else if (!formData.fold && formData.hang) {
      setFormData(prev => ({...prev, defaultHandlingOption: "hang"}))
    } else if (!formData.fold && !formData.hang) {
      setFormData(prev => ({...prev, defaultHandlingOption: null}))
    }
  }, [formData.hang, formData.fold]);
  const handleOpen = () => setOpen(!open);

  const handleSave = async () => {
    const dataValue = {
      name: formData.inputValue,
      description: formData.descriptions,
      is_hangable: formData.hang,
      is_foldable: formData.fold,
      default_handling_option: formData.defaultHandlingOption,
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
        defaultHandlingOption: null,
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
            {addError.name && (
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
                  crossOrigin={`crossOrigin`}
                  checked={formData.fold}
                  onChange={handleHandlingOptionFold}
                />
                &nbsp;Fold
              </label><br/>
              <label>
                <Switch
                  crossOrigin={`crossOrigin`}
                  checked={formData.hang}
                  onChange={handleHandlingOptionHang}
                />
                &nbsp;Hang
              </label><br/>
              {(addError.is_foldable || addError.is_hangable) && (
                <p className="text-red-500 text-xs">
                  {addError.is_foldable || addError.is_hangable}
                </p>
              )}
              {(updateError?.is_foldable || updateError.is_hangable) && (
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
                     checked={formData.defaultHandlingOption === "fold"}
                     onChange={(e) => setFormData(prev => ({
                       ...prev,
                       defaultHandlingOption: (e.target.value)
                     }))}
              />
              <label htmlFor="fold">&nbsp;Fold</label><br/></>

            <>
              <input type="radio" id="hang" name="handling_method" value="hang"
                     checked={formData.defaultHandlingOption === "hang"}
                     onChange={(e) => setFormData(prev => ({
                       ...prev,
                       defaultHandlingOption: (e.target.value)
                     }))}
              />
              <label htmlFor="hang">&nbsp;Hang</label><br/></>

          </div>
          {addError.default_handling_option && (
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

