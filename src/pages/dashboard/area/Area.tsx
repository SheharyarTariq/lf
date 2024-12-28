import React, {useState} from "react";
import {Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";
import {CreateArea} from "@/components/area/CreateArea";
import {DeleteArea} from "@/components/area/DeleteArea";
import useFetch from "@/lib/api/Dashboard/hooks/area/useFetchAreas";
import ServiceAvailability from "@/pages/dashboard/serviceAvailability/ServiceAvailability";
import {TableData} from "@/lib/common/TableData";
import {
    handleGetAllPostCodesClose,
    handleGetAllPostCodesOpen,
    handleGetPostCodes,
    handleGetTimeSlots
} from "@/lib/common/Dropdown";
import Slot from "@/pages/dashboard/slot/Slot";
import DeleteModal from "@/lib/common/DeleteModal";

type Props = {
    name: string,
    id: number,
    service_availabilities: [],
    slot_availabilities: [{
        weekday: string
        slots: [{
            slot: string
            id: string
            is_active: boolean
        }]
    }
    ],

}
export const Area = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const url = `${BASE_URL}/areas`;
    const {data, error, loading, refetch} = useFetch<any>(url);
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean; }>({});
    const [openTimeDropdowns, setOpenTimeDropdowns] = useState<{ [key: string]: boolean; }>({});

    const [openAllDropdowns, setOpenAllDropdowns] = useState(false);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white" className="flex items-center">
                        <div className="flex items-center">
                            Area{" "}

                        </div>
                        <span className="ml-auto">
        {!error && (
            <CreateArea
                dailogLabel={null}
                name={null}
                id={null}
                refetch={refetch}
            />
        )}
    </span>
                    </Typography>

                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full table-auto">
                        <thead>
                        <tr>
                            {["Area", <span className={`ml-9`}>Action</span>, <div>Post Codes {openAllDropdowns ? (
                                <i
                                    onClick={() =>
                                        handleGetAllPostCodesOpen({
                                            data,
                                            setOpenAllDropdowns,
                                            setOpenDropdowns,
                                        })
                                    }
                                    className="fa-solid fa-caret-up cursor-pointer"
                                />
                            ) : (
                                <i
                                    className="fa-solid fa-caret-down cursor-pointer"
                                    onClick={() =>
                                        handleGetAllPostCodesClose({
                                            data,
                                            setOpenAllDropdowns,
                                            setOpenDropdowns,
                                        })
                                    }
                                />
                            )}</div>, "Time Slot"
                            ].map((el, idx) => (
                                <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {error ? (
                            <tr>
                                <TableData colspan={4} data={error} classes="text-center p-4 " textColor='red'/>
                            </tr>
                        ) : (
                            data?.result?.map(({
                                                   name,
                                                   id,
                                                   service_availabilities,
                                                   slot_availabilities
                                               }: Props, key: number,) => {
                                    const className = `py-3 px-5 ${
                                        key === data.result.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                    }`;

                                    return (
                                        <React.Fragment key={id}>
                                            <tr>
                                                <TableData classes={className} data={name}/>
                                                <TableData classes={className} data={<div className={`flex`}>

                                                    <CreateArea dailogLabel="Edit" name={name} id={`${id}`}
                                                                refetch={refetch}/>
                                                    <DeleteModal btnLabel='Delete'
                                                                 title="Delete Confirmation"
                                                                 description={`Are you sure you want to Delete this Area (${name})?`}
                                                                 refetch={refetch}
                                                                 url={`${url}/${id}`}/>
                                                </div>}/>

                                                <TableData classes={className} data={openDropdowns[id] ? (
                                                    <i className="fa-solid fa-caret-up cursor-pointer"
                                                       onClick={() => handleGetPostCodes({id, setOpenDropdowns})}/>) : (
                                                    <i className="fa-solid fa-caret-down cursor-pointer"
                                                       onClick={() => handleGetPostCodes({id, setOpenDropdowns})}/>)}/>

                                                <TableData classes={className} data={openTimeDropdowns[id] ? (
                                                    <i className="fa-solid fa-caret-up cursor-pointer"
                                                       onClick={() => {
                                                           handleGetTimeSlots({id, setOpenTimeDropdowns})
                                                       }}/>) : (
                                                    <i className="fa-solid fa-caret-down cursor-pointer"
                                                       onClick={() => {
                                                           handleGetAllPostCodesOpen({
                                                               data,
                                                               setOpenAllDropdowns,
                                                               setOpenDropdowns
                                                           })
                                                           handleGetTimeSlots({id, setOpenTimeDropdowns})
                                                       }}/>)}/>
                                            </tr>

                                            {openDropdowns[id] && (
                                                <tr>
                                                    <TableData colspan={4}
                                                               data={<ServiceAvailability
                                                                   areaName={name}
                                                                   areaId={`${id}`}
                                                                   service_availabilities={service_availabilities}
                                                                   refetch={refetch}
                                                               />} classes="p-0"/>

                                                </tr>
                                            )} {openTimeDropdowns[id] && (
                                            <tr>
                                                <TableData colspan={4}
                                                           data={<Slot
                                                               areaName={name}
                                                               areaId={`${id}`}
                                                               slot_availabilities={slot_availabilities}
                                                               refetch={refetch}
                                                           />} classes="p-0"/>

                                            </tr>
                                        )}
                                        </React.Fragment>
                                    );
                                },
                            )
                        )}
                        {loading && (
                            <tr>
                                <TableData data=' Loading...' classes="text-center p-4 " colspan={4} noBold={true}/>
                            </tr>
                        )}
                        {data?.result?.length === 0 && (
                            <tr>
                                <TableData data=' No Data' classes="text-center p-4 " colspan={4} noBold={true}/>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
};

export default Area;
