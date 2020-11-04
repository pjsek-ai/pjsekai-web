import Head from 'next/head';
import Link from 'next/link'

export default function Home({ domain, events }) {

  return (
    <div>
      <Head>
        <title>Project Sekai</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Link href="/events">
        <a>Events</a>
      </Link>
    </div>
  );
}