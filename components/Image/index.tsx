/* eslint-disable @next/next/no-img-element */
import React, {useState} from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import {ImageListItemBar} from '@mui/material';

const ImageItem = ({item}: {item: {img: string; title: string}}) => {
  const [hover, setHover] = useState(false);
  return (
    <ImageListItem>
      <img
        src={`${item.img}?w=248&fit=crop&auto=format`}
        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <ImageListItemBar
        sx={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          visibility: hover ? 'visible' : 'hidden',
        }}
        title={item.title}
        position="bottom"
      />
    </ImageListItem>
  );
};

export default ImageItem;
