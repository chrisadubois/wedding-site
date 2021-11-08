/* eslint-disable @next/next/no-img-element */
import React, {useState, ReactElement} from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import {ImageListItemBar} from '@mui/material';

const ImageItem = ({item}: {item: {img: string; title: string}}): ReactElement => {
  const [hover, setHover] = useState(false);
  return (
    <ImageListItem>
      <img
        src={item.img}
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
