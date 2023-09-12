import { useState } from 'react';
import DataTable from './DataTable';
import DataInfo from './DataInfo';
import DataPosts from './DataPosts';
import { fetchWrapper } from '../data-fetch/fetchWrapper';
import OnMountFetch from './OnMountFetch';

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

  function UsersTableComponent({ data }) {
    return (
      <DataTable
        users={data}
        showUserInfoClick={showUserInfoClick}
      />
    );
  }

  function UserInfoComponent({ data }) {
    return (
      <DataInfo user={data} showPostsClick={showPostsClick} />
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
      />

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
