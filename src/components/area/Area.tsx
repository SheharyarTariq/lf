import React, {useState} from "react";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {CreateArea} from "@/components/area/CreateArea";
import useFetch from "@/lib/api/Dashboard/hooks/useFetch";
import Postcode from "@/components/postcode/Postcode";
import {TableData} from "@/lib/common/TableData";
import {
  handleGetAllPostCodesClose,
  handleGetAllPostCodesOpen,
  handleGetAllTimeSlotsClose,
  handleGetAllTimeSlotsOpen,
  handleGetPostCodes,
  handleGetTimeSlots
} from "@/lib/common/Dropdown";
import Slot from "@/components/slot/Slot";
import DeleteModal from "@/lib/common/DeleteModal";
import {AreaProps} from "@/components/area/types";
import {area} from "@/api";
import {Link} from "react-router-dom";
import CommonButtonWhite from "@/lib/common/CommonButtonWhite";
import Arrow from "@/lib/common/Arrow";

export const Area: React.FC = () => {
  const {fetchData: data, errors: fetchAreaErrors, loading: fetchAreaLoading, refetch} = useFetch<any>(`${area}`);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean; }>({});
  const [openTimeDropdowns, setOpenTimeDropdowns] = useState<{ [key: string]: boolean; }>({});
  const [isOpenAllPostcodeDropdowns, setIsOpenAllPostcodeDropdowns] = useState(false);
  const [isOpenAllTimeSlotDropdowns, setIsOpenAllTimeSlotDropdowns] = useState(false);
  let toggle = true;
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white" className="flex items-center">
            Area
            <span className="ml-auto">
              {!fetchAreaErrors && (
                <CreateArea
                  refetch={refetch}
                />)}
             </span>
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
            <tr>
              {["Area", <span>Post Codes&nbsp;
                {isOpenAllPostcodeDropdowns ? (<i onClick={() => {
                    handleGetAllPostCodesOpen({data, setIsOpenAllPostcodeDropdowns, setOpenDropdowns, toggle})
                  }}
                                                  className="fa-solid fa-caret-up cursor-pointer"></i>) :
                  (<i onClick={() => {
                    toggle = isOpenAllTimeSlotDropdowns
                    handleGetAllTimeSlotsOpen({data, setIsOpenAllTimeSlotDropdowns, setOpenTimeDropdowns, toggle});
                    toggle = true;
                    handleGetAllPostCodesClose({
                      data,
                      setIsOpenAllPostcodeDropdowns,
                      setOpenDropdowns,
                      toggle
                    })
                  }}
                      className="fa-solid fa-caret-down cursor-pointer"/>)
                }</span>,
                <span>Time Slot {isOpenAllTimeSlotDropdowns ?
                  (<i
                    onClick={() => {
                      handleGetAllTimeSlotsOpen({data, setIsOpenAllTimeSlotDropdowns, setOpenTimeDropdowns, toggle});
                    }}
                    className="fa-solid fa-caret-up cursor-pointer"/>) :
                  (<i onClick={() => {
                    toggle = isOpenAllPostcodeDropdowns
                    handleGetAllPostCodesOpen({data, setIsOpenAllPostcodeDropdowns, setOpenDropdowns, toggle})
                    toggle = true;
                    handleGetAllTimeSlotsClose({data, setIsOpenAllTimeSlotDropdowns, setOpenTimeDropdowns, toggle})
                  }}
                      className="fa-solid fa-caret-down cursor-pointer"/>)}</span>, "Action"].map((el, idx) => (
                <th key={idx} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{el}
                  </Typography>
                </th>)
              )
              }
            </tr>
            </thead>
            <tbody>
            {fetchAreaErrors ? (
              <tr>
                <TableData colspan={4} data={fetchAreaErrors.message} classes="text-center p-4 " textColor="red"/>
              </tr>
            ) : (
              data?.result?.map(({name, id, post_codes, slot_availabilities}: AreaProps, key: number) => {
                const className = `py-3 px-5 ${key === data.result.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                return (
                  <React.Fragment key={id}>
                    <tr>
                      <TableData classes={className} data={name}/>

                      <TableData
                        classes={className}
                        data={
                          openDropdowns[id] ? (
                            <i className="fa-solid fa-caret-up cursor-pointer"
                               onClick={() => handleGetPostCodes({id, setOpenDropdowns})}/>
                          ) : (
                            <i className="fa-solid fa-caret-down cursor-pointer"
                               onClick={() => handleGetPostCodes({id, setOpenDropdowns})}/>
                          )
                        }
                      />
                      <TableData
                        classes={className}
                        data={
                          openTimeDropdowns[id] ? (
                            <i className="fa-solid fa-caret-up cursor-pointer"
                               onClick={() => handleGetTimeSlots({id, setOpenTimeDropdowns})}/>
                          ) : (
                            <i className="fa-solid fa-caret-down cursor-pointer"
                               onClick={() => handleGetTimeSlots({id, setOpenTimeDropdowns})}/>
                          )
                        }
                      />
                      <TableData classes={className}
                                 data={
                                   <Link to={`${id}`}>
                                     <CommonButtonWhite>
                                       <Arrow/>
                                     </CommonButtonWhite>
                                   </Link>
                                 }/>

                    </tr>
                    {openDropdowns[id] && (
                      <tr>
                        <TableData colspan={4} data={""} classes="p-0"/>
                      </tr>
                    )}
                    {openTimeDropdowns[id] && (
                      <tr>
                        <TableData colspan={4} data={<Slot areaName={name} areaId={`${id}`}
                                                           slot_availabilities={slot_availabilities}
                                                           refetch={refetch}/>} classes="p-0"/>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
            {fetchAreaLoading && (
              <tr>
                <TableData data="Loading..." classes="text-center p-4 " colspan={4} noBold={true}/>
              </tr>
            )}
            {data?.result?.length === 0 && (
              <tr>
                <TableData data="No Data" classes="text-center p-4 " colspan={4} noBold={true}/>
              </tr>
            )}
            </tbody>

          </table>
        </CardBody>
      </Card>
    </div>);
};

export default Area;
