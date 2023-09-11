import UsersList from '../components/UsersList';

export default function Home() {
  return (
    <section className="mainContainer">
      <UsersList path="/users" />
    </section>
  );
}
