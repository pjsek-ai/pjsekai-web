import Head from 'next/head';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Home({ domain, events }) {

  return (
    <div>
      <Head>
        <title>Project Sekai</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <List component='nav'>
        <Link href='/events' passHref>
          <ListItem button component='a'>
            <ListItemText primary='Events' />
          </ListItem>
        </Link>
        <Link href='/assets' passHref>
          <ListItem button component='a'>
            <ListItemText primary='Assets' />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}