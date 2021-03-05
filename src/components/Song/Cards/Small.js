import React from 'react';
import {
  Paper,
  ButtonBase,
  Typography,
  Grid,
} from '@material-ui/core';

import Image from 'components/Image';
import Constants from 'lib/constants';

function SongCardSmall({ song, difficulties, vocals, onClick, ...props }) {
  if (song) {
    const jacketName = `jacket_s_${(song.id + '').padStart(3, '0')}`;
    const url = `${Constants.ASSET_BASE_URL}startapp/music/jacket/${jacketName}/${jacketName}.png`;
    return (
      <div {...props} style={{ paddingTop: '100%', position: 'relative' }}>
        <Paper style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden' }}>
          <ButtonBase
            style={{ height: '100%', width: '100%' }}
            onClick={onClick}
          >
            <Image
              src={url}
            />
            <div style={{ position: 'absolute', top: 4, right: 4 }}>
              <Grid container>
                {
                  song.categories.map((category, i) => {
                    let text;
                    switch (category) {
                      case 'mv':
                        text = '3DMV';
                        break;
                      case 'mv_2d':
                        text = '2DMV';
                        break;
                      case 'original':
                        text = 'Original MV';
                        break;
                      case 'image':
                      default:
                        return (<div key={i} />);
                    }
                    return (
                      <Paper key={i} style={{ marginLeft: 4, padding: 4 }}>
                        <Typography style={{ color: '#FFAA00' }}>
                          {text}
                        </Typography>
                      </Paper>
                    );
                  })
                }
              </Grid>
            </div>
            <div style={{ position: 'absolute', bottom: 8 }}>
              <Grid container justify='center' spacing={1}>
                {
                  difficulties ? difficulties.map((difficulty, i) => {
                    return (
                      <Grid key={i} item xs={2}>
                        <Image
                          src={`/images/song/btn_difficulty_${difficulty.musicDifficulty}.png`}
                        />
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', zIndex: 1, top: -5 }}>
                            <Image
                              src='/images/song/txt_musicLv.png'
                            />
                          </div>
                          <div style={{ paddingTop: '100%', position: 'relative' }}>
                            <Paper style={{
                              margin: 4,
                              position: 'absolute',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              overflow: 'hidden',
                              backgroundColor: '#444465',
                              borderRadius: '50%'
                            }}>
                              <Grid style={{ width: '100%', height: '100%' }} container alignItems='center' justify='center'>
                                <Typography align='center' variant='h5' style={{ color: '#00ffdd' }}>
                                  {difficulty.playLevel}
                                </Typography>
                              </Grid>
                            </Paper>
                          </div>
                        </div>
                      </Grid>
                    );
                  }) : [...Array(5)].map((_, i) => {
                    let musicDifficulty;
                    switch (i) {
                      case 0:
                        musicDifficulty = 'easy';
                        break;
                      case 1:
                        musicDifficulty = 'normal';
                        break;
                      case 2:
                        musicDifficulty = 'hard';
                        break;
                      case 3:
                        musicDifficulty = 'expert';
                        break;
                      case 4:
                        musicDifficulty = 'master';
                        break;
                    }
                    return (
                      <Grid key={i} item xs={2}>
                        <Image
                          src={`/images/song/btn_difficulty_${musicDifficulty}.png`}
                        />
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', zIndex: 1, top: -5 }}>
                            <Image
                              src='/images/song/txt_musicLv.png'
                            />
                          </div>
                          <div style={{ paddingTop: '100%', position: 'relative' }}>
                            <Paper style={{
                              margin: 4,
                              position: 'absolute',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              overflow: 'hidden',
                              backgroundColor: '#444465',
                              borderRadius: '50%'
                            }} />
                          </div>
                        </div>
                      </Grid>
                    );
                  })
                }
              </Grid>
            </div>
          </ButtonBase>
        </Paper>
      </div>
    );
  }
  return (
    <div {...props} style={{ paddingTop: '100%', position: 'relative' }}>
      <Paper style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden' }}>
        <ButtonBase
          style={{ height: '110%', width: '100%' }}
        >
          <Image
            src='/images/song/jacket_empty_96.png'
          />
        </ButtonBase>
      </Paper>
    </div>
  );
}

export default SongCardSmall;

