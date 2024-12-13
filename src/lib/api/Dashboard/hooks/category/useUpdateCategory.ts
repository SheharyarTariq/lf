import {useState} from "react";
import {token} from "@/lib/token/Token";

function useUpdateCategory(url:string){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Record<string, string[]>>({});

    const updateArea=async(dataValue:{}) => {
         setLoading(true);
         setError({});
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
                 setError(data.errors||{});

                 throw new Error(data.errors?.name||'Failed to save city');

             }

             setLoading(false);

             return data.result;
         } catch (err) {
             setLoading(false);
             const errorMessage = err instanceof Error ?  err.message :"Something went wrong. Please try again.";
             console.log(errorMessage||err);
             return null;
         }
     };
     return {updateArea,loading, error};

}
export default useUpdateCategory;