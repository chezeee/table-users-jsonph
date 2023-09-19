import css from './DataTable.module.css';
import ActionBtn from './ActionBtn';
import { useState } from 'react';

export default function DataTable({
  users,
  dataUpdateFn,
  sortDirection,
  columns,
}) {
  const [filterStr, setFilterStr] = useState('');

  function filterDataFn(elem) {
    if (!filterStr) return true;
    return columns
      .map(({ getDataVal }) => getDataVal(elem))
      .filter((x) => 'string' === typeof x)
      .some((x) =>
        x.toLowerCase().includes(filterStr.toLowerCase())
      );
  }

  return (
    <>
      <div className={css.tableWrapper}>
        <input
          value={filterStr}
          onInput={(event) =>
            setFilterStr(event.target.value)
          }
        />
        <table>
          <thead className={css.tHeadStyle}>
            <tr>
              {columns.map(({ title }, index) => (
                <th
                  key={title}
                  onClick={dataUpdateFn}
                  className={[
                    index === Math.abs(sortDirection) - 1
                      ? css.sort
                      : '',
                    index === Math.abs(sortDirection) - 1 &&
                    sortDirection < 0
                      ? css.desc
                      : '',
                  ].join(' ')}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={css.tBodyStyle}>
            {users.filter(filterDataFn).map((user) => (
              <tr key={user.id}>
                {columns.map(({ title, getDataVal }) => (
                  <td key={title}>{getDataVal(user)}</td>
                ))}
                <td className={css.tdBtnsWrapper}>
                  <ActionBtn
                    text="ℹ️"
                    id={user.id}
                    action={'info'}
                    onClick={dataUpdateFn}
                  />
                  <ActionBtn
                    text="❌"
                    id={user.id}
                    action={'delete'}
                    onClick={dataUpdateFn}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
