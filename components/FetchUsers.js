import DataTable from './DataTable';
import { useState, useEffect } from 'react';

export default function FetchUsers({ path }) {
  const [users, setUsers] = useState(null),
    [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com' + path
        );
        if (!response.ok) {
          throw new Error('Status ' + response.status);
        }
        setUsers(await response.json());
        setError(null);
      } catch (err) {
        setError(err);
      }
    }
    fetchUsers();
  }, [path]);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (users) {
    console.log('FetchUsers render', users);
    return (
      <>
        <DataTable users={users} />
      </>
    );
  }
}
