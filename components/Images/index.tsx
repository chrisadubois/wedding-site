/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Container} from '@mui/material';
import ImageItem from '../Image';

export default function Images() {
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
    <Container component="section" maxWidth="md" sx={{mb: 5, mt: 5}}>
      <Box
        sx={{
          width: '100',
          height: '100%',
        }}
      >
        <ImageList sx={{width: '100%', height: '100%'}} variant="masonry" cols={columns} gap={8}>
          {itemData.map((item) => (
            <ImageItem key={item.img} item={item} />
          ))}
        </ImageList>
      </Box>
    </Container>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];
