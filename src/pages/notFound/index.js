import React from "react";
import {
  Typography,
  Grid,
} from '@material-ui/core';

import Image from 'components/Image';

function NotFound() {
  return <div>
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      <Typography variant="h5">
        Oh my! There's nothing here! Are you lost?
      </Typography>
      <Image
        style={{
          maxWidth: 426,
        }}
        src='/images/confused.gif'
      />
    </Grid>

  </div>;

}

export default NotFound;