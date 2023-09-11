import DataTable from './DataTable';
import { fetchWrapper } from '../data-fetch/fetchWrapper';
import OnMountFetch from './OnMountFetch';

function DataComponent({ data }) {
  return <DataTable users={data} />;
}

export default function UsersList({ path }) {
  return (
    <>
      <OnMountFetch
        fetchWrap={fetchWrapper}
        path={path}
        ComponentName={DataComponent}
      />
    </>
  );
}
