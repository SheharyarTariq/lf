import React from "react";
import DeleteModal from "@/lib/common/DeleteModal";
import {useParams} from "react-router-dom";
import useFetch from "@/lib/api/Dashboard/hooks/useFetch";
import {area} from "@/api";
import {CreateArea} from "@/components/area/CreateArea";
import PostcodeCard from "@/components/postcode/PostcodeCard";
import Slot from "@/components/slot/Slot";
import PostcodeTable from "@/components/postcode/PostcodeTable";

const Postcode: React.FC = () => {
  const {areaId} = useParams();
  const {fetchData: data, errors, loading, refetch} = useFetch<any>(`${area}/${areaId}`);
  return (
    <span className="space-y-12 flex flex-col ">
      <PostcodeCard data={data}>
        <CreateArea dailogLabel="Edit" name={data?.result?.name} id={`${data?.result.id}`} refetch={refetch}/>
          <DeleteModal
            toastMessage="Area Deleted Successfully"
            btnLabel="Delete"
            title="Delete Confirmation"
            description={`Are you sure you want to Delete this Area (${data?.result?.name})?`}
            refetch={refetch}
            url={`${area}/${data?.result?.id}`}
          />
      </PostcodeCard>
      <PostcodeTable data={data} refetch={refetch} loading={loading}/>
       <Slot
         loading={loading}
         areaName={data?.result?.name}
         slot_availabilities={data?.result?.slot_availabilities}
         refetch={refetch}/>
      </span>

  );
};

export default Postcode;
