import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useBoolean } from '@storyofams/react-helpers';

export default function Home() {
  const [isOpen, { toggle }] = useBoolean(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>AMS helpers example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the{' '}
          <a href="https://github.com/storyofams/ams-helpers">
            AMS helpers example!
          </a>
        </h1>

        <div>
          <p>{isOpen ? 'open' : 'closed'}</p>
          <button onClick={toggle}>Toggle</button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
