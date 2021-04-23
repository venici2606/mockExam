import { useEffect, useState } from "react";

export function useLoading(loadingFunction, deps = []) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  async function reload() {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      setData(await loadingFunction());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(reload, deps);

  return { loading, error, data, reload };
}
