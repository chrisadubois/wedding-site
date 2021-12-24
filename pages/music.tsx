import {Link, Stack, Typography, Box} from '@mui/material';
import type {NextPage} from 'next';
import Search from '../components/SearchInput';
import {useAuth} from '../hooks/useAuth';

const Music: NextPage = () => {
  const authenticated = useAuth();

  if (!authenticated) {
    return null;
  }

  return (
    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{mt: 3, mb: 3, ml: 1, mr: 1}}>
      <Search></Search>
      <Typography
        variant="caption"
        align="center"
        sx={{
          color: 'primary.dark',
        }}
      >
        Disclaimer: It may take up to a day for a track to be added in the playlist view
      </Typography>
      <div id="example-widget-trigger"></div>
      <iframe
        title="wedding playlist"
        src="https://open.spotify.com/embed/playlist/63zaytd1HcY5YYOt2IFOLw"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        style={{width: '100%', height: '60vh'}}
      ></iframe>
      <Box>
        <Link
          component="a"
          href="https://open.spotify.com/playlist/63zaytd1HcY5YYOt2IFOLw?si=bb977bc7a3474320"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'secondary.dark',
            textAlign: 'center',
          }}
        >
          {`Try clicking the link to view the playlist on Spotify !`}
        </Link>
      </Box>
    </Stack>
  );
};

export default Music;
