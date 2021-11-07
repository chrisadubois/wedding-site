import Image from 'next/image';
import {Container, Grid, Typography, Button, Link, Tooltip, ClickAwayListener} from '@mui/material';
import React, {useState} from 'react';
import Maps from '../components/Maps';
import About from '../components/About';

export async function getStaticProps() {
  return {
    props: {
      apiKey: process.env.MAPS_API_KEY,
    },
  };
}

const Logistics = ({apiKey}: {apiKey: string}) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Container component="section" maxWidth="md" sx={{mb: 5, mt: 5}}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} container flexDirection="column" justifyContent="center" alignItems="center">
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            {`July 7th, 2022 - 12:00PM`}
          </Typography>
          <Link
            component="a"
            href={`https://www.google.com/maps/dir//22518+153rd+Ave+SE,+Snohomish,+WA+98296/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x54900a21e35ba31b:0x85f722ecb898c904?sa=X&ved=2ahUKEwiNqrvWs4P0AhXBhHIEHZVrDYgQwwV6BAgIEAM`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`22518 153rd Ave SE Snohomish, WA 98296`}
          </Link>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied!"
              >
                <Button
                  variant="outlined"
                  size="large"
                  sx={{mt: 2, mb: 2}}
                  onClick={() => {
                    handleTooltipOpen();
                    navigator.clipboard.writeText(`22518 153rd Ave SE Snohomish, WA 98296`);
                  }}
                >
                  Copy Address
                </Button>
              </Tooltip>
            </div>
          </ClickAwayListener>

          <Typography textAlign="center">
            {`Sara and Penny and Chris live in Black Diamond. We love you all !`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Maps apiKey={apiKey} pos={{lat: 47.7926096, lng: -122.0289272}} zoom={10} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Image src="/static/venue.jpeg" alt="venue" layout="responsive" width={800} height={600} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} container flexDirection="column" justifyContent="center" alignItems="center">
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            {`We are so excited to welcome you to our wedding`}
          </Typography>
          <Typography textAlign="center">
            {`Sara and Penny and Chris live in Black Diamond. We love you all !`}
          </Typography>
        </Grid>
        <About />
      </Grid>
    </Container>
  );
};

export default Logistics;
