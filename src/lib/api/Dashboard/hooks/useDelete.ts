import {useState} from "react";
import {token} from "@/lib/token/Token";

export default function useDelete(url: string) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: any } | null>(null);

  const deleteData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      console.log('response', data)
      if (!response.ok) {
        // setErrors()
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

  return {deleteData, loading, errors};
}
