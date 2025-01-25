import {useEffect, useState} from 'react';
import {token} from "@/lib/token/Token";

interface FetchResult<T> {
  fetchData: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

function useFetch<T>(url: string): FetchResult<T> {
  const [fetchData, setfetchData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);

  const refetch = () => setRefetchKey((prev) => prev + 1);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const parsedData = await response.json();
        console.log('parsedData', parsedData);
        if (!response.ok) {
          console.log('error', parsedData);
          throw new Error(parsedData.errors?.name || parsedData.message || 'Failed to fetch data');
        }

        setfetchData(parsedData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong...';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [url, token, refetchKey]);

  return {
    fetchData,
    error,
    loading,
    refetch,
  };
}

export default useFetch;
