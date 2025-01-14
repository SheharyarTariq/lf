import React from "react";
import {Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";
import {TableData} from "@/lib/common/TableData";
import IsActiveSlotButtom from "@/components/slot/IsActiveSlotButtom";
import {SlotProps} from "@/pages/dashboard/types";


const Slot: React.FC<SlotProps> = ({areaId, areaName, slot_availabilities, refetch,}) => {


    return (<div className="mt-12 mb-8 flex flex-col  px-16">
        <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6 text-center">
                <Typography variant="h6" color="white">
                    {areaName} Week Days
                </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto">
                    <thead>
                    <tr>
                        {["Weekdays", <span className=" ">Time Slot</span>,].map((el, idx) => (
                            <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                <Typography
                                    variant="small"
                                    className={`text-[11px] font-bold uppercase text-blue-gray-400 ${idx === 1 ? 'text-center' : ''}`}
                                >
                                    {el}
                                </Typography>
                            </th>))}
                    </tr>
                    </thead>
                    <tbody>


                    {slot_availabilities?.map(({weekday, slots}, key: number,) => {
                        const className = `py-3 px-5 ${key === slot_availabilities?.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                        return (<tr className="w-full table-auto">
                                <TableData classes={`${className}`}
                                           data={weekday}></TableData>
                                <TableData classes={`${className} ml-auto text-center`}
                                           data={slots?.map(({slot, id, is_active}) => {
                                               return (<span
                                                   className="px-2"
                                                   key={id}>  <IsActiveSlotButtom
                                                   slot={`${slot}`}
                                                   id={id}
                                                   refetch={refetch}
                                                   isActive={is_active}/>

                                                    </span>);
                                           },)}/>
                            </tr>

                        );
                    },)}

                    </tbody>
                </table>
            </CardBody>
        </Card>
    </div>);
};

export default Slot;
