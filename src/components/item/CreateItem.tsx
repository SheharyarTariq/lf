import React, {useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Switch,
  Typography,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import useCreateItem from "@/lib/api/Dashboard/hooks/item/useCreateItem";
import useUpdateCategory from "@/lib/api/Dashboard/hooks/item/useUpdateItem";
import {CreateItemFormData, CreateItemProps} from "@/components/types";
import {config} from "@/config";


export const CreateItem: React.FC<CreateItemProps> = ({
                                                        id,
                                                        categoryId,
                                                        name,
                                                        description,
                                                        washing_price,
                                                        dry_cleaning_price,
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

    piece: null
  })
  const urlAddArea = `${config.BASE_URL}/items`;
  const urlUpdateArea = `${config.BASE_URL}/items/${id}`;

  const {addArea, loading: addLoading, error: addError,} = useCreateItem(urlAddArea);
  const {updateArea, loading: updateLoading, error: updateError,} = useUpdateCategory(urlUpdateArea);
  const isLoading = addLoading;

  useEffect(() => {
    if (name) setFormData(prevState => ({...prevState, name: name}));
    if (description) setFormData(prevState => ({...prevState, description: description}));
    if (dry_cleaning_price) setFormData(prevState => ({...prevState, dry_cleaning_price: +dry_cleaning_price}));
    if (washing_price) setFormData(prevState => ({...prevState, washing_price: +washing_price}));
    if (pieces) setFormData(prevState => ({...prevState, piece: pieces}));
  }, [name, description, dry_cleaning_price, washing_price, pieces]);

  const handleOpen = () => setOpen(!open);

  const handleSave = async () => {
    const payload = {
      category_id: categoryId,
      ...formData
    };
    const createOrUpdateItem = name ? await updateArea(formData) : await addArea(payload);

    if (createOrUpdateItem) {
      toast.success(`Item ${name ? "updated" : "added"} successfully!`, {position: "bottom-center",});
      refetch();
      setFormData({name: "", description: "", washing_price: null, dry_cleaning_price: null, piece: null})
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
            crossOrigin={`crossorigin`}
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

          {/*{is_washable ? */}
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

            {addError.washing_price && (<p className="text-red-500 text-xs">
              {addError?.washing_price}
            </p>)}
            {updateError.washing_price && (<p className="text-red-500 text-xs">
              {updateError?.washing_price}
            </p>)}
          </div>
          {/*: null}*/}

          {/*{is_dry_cleanable ? */}
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

          {addError.piece && (<p className="text-red-500 text-xs">
            {addError?.piece}
          </p>)}
          {updateError.piece && (<p className="text-red-500 text-xs">
            {updateError?.piece}
          </p>)}
          {/*<div className="grid grid-cols-2 ">*/}
          {/*  <div className="mt-4">*/}
          {/*    <Typography*/}
          {/*      variant="small"*/}
          {/*      color="blue-gray"*/}
          {/*      className="mb-2 text-left font-medium"*/}
          {/*    >*/}
          {/*      Handling Options*/}
          {/*    </Typography>*/}
          {/*    <label>*/}
          {/*      <Switch*/}
          {/*        crossOrigin={`crossOrigin`}*/}
          {/*        checked={formData.fold}*/}
          {/*        onChange={handleHandlingOptionFold}*/}
          {/*      />*/}
          {/*      &nbsp;Fold*/}
          {/*    </label><br/>*/}
          {/*    <label>*/}
          {/*      <Switch*/}
          {/*        crossOrigin={`crossOrigin`}*/}
          {/*        checked={formData.hang}*/}
          {/*        onChange={handleHandlingOptionHang}*/}
          {/*      />*/}
          {/*      &nbsp;Hang*/}
          {/*    </label><br/>*/}
          {/*    {(addError.is_foldable || addError.is_hangable) && (*/}
          {/*      <p className="text-red-500 text-xs">*/}
          {/*        {addError.is_foldable || addError.is_hangable}*/}
          {/*      </p>*/}
          {/*    )}*/}
          {/*    {(updateError?.is_foldable || updateError.is_hangable) && (*/}
          {/*      <p className="text-red-500 text-xs">*/}
          {/*        {updateError.is_foldable || updateError.is_hangable}*/}
          {/*      </p>*/}
          {/*    )}*/}

          {/*  </div>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <Typography*/}
          {/*    variant="small"*/}
          {/*    color="blue-gray"*/}
          {/*    className="mb-2 text-left font-medium"*/}
          {/*  >*/}
          {/*    Default Handling Option*/}
          {/*  </Typography>*/}
          {/*  <>*/}
          {/*    <input type="radio" id="fold" name="handling_clean" value="wash"*/}
          {/*           checked={formData.default_cleaning_method === "wash"}*/}
          {/*           onChange={(e) => setFormData(prev => ({*/}
          {/*             ...prev,*/}
          {/*             defaultHandlingOption: (e.target.value)*/}
          {/*           }))}*/}
          {/*    />*/}
          {/*    <label htmlFor="fold">&nbsp;Fold</label><br/></>*/}

          {/*  <>*/}
          {/*    <input type="radio" id="dry_clean" name="handling_clean" value="dry_clean"*/}
          {/*           checked={formData.default_cleaning_method === "dry_clean"}*/}
          {/*           onChange={(e) => setFormData(prev => ({*/}
          {/*             ...prev,*/}
          {/*             defaultHandlingOption: (e.target.value)*/}
          {/*           }))}*/}
          {/*    />*/}
          {/*    <label htmlFor="hang">&nbsp;Hang</label><br/></>*/}

          {/*</div>*/}
          {/*{addError.default_cleaning_method && (*/}
          {/*  <p className="text-red-500 text-xs">{addError.default_cleaning_method}</p>*/}
          {/*)}*/}
          {/*{updateError?.default_cleaning_method && (*/}
          {/*  <p className="text-red-500 text-xs">{updateError.default_cleaning_method}</p>*/}
          {/*)}*/}
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
