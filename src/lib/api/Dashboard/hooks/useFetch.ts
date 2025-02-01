import {useEffect, useState} from 'react';
import {token} from "@/lib/token/Token";

interface FetchResult<T> {
  fetchData: T | null;
  errors: { [key: string]: any } | null,
  loading: boolean;
  refetch: () => void;
}

function useFetch<T>(url: string): FetchResult<T> {
  const [fetchData, setfetchData] = useState<T | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: any } | null>(null);
  const [loading, setLoading] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);

  const refetch = () => setRefetchKey((prev) => prev + 1);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setErrors(null);

      try {
        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.log('error', data);
          setErrors(data);
        }

        setfetchData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong...';
        console.log("Catch error in fetch hook", errorMessage)
        setErrors({message: errorMessage});
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [url, token, refetchKey]);

  return {
    fetchData,
    errors,
    loading,
    refetch,
  };
}

export default useFetch;
