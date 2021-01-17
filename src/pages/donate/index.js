import React from "react";
import {
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function Donate() {
  return <div>
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      <LazyLoadImage
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain',
        }}
        src='/images/please.jpg'
        effect='opacity'
      />
      <Button color="secondary" target="_blank" href="https://www.patreon.com/erikchan002">
        <OpenInNewIcon /> You can support pjsek.ai by becoming a patron!
      </Button>
      <Typography variant="subtitle1">
        pjsek.ai is brought to you by our lovely patrons:
      </Typography>
      <Typography variant="subtitle1">
        There are currently no patrons 😢
      </Typography>
    </Grid>

  </div>;

}

export default Donate;