/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Container, Typography} from '@mui/material';
import ImageItem from '../Image';
import {GalleryData} from '../../types/cms';

const Images = ({images}: {images: GalleryData}) => {
  const theme = useTheme();
  const matchesMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const matchesMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  let columns = 3;
  if (matchesMdUp) {
    columns = 4;
  } else if (matchesSmDown) {
    columns = 2;
  } else if (matchesMdDown) {
    columns = 3;
  }

  return (
    <Container component="section" maxWidth="xl" sx={{mb: 5, mt: 5}}>
      {matchesSmDown ? (
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            color: 'primary.main',
            fontWeight: 300,
            opacity: '0.8',
          }}
        >
          DuBois & Crauer Wedding
        </Typography>
      ) : null}
      <Box
        sx={{
          width: '100',
          height: '100%',
        }}
      >
        <ImageList sx={{width: '100%', height: '100%'}} variant="masonry" cols={columns} gap={8}>
          {images?.map((image, i) => (
            <ImageItem
              key={`${image.fields.title}-${i}`}
              item={{img: `https:${image.fields.file.url}`, title: image.fields.title}}
            />
          )) || <span></span>}
        </ImageList>
      </Box>
    </Container>
  );
};

export default Images;
