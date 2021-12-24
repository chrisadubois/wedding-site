import {Button, Container, Grid} from '@mui/material';
import {Box} from '@mui/system';
import type {NextPage} from 'next';
import {useAuth} from '../hooks/useAuth';

const RSVP: NextPage = () => {
  const authenticated = useAuth();

  if (!authenticated) {
    return null;
  }

  return (
    <Box sx={{width: '100%', height: '1200px'}}>
      <Container component="section" maxWidth="lg" sx={{mb: 5, mt: 5, width: '100%', height: '100%'}}>
        <iframe
          title="rsvp"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdyEfnKmQX9fMM6O8dIFbfyKQFhjdiHgh2f4QOVyn-ALZmXRw/viewform?embedded=true"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          style={{width: '100%', height: '100%'}}
        ></iframe>
      </Container>
    </Box>
  );
};

export default RSVP;
