import React, {useEffect} from "react";
import {Typography} from "@material-tailwind/react";
import {cleaningMethods, handlingOptions} from "@/components/constants";
import {FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch} from "react-hook-form";
import Input from "@/lib/common/Input";
import {InferType} from "yup";
import {schema} from "./AddItemFromCategory2";

type FormValues = InferType<typeof schema>;

interface Props {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>
  selectedItem: {
    id: string;
    name: string;
    description: string | null;
    piece: number;
    default_handling_option: string | null;
    default_cleaning_method: string | null;
    price: {
      dry_clean: string | null;
      wash: string | null;
    };
    defaults: {
      cleaning_method: string | null;
      handling_option: string | null;
    };
  } | null;

  updating?: boolean;

  Error?: {
    [key: string]: any
  } | null

  errors?: FieldErrors<FormValues>

}

interface ItemPayload {
  is_open_item: boolean;
  item_id: string;
  open_item_name: string,
  piece: number,
  quantity: number | null;
  cleaning_method?: string | null;
  handling_option: string | null;
  price_per_unit: number | null;
}

const OrderItemForm2: React.FC<Props> = ({
                                           selectedItem,
                                           updating,
                                           Error,
                                           register, watch, setValue
                                           , errors
                                         }) => {

  useEffect(() => {
    setValue("open_item_name", selectedItem?.name ? selectedItem?.name : watch("open_item_name"));
  }, [watch("open_item_name"), selectedItem, setValue]);


  // useEffect(() => {
  //   if (!updating) {
  //     setFormData({
  //       is_open_item: formData.is_open_item,
  //       item_id: selectedItem?.id || "",
  //       quantity: 1,
  //       open_item_name: formData.open_item_name,
  //       piece: formData.piece,
  //       cleaning_method: selectedItem?.default_cleaning_method || null,
  //       handling_option: selectedItem?.default_handling_option || null,
  //       price_per_unit:
  //         selectedItem?.default_cleaning_method === "wash"
  //           ? parseFloat(selectedItem?.price.wash || "0")
  //           : parseFloat(selectedItem?.price.dry_clean || "0"),
  //     });
  //   }
  // }, [selectedItem]);

  console.log("Errorss", Error);
  return (
    <div>
      {(!updating || watch("is_open_item")) &&
        <>
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Selected Item Details:
          </Typography>
          <div className="grid sm:grid-cols-2 gap-2 ">
            <div>
              <Typography variant="small" color="blue-gray" className="font-medium">
                Name
              </Typography>
              <Input readOnly={!watch("is_open_item")}
                     register={register}
                     name="open_item_name"
                     className="w-full"
              />
              {/*{errors?.open_item_name && <p className="text-red-500 text-xs">{errors.open_item_name.message}</p>}*/}

              {Error?.open_item_name && <p className="text-red-500 text-xs">{Error?.open_item_name}</p>}
            </div>

            <div>
              {!watch("is_open_item") && <>
                <Typography variant="small" color="blue-gray" className="font-medium">
                  Description
                </Typography>
                <Input register={register} name="description" placeholder="Description here ..."
                       className="w-full"/>              </>
              }
              {watch("is_open_item") &&
                <>
                  <Typography variant="small" color="blue-gray" className="font-medium">Piece</Typography>
                  <Input
                    type="number"
                    register={register}
                    name="piece"
                    className="w-full"
                  />
                  {/*{errors?.piece && <p className="text-red-500 text-xs">{errors.piece.message}</p>}*/}
                  {Error?.piece && <p className="text-red-500 text-xs">{Error?.piece}</p>}
                </>}
            </div>
            <Typography variant="small" color="blue-gray" className="font-medium grid col-span-2">
              Cleaning Method
            </Typography>

            <div>
              <select
                className="p-2 rounded w-full border border-gray-400"
                {...register("cleaning_method")}
              >
                <option value="" disabled>
                  Choose a cleaning method
                </option>
                {cleaningMethods.map(element => <option key={element.label} value={element.value}>
                  {element.label}
                </option>)}
              </select>
              {/*{errors?.cleaning_method && <p className="text-red-500 text-xs">{errors.cleaning_method.message}</p>}*/}

              {Error?.cleaning_method && <p className="text-red-500 text-xs">{Error?.cleaning_method}</p>}
            </div>
            <div>
              <select
                className="p-2 rounded w-full border border-gray-400"
                {...register("handling_option")}
              >
                <option value="" disabled>
                  Choose a handling option
                </option>
                {handlingOptions.map(element => <option key={element.label} value={element.value}>
                  {element.label}
                </option>)
                }
              </select>

              {/*{errors?.handling_option && <p className="text-red-500 text-xs">{errors.handling_option.message}</p>}*/}

              {Error?.handling_option && <p className="text-red-500 text-xs">{Error?.handling_option}</p>}
            </div>
            <br/>
          </div>
        </>
      }
      <div className="grid sm:grid-cols-2 gap-2">
        <div>
          <Typography variant="small" color="blue-gray" className="font-medium grid col-span-2">
            Quantity
          </Typography>
          <Input
            register={register}
            name="quantity"
            placeholder="e.g. 1,2..."
            className="w-full"
          />
          {Error?.quantity && <p className="text-red-500 text-xs">{Error?.quantity}</p>}
          {/*{errors?.quantity && <p className="text-red-500 text-xs">{errors.quantity.message}</p>}*/}

        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="font-medium grid col-span-2">
            Price per unit
          </Typography>
          <Input
            register={register}
            name="price_per_unit"
            placeholder="e.g. 10.75"
            className="w-full"
          />
          {Error?.price_per_unit && <p className="text-red-500 text-xs">{Error?.price_per_unit}</p>}
          {/*{errors?.price_per_unit && <p className="text-red-500 text-xs">{errors.price_per_unit.message}</p>}*/}
        </div>
      </div>
    </div>
  );
};

export default OrderItemForm2;
