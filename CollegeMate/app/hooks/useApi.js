import {useState} from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...agrs) => {
    setLoading(true);
    const response = await apiFunc(...agrs);
    setLoading(false);

    if (!response.ok) {
      return setError(true);
    }

    setError(false);
    setData(response.data);
  };

  return {
    request,
    error,
    data,
    loading,
  };
};
