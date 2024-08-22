import { Alert } from 'react-native';
import { useEffect, useState } from 'react';

type FetchFn<T> = () => Promise<T>;

interface UseAppwriteOptions<T> {
  fetchFn: FetchFn<T>;
  setFn?: (data: T) => void;
}

const useAppwrite = <T>({ fetchFn, setFn }: UseAppwriteOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchFn();
      setData(res);
      if (setFn) setFn(res);
    } catch (error) {
      Alert.alert('Error', error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
