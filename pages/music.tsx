import {Button, Grid} from '@mui/material';
import type {NextPage} from 'next';

const Music: NextPage = () => {
  const addTrack = () => {
    fetch('/api/addTrack', {
      method: 'POST',
    });
  };

  return (
    <Grid>
      <Grid item>
        <div id="example-widget-trigger"></div>

        <iframe
          title="wedding playlist"
          src="https://open.spotify.com/embed/playlist/63zaytd1HcY5YYOt2IFOLw"
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </Grid>
      <Grid item>
        <Button onClick={() => addTrack()}>AddTrack</Button>
      </Grid>
    </Grid>
  );
};

export default Music;
