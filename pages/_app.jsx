import css from '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <header></header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer></footer>
    </>
  );
}
