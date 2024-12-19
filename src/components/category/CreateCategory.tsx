import React, { memo, useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
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
import useCreateCategory from "@/lib/api/Dashboard/hooks/category/useCreateCategory";
import useUpdateCategory from "@/lib/api/Dashboard/hooks/category/useUpdateCategory";

type HandlingOption = {
  handling_option: string;
  default: boolean;
};

type OptionType = {
  value: HandlingOption;
  label: string;
};

type Props = {
  name: string | null;
  id: string | number | null;
  refetch: () => void;
  dailogLabel: string | null;
  description: string | null;
  handlingOption: HandlingOption[] | null;
};

export const CreateCategory: React.FC<Props> = memo(
  ({ dailogLabel, name, description, handlingOption, id, refetch }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [descriptions, setDescription] = useState<string>("");
    const [handlingOptions, setHandlingOptions] = useState<HandlingOption[]>(
      [],
    );

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const urlAddArea = `${BASE_URL}/categories`;
    const urlUpdateArea = `${BASE_URL}/categories/${id}`;
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
      if (name) setInputValue(name);
      if (description) setDescription(description);
      if (handlingOption && handlingOption.length > 0) {
        setHandlingOptions(
          handlingOption.map((element) => ({
            handling_option: element.handling_option,
            default: element.default,
          })),
        );
      } else {
        setHandlingOptions([]);
      }
    }, [name, description, handlingOption]);

    const handleOpen = () => setOpen(!open);

    const handleSave = async () => {
      const dataValue = {
        name: inputValue,
        description: descriptions,
        handling_options: handlingOptions,
      };

      const newArea = name
        ? await updateArea(dataValue)
        : await addArea(dataValue);

      if (newArea) {
        toast.success(`Category ${name ? "updated" : "added"} successfully!`, {
          position: "bottom-center",
        });
        refetch();
        setInputValue("");
        setDescription("");
        setHandlingOptions([]);
        handleOpen();
      }
    };

    const allOptions: OptionType[] = [
      { value: { handling_option: "fold", default: false }, label: "Fold" },
      { value: { handling_option: "hang", default: false }, label: "Hang" },
    ];

    const availableOptions = allOptions.filter(
      (option) =>
        !handlingOptions.some(
          (selectedOption) =>
            selectedOption.handling_option === option.value.handling_option,
        ),
    );

    const handleOptionChange = (selectedOptions: MultiValue<OptionType>) => {
      setHandlingOptions(
        selectedOptions.map((option) => ({
          handling_option: option.value.handling_option,
          default: false,
        })),
      );
    };

    const handleDefaultChange = (handlingOption: string) => {
      setHandlingOptions((prev) =>
        prev.map((option) => ({
          ...option,
          default: option.handling_option === handlingOption,
        })),
      );
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
            <Typography>
              {dailogLabel ? (
                <span className="mt-1 font-normal text-gray-600">
                  {" "}
                  Press save after {dailogLabel}ing Category.
                </span>
              ) : (
                <span className="mt-1 font-normal text-gray-600">
                  Press save after Adding Category.
                </span>
              )}
            </Typography>
          </DialogHeader>
          <DialogBody className="space-y-4 pb-6">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Category Name
              </Typography>
              <Input
                crossOrigin="crossorigin"
                color="gray"
                size="lg"
                placeholder="e.g. T-Shirt"
                name="name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
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
                Category Description
              </Typography>
              <Input
                crossOrigin="crossorigin"
                color="gray"
                size="lg"
                placeholder="CreateArea description here"
                name="description"
                value={descriptions}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="mt-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium"
                >
                  Handling Options
                </Typography>

                <Select
                  options={availableOptions}
                  isMulti
                  value={handlingOptions.map((option) => ({
                    value: option,
                    label: option.handling_option,
                  }))}
                  onChange={handleOptionChange}
                  className="border-none"
                  placeholder="Select handling options"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderColor: state.isFocused ? "" : "#B7C4CA", // Border color on focus/blur
                      boxShadow: state.isFocused ? "0 0 0 1px black" : "none", // Box shadow for focus
                      "&:hover": {
                        borderColor: "#B7C4CA", // Border color on hover (can adjust to your liking)
                      },
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? "#F0F0F0"
                        : state.isFocused
                          ? "#F0F0F0" // Light gray
                          : "white",
                      color: state.isSelected ? "black" : "black",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#F0F0F0", // Light gray background on hover (no blue)
                      },
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#F0F0F0", // Light gray background for selected options
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "black", // Text color for selected options
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "#B7C4CA",
                      "&:hover": {
                        backgroundColor: "#F0F0F0", // Light gray background on hover
                        color: "black", // Black text on hover
                      },
                    }),
                  }}
                />
                {addError.handling_options && (
                  <p className="text-red-500 text-xs">
                    {addError.handling_options}
                  </p>
                )}
                {updateError?.handling_options && (
                  <p className="text-red-500 text-xs">
                    {updateError.handling_options}
                  </p>
                )}
                <div className="mt-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    Set Default
                  </Typography>
                  {handlingOptions.length > 0 ? (
                    handlingOptions.map((option) => (
                      <label
                        key={option.handling_option}
                        className="block mb-2"
                      >
                        <input
                          type="radio"
                          name="defaultOption"
                          value={option.handling_option}
                          checked={option.default}
                          onChange={() =>
                            handleDefaultChange(option.handling_option)
                          }
                        />
                        {option.handling_option}
                      </label>
                    ))
                  ) : (
                    <Typography color="red">
                      No handling options available
                    </Typography>
                  )}
                </div>
              </div>
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
      </>
    );
  },
);
