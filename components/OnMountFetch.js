import { useState, useEffect } from 'react';

export default function OnMountFetch({
  fetchWrap,
  path,
  ComponentName,
  isActive = '_',
}) {
  const [data, setData] = useState(null),
    [error, setError] = useState(null);

  useEffect(() => {
    async function ExecutingRequest() {
      try {
        setData(await fetchWrap(path));
        setError(null);
      } catch (err) {
        setError(err);
      }
    }
    isActive && ExecutingRequest();
  }, [fetchWrap, path, isActive]);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (data && isActive) {
    return <ComponentName data={data} />;
  }
}
