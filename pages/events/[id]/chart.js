import Head from 'next/head';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import useSWR from 'swr';
import moment from 'moment';
import { useState } from 'react';
import palette from 'google-palette';
import Error from 'next/error';
import { useRouter } from 'next/router';

const getRequest = url => axios.get(url).then(r => r.data);

export async function getServerSideProps(context) {
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

export default function Chart({ domain, events }) {
  if (events.data.length <= 0) {
    return <Error statusCode={404} />;
  }
  const router = useRouter();
  const event = events.data[0];
  const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000, 10000, 20000, 30000, 40000, 50000, 100000];
  const [hiddenIndexes, setHiddenIndexes] = useState(
    ranks.map((rank, index) => ({ rank, index }))
      .filter(({ rank, index }) => rank > 10)
      .map(({ rank, index }) => index)
  );
  const datasets = ranks.map(rank => ({
    rank,
    ...useSWR(`https://${domain}/database/event-scores/${event.id}?$sort[datetime]=1&$limit=-1&$select[]=score&$select[]=datetime&rank=${rank}`, getRequest)
  }))
    .filter(({ data, error }) => !error && data)
    .map(({ rank, data }, index) => {
      const color = '#' + palette('tol-rainbow', ranks.length)[ranks.length - index - 1];
      return {
        rank,
        label: `Rank ${rank}`,
        backgroundColor: color,
        borderColor: color,
        pointRadius: 0,
        fill: false,
        hidden: hiddenIndexes.includes(index),
        data: data.filter((e, i) => !(i % ((ranks.length - hiddenIndexes.length)))).map(datum => ({ x: datum.datetime, y: datum.score })),
      }
    });

  return (
    <div>
      <Head>
        <title>{event.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <button onClick={() => router.back()}>Back</button>
      <Line
        data={{ datasets }}
        options={{
          animation: {
            duration: 0 // general animation time
          },
          hover: {
            animationDuration: 0 // duration of animations when hovering an item
          },
          responsiveAnimationDuration: 0, // animation duration after a resize
          elements: {
            line: {
              tension: 0, // disables bezier curves
            },
          },
          tooltips: {
            mode: 'nearest',
            intersect: false,
          },
          legend: {
            onClick: (e, item) => {
              if (hiddenIndexes.includes(item.datasetIndex)) {
                setHiddenIndexes(hiddenIndexes.filter(i => i !== item.datasetIndex));
              }
              else {
                setHiddenIndexes([...hiddenIndexes, item.datasetIndex]);
              }
            },
          },
          scales: {
            xAxes: [{
              type: 'time',
              offset: true,
              time: {
                parser: 'MM/DD/YYYY HH:mm',
                tooltipFormat: 'll HH:mm'
              },
              ticks: {
                source: 'auto',
                autoSkip: true,
                autoSkipPadding: 8,
                sampleSize: 100,
                min: event.startAt,
                max: event.rankingAnnounceAt + 120000,
              },
              scaleLabel: {
                display: true,
                labelString: 'Time',
              },
            }],
          }
        }}
      />
    </div>
  );
}