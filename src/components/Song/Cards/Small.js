import React from 'react';
import {
  Paper,
  ButtonBase,
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

