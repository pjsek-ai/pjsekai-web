import React from "react";
import Typography from '@material-ui/core/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import Grid from "@material-ui/core/Grid";

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
      <LazyLoadImage
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain',
        }}
        src='/construction.gif'
        effect='opacity'
      />
    </Grid>

  </div>;

}

export default UnderConstruction;