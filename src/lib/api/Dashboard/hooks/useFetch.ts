import {useEffect, useState} from 'react';
import {token} from "@/lib/token/Token";
import {useNavigate} from "react-router-dom";

interface FetchResult<T> {
  fetchData: T | null;
  errors: { [key: string]: any } | null,
  loading: boolean;
  refetch: () => void;

}

function useFetch<T>(url: string): FetchResult<T> {
  const [fetchData, setfetchData] = useState<T | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: any } | null>(null);
  const [err, setErr] = useState<{ [key: string]: any } | null>(null);
  const [loading, setLoading] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);
  const navigator = useNavigate();
  const refetch = () => setRefetchKey((prev) => prev + 1);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setErrors(null);
      setErr(null);

      try {
        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('authToken');
          navigator("/auth/sign-in");
        }

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
