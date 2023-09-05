import css from './DataTable.module.css';

export default function DataTable({ users }) {
  console.log('DataTable render', users);
  return (
    <div className={css.tableWrapper}>
      <table>
        <thead className={css.tHeadStyle}>
          <tr>
            <th>№:</th>
            <th>Name:</th>
            <th>Email:</th>
            <th>City:</th>
            <th>Phone number:</th>
            <th>Website:</th>
            <th>Company name:</th>
          </tr>
        </thead>
        <tbody className={css.tBodyStyle}>
          {users.map((user) => {
            const {
              id,
              name,
              email,
              address: { city },
              phone,
              website,
              company: { name: cName },
            } = user;

            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                  <a href={`mailto:${email}`}>{email}</a>
                </td>
                <td>{city}</td>
                <td>
                  <a href={`tel:${phone}`}>{phone}</a>
                </td>
                <td>
                  <a href={`${website}`}>{website}</a>
                </td>
                <td>{cName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
