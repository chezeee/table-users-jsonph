import css from './DataTable.module.css';
import ActionBtn from './ActionBtn';

export default function DataTable({
  users,
  dataUpdateFn,
  sortDirection,
  columns,
}) {
  console.count('Table render');
  console.log('sortDirection: ', sortDirection);
  return (
    <>
      <div
        className={css.tableWrapper}
      >
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
            {users.map((user) => (
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
