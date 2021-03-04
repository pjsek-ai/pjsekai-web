import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SongCardSmall from 'components/Song/Cards/Small';
import Constants from 'lib/constants';

function SongList() {
  const itemPerLoad = 24;

  const history = useHistory();

  const [songs, setSongs] = useState({
    skip: 0,
    limit: 0,
  });
  useEffect(async () => {
    const response = await axios.get(`${Constants.API_BASE_URL}database/master/musics?$limit=${itemPerLoad}&&$sort[publishedAt]=-1&$sort[id]=-1`);
    setSongs(response.data);
  }, []);

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={async () => {
          const response = await axios.get(`${Constants.API_BASE_URL}database/master/musics?$limit=${itemPerLoad}&$sort[publishedAt]=-1&$sort[id]=-1&$skip=${songs.skip + songs.limit}`);
          setSongs(prevSongs => {
            const nextSongs = response.data;
            return {
              ...prevSongs,
              ...nextSongs,
              data: [...prevSongs.data, ...nextSongs.data],
            };
          })
        }}
        hasMore={songs.skip + songs.limit < songs.total}
        loader={
          <div key={0}>
            <Typography align='center'>
              Loading...
              </Typography>
          </div>
        }
      >
        <Grid container spacing={1} alignItems='center'>
          {songs.data && songs.data.map(entry => {
            return (
              <Grid key={entry.id} item xs={6} md={4} xl={2}>
                <SongCardSmall song={entry} onClick={() => {
                  history.push(`/songs/${entry.id}`);
                }} />
              </Grid>
            );
          })}
        </Grid>
        <div style={{ height: 16 }} />
      </InfiniteScroll>
    </div >
  );
}

export default SongList;