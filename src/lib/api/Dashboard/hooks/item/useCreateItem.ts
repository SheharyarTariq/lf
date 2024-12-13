import { useState } from "react";
import { token } from "@/lib/token/Token";

function useCreateItem(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string[]>>({});

  const addArea = async (dataValue: {}) => {
    setLoading(true);

    setError({});
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
      console.log("data=>", dataValue);

      console.log("res=>", data);
      if (!response.ok) {
        setError(data.errors);

        throw new Error(data.errors || "Failed to save city");
      }

      setLoading(false);
      return data.result;
    } catch (err) {
      setLoading(false);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      return null;
    }
  };

  return { addArea, loading, error };
}

export default useCreateItem;
