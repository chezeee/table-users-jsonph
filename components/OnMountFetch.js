import { useState, useEffect } from 'react';

export default function OnMountFetch({
  fetchWrap,
  path,
  ComponentName,
  isActive = '_',
  onClick,
  columns = [],
  hideInfoWindow,
}) {
  const [data, setData] = useState(null),
    [error, setError] = useState(null),
    [sortDirection, setSortDirection] = useState(null),
    [editedId, setEditedId] = useState(null),
    [values, setValues] = useState(columns.map(() => ''));

  function setNewValues(values) {
    setValues(values);
  }

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
            oldData.filter(
              (el) => String(el.id) !== String(id)
            )
          );
          hideInfoWindow();
          return;
        case 'post':
          onClick();
          return;
        case 'edit':
          setEditedId(id);
          const index = data.findIndex(
            (obj) => String(obj.id) === String(id)
          );
          setValues(
            columns.map(({ setDataVal, getDataVal }) =>
              setDataVal ? getDataVal(data[index]) : ''
            )
          );
          hideInfoWindow();
          return;

        case 'cancel':
          setEditedId(null);
          setValues(columns.map(() => ''));
          hideInfoWindow();
          return;
        case 'ok':
          if (editedId) {
            const index = data.findIndex(
                (obj) => String(obj.id) === String(editedId)
              ),
              newObj = { ...data[index] };
            columns.forEach(({ setDataVal }, i) => {
              Object.assign(
                newObj,
                setDataVal?.(values[i])
              );
            });
            setData((old) => old.with(index, newObj));
          } else {
            const newObj = {
              id: data.length + 1,
              address: {},
              company: {},
            };
            columns.forEach(({ setDataVal }, index) => {
              Object.assign(
                newObj,
                setDataVal?.(values[index])
              );
            });
            setData(data.concat(newObj));
          }
          setEditedId(null);
          setValues(columns.map(() => ''));
          hideInfoWindow();
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
        editedId={editedId}
        setValues={setNewValues}
        editedValues={values}
      />
    );
  }
}
