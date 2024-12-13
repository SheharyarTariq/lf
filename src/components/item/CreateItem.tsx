import React, { memo, useEffect, useState } from "react";
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
import useCreateItem from "@/lib/api/Dashboard/hooks/item/useCreateItem";
import useUpdateCategory from "@/lib/api/Dashboard/hooks/item/useUpdateItem";

type Props = {
  label: string | null;
  id: string | null;
  categoryId: string | null;
  name: string | null;
  description: string | null;
  washing_price: number | null;
  dry_cleaning_price: number | null;
  refetch: () => void;
};

export const CreateItem: React.FC<Props> = memo(
  ({
    id,
    categoryId,
    name,
    description,
    washing_price,
    dry_cleaning_price,
    label,
    refetch,
  }) => {
    const [open, setOpen] = useState(false);
    const [names, setName] = useState<string>("");
    const [descriptions, setDescription] = useState<string>("");
    const [washingPrice, setWashingPrice] = useState<number | null>(null);
    const [dryCleaningPrice, setDryCleaningPrice] = useState<number | null>(
      null,
    );
    const urlAddArea = `https://laundry-free-2a18b6e8d093.herokuapp.com/api/items`;
    const urlUpdateArea = `https://laundry-free-2a18b6e8d093.herokuapp.com/api/items/${id}`;

    const {
      addArea,
      loading: addLoading,
      error: addError,
    } = useCreateItem(urlAddArea);
    const {
      updateArea,
      loading: updateLoading,
      error: updateError,
    } = useUpdateCategory(urlUpdateArea);
    const isLoading = addLoading;

    useEffect(() => {
      if (name) {
        setName(name);
      }
      if (description) {
        setDescription(description);
      }
      if (dry_cleaning_price) {
        setDryCleaningPrice(+dry_cleaning_price);
      }

      if (washing_price) {
        setWashingPrice(+washing_price);
      }
    }, [name, description, dry_cleaning_price, washing_price]);

    const handleOpen = () => setOpen(!open);

    const handleSave = async () => {
      const dataValueUpdate = {
        name: names,
        description: descriptions,
        washing_price: washingPrice,
        dry_cleaning_price: dryCleaningPrice,
      };
      const dataValue = {
        category_id: categoryId,
        name: names,
        description: descriptions,
        washing_price: washingPrice,
        dry_cleaning_price: dryCleaningPrice,
      };
      const newArea = name
        ? await updateArea(dataValueUpdate)
        : await addArea(dataValue);

      if (newArea) {
        toast.success(`Item ${name ? "updated" : "added"} successfully!`, {
          position: "bottom-center",
        });
        refetch();
        setName("");
        setWashingPrice(null);
        setDryCleaningPrice(null);
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
              {name ? (
                <p> Save After Editing Item.</p>
              ) : (
                <p> Save After Adding Item.</p>
              )}{" "}
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
                crossOrigin={`crossorigin`}
                color="gray"
                size="lg"
                placeholder="Enter name here..."
                name="name"
                value={names}
                onChange={(e) => setName(e.target.value)}
              />
              {addError?.name && (
                <p className="text-red-500 text-xs">{addError?.name}</p>
              )}
              {updateError?.name && (
                <p className="text-red-500 text-xs">{updateError?.name}</p>
              )}
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 mt-4 text-left font-medium"
              >
                Description
              </Typography>
              <Input
                crossOrigin={`crossorigin`}
                color="gray"
                size="lg"
                placeholder="Enter description here...."
                name="description"
                value={descriptions}
                onChange={(e) => setDescription(e.target.value)}
              />

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
                value={`${washingPrice}`}
                onChange={(e) => setWashingPrice(parseFloat(e.target.value))}
              />

              {addError.washing_price && (
                <p className="text-red-500 text-xs">
                  {addError?.washing_price}
                </p>
              )}
              {updateError.washing_price && (
                <p className="text-red-500 text-xs">
                  {updateError?.washing_price}
                </p>
              )}
              <Typography
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
                value={`${dryCleaningPrice}`}
                onChange={(e) =>
                  setDryCleaningPrice(parseFloat(e.target.value))
                }
              />
              {addError?.dry_cleaning_price && (
                <p className="text-red-500 text-xs">
                  {addError?.dry_cleaning_price}
                </p>
              )}
              {updateError?.dry_cleaning_price && (
                <p className="text-red-500 text-xs">
                  {updateError?.dry_cleaning_price}
                </p>
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
      </>
    );
  },
);
