import { Alert } from 'react-native';
import { useEffect, useState } from 'react';

const useAppwrite = (fn: () => Promise<any>) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
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

  return { data, loading, refetch, setData };
};

export default useAppwrite;
