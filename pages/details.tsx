import Image from 'next/image';
import {Container, Grid, Typography, Button, Link, Tooltip, ClickAwayListener} from '@mui/material';
import React, {useContext, useState} from 'react';
import Maps from '../components/Maps';
import StyledLink from '../components/StyledLink';
import {cms} from '../common/cms';
import {getSerializableEnvironment} from '../common/env';
import {DetailsData} from '../types/cms';
import dayjs from 'dayjs';
import {useAuth} from '../hooks/useAuth';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

export async function getStaticProps() {
  const environmentVariables = getSerializableEnvironment(process.env);
  const cmsClient = cms.getInstance(environmentVariables);
  const detailsData = await cmsClient.getDetailsData();

  return {
    props: {
      mapsApiKey: environmentVariables.mapsApiKey,
      details: detailsData,
    },
    revalidate: 60 * 60, // 60 seconds --> 3600 seconds = 1 hour
  };
}

const Details = ({mapsApiKey, details}: {mapsApiKey: string; details: DetailsData}) => {
  const [open, setOpen] = useState(false);
  const authenticated = useAuth();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  if (!authenticated) {
    return null;
  }

  return (
    <Container component="section" maxWidth="md" sx={{mb: 5, mt: 5}}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          order={{xs: 1, sm: 1}}
        >
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            {dayjs(details.eventDate).format('dddd MMMM DD YYYY h:mm A')}
          </Typography>
          <Link component="a" href={details.eventAddressSearch} target="_blank" rel="noopener noreferrer">
            {details.eventAddress}
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
        </Grid>
        <Grid item xs={12} sm={6} md={6} order={{xs: 2, sm: 2}}>
          <Maps
            apiKey={mapsApiKey}
            pos={{lat: details.eventLocation?.lat || 0, lng: details.eventLocation?.lon || 0}}
            zoom={10}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} order={{xs: 4, sm: 3}}>
          <Image
            src={`https:${details.venueImageMain?.fields.file.url}`}
            alt="venue"
            layout="responsive"
            width={800}
            height={600}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          order={{xs: 3, sm: 4}}
        >
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            {details.venueTitle}
          </Typography>
          <Typography textAlign="center">{details.venueDescription}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          order={{xs: 5, sm: 5}}
        >
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            {details.rsvpTitle}
          </Typography>
          <Typography textAlign="center" sx={{mb: 5}}>
            {details.rsvpDescription}
          </Typography>
          <StyledLink href={details.rsvpUrl || ''} rel="noopener noreferrer">
            <Button variant="outlined" size="large">
              RSVP
            </Button>
          </StyledLink>
        </Grid>
        <Grid item xs={12} sm={6} order={{xs: 6, sm: 6}}>
          <Image src="/static/wedding.svg" alt="wedding" layout="responsive" width={800} height={600} />
        </Grid>
        <Grid item xs={12} sm={6} order={{xs: 8, sm: 7}}>
          <Image src="/static/undraw_gifts_re_97j6.svg" alt="gift" layout="responsive" width={800} height={600} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          order={{xs: 7, sm: 8}}
        >
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            {details.giftTitle}
          </Typography>
          <Typography textAlign="center" sx={{mb: 5}}>
            {details.giftDescription}
          </Typography>
          <StyledLink href={details.giftUrl || ''} rel="noopener noreferrer" target="_blank">
            <Button variant="outlined" size="large">
              GIFT
            </Button>
          </StyledLink>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          order={{xs: 9, sm: 10}}
        >
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            {details.foodTitle}
          </Typography>
          <Typography textAlign="center" sx={{mb: 5}}>
            {details.foodDescription}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} order={{xs: 9, sm: 10}}>
          <Image
            src="/static/undraw_special_event_-4-aj8.svg"
            alt="food"
            layout="responsive"
            width={800}
            height={600}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          order={{xs: 11, sm: 12}}
        >
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            {details.accomodationTitle}
          </Typography>
          <Typography textAlign="center" sx={{mb: 5}}>
            {details?.accomodationList !== undefined ? documentToReactComponents(details?.accomodationList) : null}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} order={{xs: 12, sm: 11}}>
          <Image src="/static/undraw_travel_plans_li01.svg" alt="food" layout="responsive" width={800} height={600} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
