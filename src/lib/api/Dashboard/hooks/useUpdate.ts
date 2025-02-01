import {useState} from "react";
import {token} from "@/lib/token/Token";
import toast from "react-hot-toast";

function useUpdate(url: string) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: any } | null>(null);

  const updateData = async (dataValue: {}) => {
    setLoading(true);
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
        console.log("Error =>", data);
        setErrors(data.errors)
      }
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors({message: errorMessage});
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {updateData, loading, errors};
}

export default useUpdate;
