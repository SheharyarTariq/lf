import React, {useEffect, useState} from "react";
import {Switch} from "@material-tailwind/react";
import useUpdateServiceAvailability from "@/lib/api/Dashboard/hooks/serviceAvailability/useUpdateServiceAvailability";
import toast from "react-hot-toast";
import {config} from "@/config";
import CommonToaster from "@/lib/common/CommonToaster";
import useUpdate from "@/lib/api/Dashboard/hooks/useUpdate";

interface UpdateServiceAvailabilityProps {
  is_active: boolean;
  id: string;
  refetch: Function;
};

const SwitchBtn: React.FC<UpdateServiceAvailabilityProps> = ({is_active, id, refetch}) => {

  const urlUpdatePostCode = `${config.BASE_URL}/post-codes/${id}/change-state`;
  const [inputValue, setInputValue] = useState<boolean>(is_active || false);
  const {
    updateData: updateServiceAvailability,
    loading: updateLoading,
    errors: updateError
  } = useUpdate(urlUpdatePostCode);

  useEffect(() => {
    setInputValue(is_active);
  }, [is_active]);

  async function handleToggle() {
    const newState = !inputValue;
    const dataValue = {is_active: newState};

    const createOrUpdateServiceAvailability = await updateServiceAvailability(dataValue);

    if (createOrUpdateServiceAvailability?.success === true) {
      CommonToaster({
        toastName: 'successToast',
        toastMessage: createOrUpdateServiceAvailability?.message || "Postcode updated successfully"
      });
      refetch();
    } else if (createOrUpdateServiceAvailability?.success === false) {
      CommonToaster({toastName: 'dangerToast', toastMessage: "Failed to update postcode"});

    } else if (updateError?.message) {
      CommonToaster({toastName: 'dangerToast', toastMessage: updateError?.message});
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
