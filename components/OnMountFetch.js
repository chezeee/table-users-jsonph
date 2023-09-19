import { useState, useEffect } from 'react';

export default function OnMountFetch({
  fetchWrap,
  path,
  ComponentName,
  isActive = '_',
  onClick,
  columns = [],
}) {
  const [data, setData] = useState(null),
    [error, setError] = useState(null),
    [sortDirection, setSortDirection] = useState(null);

  function dataUpdateFn(event) {
    const eventSource = event.target.closest(
      'button[data-id][data-action]'
    );
    if (eventSource) {
      const { id, action } = eventSource.dataset;

      switch (action) {
        case 'info':
          onClick(id);
          return;
        case 'delete':
          setData((oldData) =>
            oldData.filter((el) => +el.id !== +id)
          );
          return;
        case 'post':
          onClick();
          return;
      }
      return;
    }
    const th = event.target.closest('thead th');
    if (th) {
      let newSortNumber;
      if (Math.abs(sortDirection) === 1 + th.cellIndex) {
        newSortNumber = -sortDirection;
      } else {
        newSortNumber = 1 + th.cellIndex;
      }

      const { getDataVal } =
          columns[Math.abs(newSortNumber) - 1],
        sorted = data.toSorted((a, b) => {
          if ('string' === typeof getDataVal(a)) {
            return getDataVal(a).localeCompare(
              getDataVal(b)
            );
          }
          if ('number' === typeof getDataVal(a)) {
            return getDataVal(a) - getDataVal(b);
          }
          return 0;
        });

      if (newSortNumber < 0) {
        sorted.reverse();
      }
      setSortDirection(newSortNumber);
      setData(sorted);
    }
  }

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
    return (
      <ComponentName
        data={data}
        dataUpdateFn={dataUpdateFn}
        sortDirection={sortDirection}
        columns={columns}
      />
    );
  }
}
