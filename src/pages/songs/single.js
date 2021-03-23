import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import axios from 'axios';
import {
  Grid,
  Typography,
} from '@material-ui/core';

import UnderConstruction from 'pages/underConstruction';
import Image from 'components/Image';
import Chart from 'components/Song/Chart';
import Constants from 'lib/constants';

function SongPage() {
  const { musicId } = useParams();
  const { data } = useSWR(`${Constants.API_BASE_URL}database/master/musics?id=${musicId}`);
  const { data: difficultiesData } = useSWR(`${Constants.API_BASE_URL}database/master/musicDifficulties?musicId=${musicId}`);
  const { data: vocalsData } = useSWR(`${Constants.API_BASE_URL}database/master/musicVocals?musicId=${musicId}`);

  const [charts, setCharts] = useState({});

  useEffect(() => {
    const fetchCharts = async () => {
      if (difficultiesData) {
        let newCharts = {};
        for (var i = 0; i < difficultiesData.data.length; i++) {
          const difficulty = difficultiesData.data[i].musicDifficulty;
          const url = `${Constants.ASSET_BASE_URL}startapp/music/music_score/${('' + musicId).padStart(4, '0')}_01/${difficulty}`;
          const chartString = await axios.get(url).then(r => r.data);
          newCharts = {
            ...newCharts,
            [difficulty]: chartString,
          }
        }
        setCharts(newCharts);
      }

    }
    fetchCharts();
  }, [difficultiesData, musicId]);

  const jacketName = data ? `jacket_s_${(data.data[0].id + '').padStart(3, '0')}` : null;
  const jacketUrl = jacketName ? `${Constants.ASSET_BASE_URL}startapp/music/jacket/${jacketName}/${jacketName}.png` : '/images/song/jacket_empty_96.png';

  return (
    <div>
      {/* <UnderConstruction /> */}
      <Grid container justify='center'>
        <Image
          style={{
            maxWidth: 200,
          }}
          src={jacketUrl}
        />
      </Grid>

      <Grid container justify='center'>
        {difficultiesData &&
          difficultiesData.data.map(difficulty => {
            return (
              <Grid key={difficulty.id} item>
                <Typography noWrap align='center'>{difficulty.musicDifficulty.charAt(0).toUpperCase()}{difficulty.musicDifficulty.slice(1)} Lv.{difficulty.playLevel}</Typography>
                <Grid container justify='center'>
                  {charts[difficulty.musicDifficulty] && <Chart chartString={charts[difficulty.musicDifficulty]} />}
                </Grid>
              </Grid>
            );
          })
        }

      </Grid>
    </div>
  );
}

export default SongPage;