import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const getRequest = url => axios.get(url).then(r => r.data);

export async function getServerSideProps(context) {
  const domain = "api-pjsekai.erikchan002.com";
  const events = await getRequest(`https://${domain}/database/master/events?$sort[startAt]=-1`);

  return {
    props: {
      domain,
      events,
    }
  };
}

export default function Events({ domain, events }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Events</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <button onClick={() => router.back()}>Back</button>
      <ul>
        {events.data.map(event =>
          <li key={event.id}>
            <Link href={{
              pathname: '/events/[id]', query: { id: event.id }
            }}>
              <a>{event.name}</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}