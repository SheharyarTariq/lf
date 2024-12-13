import { useState } from "react";
import {token} from "@/lib/token/Token";

function useCreateServiceAvailability(url:string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);

    const addArea = async (dataValue: {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(
                    dataValue

                ),
            });
            const data = await response.json();
console.log(data)
            if (!response.ok) {
                throw new Error(data.errors?.postcode||data.message||'Failed to save city');
            }

            setLoading(false);
            return data.result;
        } catch (err) {
            setLoading(false);
            const errorMessage = err instanceof Error ?  err.message :"Something went wrong. Please try again.";
            setError(errorMessage);
            return null;
        }
    };

    return { addArea, loading, error };
}

export default useCreateServiceAvailability;
