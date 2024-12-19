import { useState } from "react";
import { token } from "@/lib/token/Token";
import toast from "react-hot-toast";

function useCreateArea(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addArea = async (dataValue: {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataValue),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Error =>", data);
        setError(data.errors?.name || data.message || "Failed to save city");
      }

      return data.result;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addArea, loading, error };
}

export default useCreateArea;
