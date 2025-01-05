import {useState} from "react";
import {token} from "@/lib/token/Token";
import toast from "react-hot-toast";

function useUpdateArea(url: string) {
    const [loading, setLoading] = useState(false);

    const updateArea = async (dataValue: {}) => {
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
                throw new Error(data.errors?.name || data.message || "Failed to save city");
            }

            return data.result;
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Something went wrong. Please try again.";
            toast.error(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {updateArea, loading};
}

export default useUpdateArea;
