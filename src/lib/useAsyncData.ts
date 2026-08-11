import { useCallback, useEffect, useRef, useState } from "react";

export function useAsyncData<T>(
  loader: () => Promise<T>,
  deps: unknown[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const requestId = useRef(0);

  const reload = useCallback(async () => {
    const id = ++requestId.current;
    setLoading(true);
    setError("");
    try {
      const result = await loader();
      // Ignore stale responses: only the latest request may update state.
      if (requestId.current === id) setData(result);
    } catch (err) {
      if (requestId.current === id) {
        console.error("Async data load error:", err);
        setError("Ma'lumotlarni yuklashda xatolik");
      }
    } finally {
      if (requestId.current === id) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, error, reload };
}
