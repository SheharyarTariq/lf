import React, { useEffect, useState } from "react";
import { Switch } from "@material-tailwind/react";
import useUpdateServiceAvailability from "@/lib/api/Dashboard/hooks/serviceAvailability/useUpdateServiceAvailability";
import toast from "react-hot-toast";

type Props = {
  is_active: boolean;
  id: string;
  refetch: Function;
};

const SwitchBtn: React.FC<Props> = ({ is_active, id, refetch }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const urlUpdatePostCode = `${BASE_URL}/service-availabilities/${id}/change-state`;
  const [inputValue, setInputValue] = useState<boolean>(is_active || false);
  const {
    updateArea,
    loading: updateLoading,
    error: updateError,
  } = useUpdateServiceAvailability(urlUpdatePostCode);

  useEffect(() => {
    setInputValue(is_active);
  }, [is_active]);

  async function handleToggle() {
    const newState = !inputValue;
    const dataValue = { is_active: newState };

    const newData = await updateArea(dataValue);

    if (newData) {
      setInputValue(newState);
      toast.success(`Post Code updated successfully!`, {
        position: "bottom-center",
      });
      refetch();
    } else {
      toast.error(`Failed to update Post Code`, { position: "bottom-center" });
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
