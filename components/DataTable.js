import { useState } from 'react';
import css from './DataTable.module.css';
import DataInfo from './DataInfo';
import DataPosts from './DataPosts';
import OnMountFetch from './OnMountFetch';
import { fetchWrapper } from '../data-fetch/fetchWrapper';

export default function DataTable({ users }) {
  const [userId, setUserId] = useState(null),
    [displayPosts, setDisplayPosts] = useState(null),
    showPostsClick = () => {
      console.log('Posts render');
      setDisplayPosts('_');
    };

  function UserInfoComponent({ data }) {
    return (
      <DataInfo user={data} onClick={showPostsClick} />
    );
  }

  function UserPostsComponent({ data }) {
    return <DataPosts posts={data} userId={userId} />;
  }
  console.log('DataTable render', users);

  return (
    <>
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
                <tr
                  key={id}
                  className={css.userRow}
                  onClick={() => {
                    setUserId(id);
                    setDisplayPosts(null);
                  }}
                >
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

      <OnMountFetch
        fetchWrap={fetchWrapper}
        path={`/users/${userId}`}
        ComponentName={UserInfoComponent}
        isActive={userId}
      />

      <OnMountFetch
        fetchWrap={fetchWrapper}
        path={`/users/${userId}/posts`}
        ComponentName={UserPostsComponent}
        isActive={displayPosts}
      />
    </>
  );
}
