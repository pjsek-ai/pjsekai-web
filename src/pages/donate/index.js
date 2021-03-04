import React from "react";
import {
  Typography,
  Button,
  Grid,
  List,
  ListItem,
} from '@material-ui/core';
import useSWR from "swr";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import Constants from 'lib/constants';

function Donate() {
  const { data: patrons } = useSWR(`${Constants.API_BASE_URL}patrons?$limit=-1`);

  const masters = patrons ? patrons.filter(patron => patron.Tier === "Master") : [];
  const experts = patrons ? patrons.filter(patron => patron.Tier === "Expert") : [];
  const hards = patrons ? patrons.filter(patron => patron.Tier === "Hard") : [];
  const normals = patrons ? patrons.filter(patron => patron.Tier === "Normal") : [];
  const easies = patrons ? patrons.filter(patron => patron.Tier === "Easy") : [];

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
      {patrons ?
        patrons.length > 0 ?
          <div>
            {masters.length > 0 &&
              <div>
                <Typography>
                  Master tier:
              </Typography>
                <List>
                  {masters.map(patron => {
                    return <ListItem>
                      <Typography>
                        {patron.Name}
                      </Typography>
                    </ListItem>
                  })}
                </List>
              </div>
            }
            {experts.length > 0 &&
              <div>
                <Typography>
                  Expert tier:
              </Typography>
                <List>
                  {experts.map(patron => {
                    return <ListItem>
                      <Typography>
                        {patron.Name}
                      </Typography>
                    </ListItem>
                  })}
                </List>
              </div>
            }
            {hards.length > 0 &&
              <div>
                <Typography>
                  Hard tier:
              </Typography>
                <List>
                  {hards.map(patron => {
                    return <ListItem>
                      <Typography>
                        {patron.Name}
                      </Typography>
                    </ListItem>
                  })}
                </List>
              </div>
            }
            {normals.length > 0 &&
              <div>
                <Typography>
                  Normal tier:
              </Typography>
                <List>
                  {normals.map(patron => {
                    return <ListItem>
                      <Typography>
                        {patron.Name}
                      </Typography>
                    </ListItem>
                  })}
                </List>
              </div>
            }
            {easies.length > 0 &&
              <div>
                <Typography>
                  Easy tier:
              </Typography>
                <List>
                  {easies.map(patron => {
                    return <ListItem>
                      <Typography>
                        {patron.Name}
                      </Typography>
                    </ListItem>
                  })}
                </List>
              </div>
            }
          </div>
          :
          <Typography variant="subtitle1">
            There are currently no patrons 😢
          </Typography>
        :
        <div>
          <Typography>
            Loading...
          </Typography>
        </div>
      }


    </Grid>

  </div>;

}

export default Donate;