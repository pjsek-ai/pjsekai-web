import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Grid,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewStreamIcon from '@material-ui/icons/ViewStream';

import SongCardSmall from 'components/Song/Cards/Small';
import Constants from 'lib/constants';

function SongList() {
  const itemPerLoad = 24;

  const history = useHistory();

  const [songs, setSongs] = useState({
    skip: 0,
    limit: 0,
    data: [],
  });

  const [loadingMore, setLoadingMore] = useState(false);

  const [songDifficulties, setSongDifficulties] = useState({});
  const [songVocals, setSongVocals] = useState({});

  const loadMore = async () => {
    if (!loadingMore) {
      await setLoadingMore(true);
      const response = await axios.get(`${Constants.API_BASE_URL}database/master/musics?$limit=${itemPerLoad}&$sort[publishedAt]=-1&$sort[id]=-1&$skip=${songs.skip + songs.limit}`);
      await setSongs(prevSongs => {
        const nextSongs = response.data;
        nextSongs.data.forEach(async song => {
          const vocalsResponse = await axios.get(`${Constants.API_BASE_URL}database/master/musicVocals?musicId=${song.id}&$limit=10&$sort[seq]=1`);
          const difficultiesResponse = await axios.get(`${Constants.API_BASE_URL}database/master/musicDifficulties?musicId=${song.id}&$limit=10`);
          setSongVocals(prevSongVocals => {
            return ({
              ...prevSongVocals,
              [song.id]: vocalsResponse.data.data,
            });
          });
          setSongDifficulties(prevSongDifficulties => {
            return ({
              ...prevSongDifficulties,
              [song.id]: difficultiesResponse.data.data,
            });
          });
        });
        return {
          ...prevSongs,
          ...nextSongs,
          data: [...prevSongs.data, ...nextSongs.data],
        };
      });
      await setLoadingMore(false);
    }
  }

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
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
          {songs.data && songs.data.map((entry, i) => {
            return (
              <Grid key={entry.id} item xs={6} md={4} xl={2}>
                <SongCardSmall
                  song={entry}
                  difficulties={songDifficulties[entry.id]}
                  vocals={songVocals[entry.id]}
                  onClick={() => {
                    history.push(`/songs/${entry.id}`);
                  }}
                />
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