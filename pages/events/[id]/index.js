import Head from 'next/head';
import Link from 'next/link'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';

const getRequest = url => axios.get(url).then(r => r.data);

export async function getStaticPaths() {
  const domain = "api-pjsekai.erikchan002.com";
  const events = await getRequest(`https://${domain}/database/master/events?$sort[startAt]=-1`);
  return {
    paths: events.data.map(event => ({ params: { id: encodeURIComponent(event.id) } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const domain = "api-pjsekai.erikchan002.com";
  const eventId = context.params.id;
  const events = await getRequest(`https://${domain}/database/master/events?id=${eventId}`);

  return {
    props: {
      domain,
      events,
    }
  };
}

export default function Event({ domain, events }) {
  if (events.data.length <= 0) {
    return <Error statusCode={404} />;
  }
  const router = useRouter();
  const event = events.data[0];
  return (
    <div>
      <Head>
        <title>{event.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <button onClick={() => router.back()}>Back</button>
      <div>
        <b>{event.name}</b>
        <p>{moment(event.startAt).format('YYYY-MM-DD HH:mm')} --- {moment(event.aggregateAt).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      <Link href={{
        pathname: '/events/[id]/chart', query: { id: event.id }
      }}>
        <a>Score Chart</a>
      </Link>
    </div>
  );
}