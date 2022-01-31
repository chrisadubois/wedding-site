/* eslint-disable @next/next/no-img-element */
import React, {useState, ReactElement} from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import {ImageListItemBar, Box, Typography, Modal} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';

const ImageItem = ({
  item,
}: {
  item: {
    img: string;
    title: string;
    details: {
      size: number;
      image?: {
        width: number;
        height: number;
      };
    };
  };
}): ReactElement => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const matchesMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Modal
        sx={{border: '0px'}}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60vh',
            bgcolor: 'background.paper',
            p: 4,
            boxShadow: 24,
          }}
        >
          <Image
            priority
            src={item.img}
            alt={item.title}
            width={item.details.image?.width}
            height={item.details.image?.height}
          />
        </Box>
      </Modal>
      <ImageListItem>
        <Image
          onClick={() => {
            if (matchesMdUp) {
              setOpen(true);
            }
          }}
          priority
          src={item.img}
          alt={item.title}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          width={item.details.image?.width}
          height={item.details.image?.height}
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
    </>
  );
};

export default ImageItem;
