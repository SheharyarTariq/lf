import {useState} from "react";
import {token} from "@/lib/token/Token";
function useUpdateServiceAvailability(url:string){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);

    const updateArea=async(dataValue:{}) => {
         setLoading(true);
         setError(null);
         try {
             const response = await fetch(url, {
                 method: "PUT",
                 headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
                     'Authorization': `Bearer ${token}`,
                 },
                 body: JSON.stringify(dataValue),
             });
             const data = await response.json();
             if (!response.ok) {
                 throw new Error(data.errors?.name||data.message);

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
     return {updateArea,loading, error};

}
export default useUpdateServiceAvailability;