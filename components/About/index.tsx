import {Button, Container, Grid, Typography} from '@mui/material';
import Image from 'next/image';
import StyledLink from '../StyledLink';

const SectionAbout = () => {
  return (
    <Container component="section" maxWidth="md" sx={{mb: 5, mt: 5}}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Image src="/static/wedding.svg" alt="about" layout="responsive" width={800} height={600} />
        </Grid>
        <Grid item xs={12} sm={6} container flexDirection="column" justifyContent="center" alignItems="center">
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            {`We are so excited to welcome you to our wedding`}
          </Typography>
          <Typography textAlign="center" sx={{mb: 5}}>
            {`Sara and Penny and Chris live in Black Diamond. We love you all !`}
          </Typography>
          <StyledLink href="/rsvp">
            <Button variant="outlined" size="large">
              RSVP
            </Button>
          </StyledLink>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SectionAbout;
