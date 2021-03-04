import React from 'react';
import {
  Paper,
  ButtonBase,
} from '@material-ui/core';

import Image from 'components/Image';
import Constants from 'lib/constants';

function EventCardSmall({ event, onClick, ...props }) {
  const url = `${Constants.ASSET_BASE_URL}ondemand/event/${event.assetbundleName}/logo/logo/logo.png`;
  return (
    <div {...props} style={{ paddingTop: '50%', position: 'relative' }}>
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

export default EventCardSmall;

