import React from "react";
import {Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";
import {TableData} from "@/lib/common/TableData";
import DeleteModal from "@/lib/common/DeleteModal";
import {cleaningMethods} from "@/components/constants";
import {category, item} from "@/api";
import {CreateItem2} from "@/components/item/CreateItem2";
import useFetch from "@/lib/api/Dashboard/hooks/useFetch";
import {useParams} from "react-router-dom";
import CategoryCard from "@/components/item/CategoryCard";


export interface Item {
  id: string;
  name: string;
  description: string | null;
  piece: number;
  image: string | null;
  default_cleaning_method: "dry_clean" | "washing";
  price: {
    type: string;
    washing: number | null;
    dry_cleaning: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  position: number;
  is_hangable: boolean;
  is_foldable: boolean;
  default_handling_option: "hang" | "fold";
  items: Item[];
}

const Item = ({
                // categoryName, items,
              }) => {
  const {categoryId} = useParams();
  const {fetchData: data, errors, loading, refetch} = useFetch<any>(`${category}/${categoryId}`);
  console.log("data", data);

  return (
    <>
      <CategoryCard data={data?.result}/>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray"
                      className="mb-8 p-6 border-2 shadow-2xl ">
            <Typography variant="h6" color="white">
              {data?.result.name} Items <CreateItem2
              categoryId={data?.result.id || ""} refetch={refetch}/>
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full table-auto">
              <thead>
              <tr>
                {['Category', 'Description', 'Dry Cleaning Price', 'Washing Price', "Default Cleaning Method", "Type", "piece", "Action"
                ].map((el, index) =>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left" key={index}>
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>)}
              </tr>
              </thead>
              <tbody>
              {data?.result.items?.map(({
                                          id,
                                          name,
                                          description,
                                          price,
                                          piece,
                                          default_cleaning_method
                                        }: Item, key: number,) => {
                const className = `py-3 px-5 ${key === data?.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                return (<tr key={id}>
                  <TableData classes={`${className}`} data={name}/>
                  <TableData classes={`${className}`} data={description ? description : "-"}/>
                  <TableData classes={`${className}`} data={price?.dry_cleaning ? price.dry_cleaning : "-"}/>
                  <TableData classes={`${className}`} data={price?.washing ? price.washing : "-"}/>
                  <TableData classes={`${className}`}
                             data={cleaningMethods.find(element => element.value === default_cleaning_method)?.label}/>
                  <TableData classes={`${className}`} data={price?.type ? price.type : "-"}/>
                  <TableData classes={`${className}`} data={piece ? piece : "-"}/>
                  <TableData classes={`${className}`} data={<div className={`flex`}>
                    <CreateItem2
                      pieces={piece}
                      id={`${id}`}
                      label="Edit"
                      categoryId={data?.result.id}
                      price={price}
                      name={name}
                      description={description}
                      default_cleaning_method={default_cleaning_method}
                      refetch={refetch}
                    />
                    <DeleteModal
                      toastMessage="Item deleted successfully"
                      btnLabel='Delete'
                      title="Delete Confirmation"
                      description={`Are you sure you want to Delete this Item (${name})?`}
                      refetch={refetch}
                      url={`${item}/${id}`}/>
                  </div>}
                  />
                </tr>);
              },)}
              {data?.result.items?.length === 0 && (
                <tr>
                  <TableData data=' No Data' classes="text-center p-4 " colspan={7} noBold={true}/>
                </tr>
              )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </>
  );

};

export default Item;
