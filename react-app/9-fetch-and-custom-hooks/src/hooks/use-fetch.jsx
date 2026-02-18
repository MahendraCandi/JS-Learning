import {useEffect, useState} from "react";

export function useFetch(initialData, fetchFunction) {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setData(await fetchFunction());
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    }

    fetchData();
  }, []);

  return {data, setData, isLoading, error};
}
