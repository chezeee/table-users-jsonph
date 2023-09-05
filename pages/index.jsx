import FetchUsers from '../components/FetchUsers';

export default function Home() {
  return (
    <section>
      <FetchUsers path="/users" />
    </section>
  );
}
