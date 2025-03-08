import {useState} from "react";
import {token} from "@/lib/token/Token";


function usePost(url: string) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: any } | null>(null);
  const postData = async (dataValue: {}) => {
    setLoading(true);
    setErrors(null);
    try {
      const response = await fetch(url, {
        method: "POST", headers: {
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

  return {postData, loading, errors};
}

export default usePost;
