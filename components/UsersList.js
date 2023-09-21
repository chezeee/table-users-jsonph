import { useState } from 'react';
import DataTable from './DataTable';
import DataInfo from './DataInfo';
import DataPosts from './DataPosts';
import { fetchWrapper } from './data-fetch/fetchWrapper';
import OnMountFetch from './OnMountFetch';
import { columns } from './data-type/users';
import EditForm from './EditForm';

export default function UsersList({ path }) {
  const [userId, setUserId] = useState(null),
    [displayPosts, setDisplayPosts] = useState(null),
    showUserInfoClick = (id) => {
      setUserId(id);
      setDisplayPosts(null);
    },
    showPostsClick = () => {
      setDisplayPosts('_');
    },
    hideInfoWindow = () => {
      setUserId(null);
    };

  function UsersTableComponent({
    data,
    dataUpdateFn,
    sortDirection,
    columns,
    editedId,
    setValues,
    editedValues,
  }) {
    return (
      <DataTable
        users={data}
        dataUpdateFn={dataUpdateFn}
        sortDirection={sortDirection}
        columns={columns}
        hideInfoWindow={hideInfoWindow}
        editedId={editedId}
      >
        <EditForm
          columns={columns}
          dataUpdateFn={dataUpdateFn}
          setValues={setValues}
          editedValues={editedValues}
        />
      </DataTable>
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
        hideInfoWindow={hideInfoWindow}
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
