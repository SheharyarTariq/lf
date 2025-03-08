import React, {useEffect, useState} from "react";
import {Switch} from "@material-tailwind/react";
import {ErrorToast, SuccessToast} from "@/lib/common/CommonToaster";
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";
import {postcode} from "@/api";
import {UpdatePostcodeProps} from "@/components/postcode/types";

const SwitchBtn: React.FC<UpdatePostcodeProps> = ({is_active, id, refetch}) => {

  const urlUpdatePostCode = `${postcode}/${id}/change-state`;
  const [inputValue, setInputValue] = useState<boolean>(is_active || false);
  const {
    updateData: updateServiceAvailability, loading: updateLoading, errors: updateError
  } = useUpdate(urlUpdatePostCode);

  useEffect(() => {
    setInputValue(is_active);
  }, [is_active]);

  async function handleToggle() {

    const newState = !inputValue;
    const dataValue = {is_active: newState};

    const response = await updateServiceAvailability(dataValue);
    if (response?.success) {
      SuccessToast(response?.message || response?.result.is_active ? "Postcode activeted successfully" : "Postcode deactiveted successfully")
      refetch();
    } else if (!response?.success) {
      ErrorToast(response.message || "Failed to update postcode")

    } else if (updateError?.message) {
      ErrorToast(updateError.message || "Something went wrong, please try again")
    }
  }

  return (
    <>
      <Switch
        disabled={updateLoading}
        crossOrigin={`crossOrigin`}
        checked={inputValue}
        onChange={handleToggle}
      />
    </>
  );
};

export default SwitchBtn;
