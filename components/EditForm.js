import { useState } from 'react';
import ActionBtn from './ActionBtn';
import css from './EditForm.module.css';

export default function EditForm({
  columns,
  dataUpdateFn,
  setValues,
  editedValues,
}) {
  return (
    <tr className={css.editRow}>
      {columns.map(
        ({ title, getDataVal, setDataVal }, index) => (
          <td key={title}>
            {setDataVal ? (
              <input
                value={editedValues[index]}
                onInput={(event) => {
                  setValues((old) =>
                    old.with(index, event.target.value)
                  );
                }}
              />
            ) : (
              'Data is not editable'
            )}
          </td>
        )
      )}
      <td>
        <ActionBtn
          text="✔️"
          id={Math.random()}
          action={'ok'}
          onClick={dataUpdateFn}
        />
        <ActionBtn
          text="🗙"
          id={Math.random()}
          action={'cancel'}
          onClick={dataUpdateFn}
        />
      </td>
    </tr>
  );
}
