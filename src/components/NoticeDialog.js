import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import moment from 'moment';

import Constants from 'lib/constants';

const icons = {
  bug: "icon_failure.png",
  campaign: "icon_campaign.png",
  event: "icon_event.png",
  gacha: "icon_gacha.png",
  information: "icon_notice.png",
  music: "icon_song.png",
  update: "icon_update.png",
};

function NoticeDialog({ notice, onClose, open }) {

  return (
    <Dialog maxWidth={false} fullWidth onClose={onClose} open={open}>
      <DialogTitle disableTypography>
        <Typography variant='h6'>
          {notice.title}
        </Typography>
        <Grid item container
          direction="row"
          justify="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography align='right' variant="subtitle2">
              {moment(notice.startAt).format('Y/MM/DD HH:mm')}
            </Typography>
          </Grid>
          <Grid item sm={2} xs={4}>
            <LazyLoadImage
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain',
              }}
              src={`/images/notice/${icons[notice.informationTag]}`}
              effect='opacity'
            />
          </Grid>
        </Grid>
        <div style={{ width: '100%', height: 2, backgroundColor: '#21cbbb' }} />
        <IconButton style={{
          position: 'absolute', right: 8,
          top: 8
        }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <div style={{ height: '70vh' }}>
          <iframe
            style={{ border: 'none' }}
            title={notice.title}
            width='100%'
            height='100%'
            src={`${Constants.OFFICIAL_NOTICE_BASE_URL}${notice.path}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NoticeDialog;