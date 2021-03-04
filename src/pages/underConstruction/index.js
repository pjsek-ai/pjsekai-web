import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

import Image from 'components/Image';

function UnderConstruction() {
  return <div>
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      <Typography variant="h4">
        Under construction
      </Typography>
      <Image
        style={{
          maxWidth: 556,
        }}
        src='/images/construction.gif'
      />
    </Grid>

  </div>;

}

export default UnderConstruction;