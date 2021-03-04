import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Paper,
  ButtonBase,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Carousel from 'nuka-carousel';

import Image from 'components/Image';
import Constants from 'lib/constants';

function EventSlides({ event, open, onClose }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const carousel = useRef();

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      maxWidth={false}
      fullWidth
      onClose={(prop) => { onClose(prop); setSlideIndex(0); }}
      open={open}
    >
      <DialogContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          {/* <IconButton style={{
            position: 'absolute', right: 8,
            top: 8
          }} onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton> */}
          <Grid container item justify="flex-start" xs={1}>
            {slideIndex > 0 &&
              < ButtonBase onClick={() => setSlideIndex(slideIndex - 1)}>
                <Image
                  src='/images/event/arrow_switching_left.png'
                />
              </ButtonBase>
            }
          </Grid>
          <Grid item xs={10}>
            <div style={{ marginBottom: 24 }}>
              <Carousel
                ref={carousel}
                cellSpacing={32}
                wrapAround={true}
                withoutControls={true}
                slideIndex={slideIndex}
                afterSlide={i => setSlideIndex(i)}
              >
                {[1, 2, 3, 4].map(i => {
                  const url = `${Constants.ASSET_BASE_URL}ondemand/event/${event.assetbundleName}/slide/top/event_${`${i}`.padStart(2, '0')}.png`;
                  return (
                    <div key={i} style={{ borderRadius: 48, padding: 24, paddingBottom: 16, backgroundColor: '#ffffff' }}>
                      <Image
                        onLoad={() => carousel.current.setDimensions()}
                        style={{ borderRadius: 24 }}
                        src={url}
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <Grid
              container
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={3}>
                {slideIndex > 0 &&
                  <Button variant='contained' style={{ width: '100%' }} onClick={() => setSlideIndex(slideIndex - 1)}>
                    Previous
                  </Button>
                }
              </Grid>
              <Grid item container
                justify="center"
                alignItems="center" xs={6}>
                <Paper style={{
                  borderRadius: 12,
                  backgroundColor: '#ffffff99',
                  boxShadow: 'none',
                  width: 80,
                  height: 22,
                }}>
                  <Grid
                    style={{ height: '100%' }}
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                  >
                    {
                      [...Array(4).keys()].map(i => {
                        return (
                          <Grid key={i} item>
                            <ButtonBase style={{ borderRadius: '50%' }} onClick={() => {
                              setSlideIndex(i);
                            }}>
                              <Paper style={{ margin: 0, height: 14, width: 14, borderRadius: '50%', backgroundColor: '#ffffff' }}>
                                <Grid
                                  style={{ height: '100%' }}
                                  container
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <Paper style={{ height: 10, width: 10, borderRadius: '50%', backgroundColor: i === slideIndex ? '#FF55AA' : '#444466' }} />
                                  </Grid>
                                </Grid>
                              </Paper>
                            </ButtonBase>
                          </Grid>
                        );
                      })
                    }
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                {slideIndex < 3 ?
                  <Button variant='contained' color='primary' style={{ width: '100%' }} onClick={() => setSlideIndex(slideIndex + 1)}>
                    Next
                  </Button> :
                  <Button variant='contained' color='primary' style={{ width: '100%' }} onClick={(prop) => { onClose(prop); setSlideIndex(0); }}>
                    Close
              </Button>
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" item xs={1}>
            {slideIndex < 3 &&
              <ButtonBase onClick={() => setSlideIndex(slideIndex + 1)}>
                <Image
                  src='/images/event/arrow_switching_right.png'
                />
              </ButtonBase>
            }
          </Grid>
        </Grid>

      </DialogContent>
    </Dialog >
  );
}

export default EventSlides;