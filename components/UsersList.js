import { useState } from 'react';
import DataTable from './DataTable';
import DataInfo from './DataInfo';
import DataPosts from './DataPosts';
import { fetchWrapper } from './data-fetch/fetchWrapper';
import OnMountFetch from './OnMountFetch';
import { columns } from './data-type/users';

export default function UsersList({ path }) {
  const [userId, setUserId] = useState(null),
    [displayPosts, setDisplayPosts] = useState(null),
    showUserInfoClick = (id) => {
      setUserId(id);
      setDisplayPosts(null);
    },
    showPostsClick = () => {
      setDisplayPosts('_');
    };

  function UsersTableComponent({
    data,
    dataUpdateFn,
    sortDirection,
    columns,
  }) {
    return (
      <DataTable
        users={data}
        dataUpdateFn={dataUpdateFn}
        sortDirection={sortDirection}
        columns={columns}
      />
    );
  }

  function UserInfoComponent({ data, dataUpdateFn }) {
    return (
      <DataInfo user={data} dataUpdateFn={dataUpdateFn} />
    );
  }

  function UserPostsComponent({ data }) {
    return <DataPosts posts={data} userId={userId} />;
  }

  return (
    <>
      <OnMountFetch
        fetchWrap={fetchWrapper}
        path={path}
        ComponentName={UsersTableComponent}
        onClick={showUserInfoClick}
        columns={columns}
      />

      <OnMountFetch
        fetchWrap={fetchWrapper}
        path={`/users/${userId}`}
        ComponentName={UserInfoComponent}
        isActive={userId}
        onClick={showPostsClick}
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
