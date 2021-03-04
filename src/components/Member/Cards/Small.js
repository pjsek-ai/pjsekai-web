import React from 'react';
import {
  Paper,
  ButtonBase,
} from '@material-ui/core';

import MemberThumbnail from 'components/Member/Thumbnail';

function MemberCardSmall({ member, showAfterTraining, onClick, ...props }) {
  return (
    <div {...props} style={{ paddingTop: '100%', position: 'relative' }}>
      <Paper style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden' }}>
        <ButtonBase
          style={{ height: '100%', width: '100%' }}
          onClick={onClick}
        >
          <MemberThumbnail
            style={{ height: '100%', width: '100%' }}
            member={member}
            trainedStars={showAfterTraining}
            trainedImage={showAfterTraining}
          />
        </ButtonBase>
      </Paper>
    </div>
  );
}

export default MemberCardSmall;
