import toast from "react-hot-toast";
import {useState} from "react";
import {token} from "@/lib/token/Token";

export default function useDeleteArea(label: string, url: string) {
  const [loading, setLoading] = useState(false);

  const deleteArea = async () => {
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

      if (response.ok) {
        toast.success(` ${label} deleted successfully!`, {position: "bottom-center"});
      } else {

        toast.error(`Failed to delete ${label}`, {position: "bottom-center"});
      }
    } catch (error) {
      toast.error("An unexpected error occurred while deleting the area.", {position: "bottom-center"});
    } finally {
      setLoading(false);
    }
  };

  return {deleteArea, loading};
}
