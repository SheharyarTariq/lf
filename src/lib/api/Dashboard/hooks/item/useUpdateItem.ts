import { useState } from "react";
import { token } from "@/lib/token/Token";
import toast from "react-hot-toast";

function useUpdateItem(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string[]>>({});

  const updateArea = async (dataValue: {}) => {
    setLoading(true);
    setError({});
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataValue),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.errors || {});

        throw new Error(data.errors?.name || data.message);
      }

      setLoading(false);

      return data.result;
    } catch (err) {
      setLoading(false);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      toast.error(errorMessage);
      return null;
    }
  };
  return { updateArea, loading, error };
}

export default useUpdateItem;
