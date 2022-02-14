/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Container} from '@mui/material';
import ImageItem from '../Image';
import {GalleryData} from '../../types/cms';
import {useState} from 'react';
import {Modal, Box} from '@mui/material';
import ImageCarousel from '../ImageCarousel';

// TODO: infinite scroll
const Images = ({images}: {images: GalleryData}) => {
  const theme = useTheme();
  const matchesMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const matchesMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [openCarousel, setOpenCarousel] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(-1);

  let columns = 3;
  if (matchesMdUp) {
    columns = 4;
  } else if (matchesSmDown) {
    columns = 1;
  } else if (matchesMdDown) {
    columns = 3;
  }

  const imageItemHandler = (event: React.MouseEvent<HTMLElement>, index: number): void => {
    setCarouselIndex(index);
    setOpenCarousel(true);
  };

  return (
    <>
      <ImageCarousel isOpen={openCarousel} setOpen={setOpenCarousel} images={images} initialIndex={carouselIndex} />
      <Container component="section" maxWidth="xl" sx={{mb: 5, mt: 5}}>
        <Box
          sx={{
            width: '100',
            height: '100%',
          }}
        >
          <ImageList sx={{width: '100%', height: '100%'}} variant="masonry" cols={columns} gap={8}>
            {images?.map((image, i) => (
              <ImageItem
                onClickHandler={(e) => {
                  imageItemHandler(e, i);
                }}
                key={`${image.fields.title}-${i}`}
                item={{
                  img: `https:${image.fields.file.url}`,
                  title: image.fields.title,
                  details: image.fields.file.details,
                }}
              />
            )) || <span></span>}
          </ImageList>
        </Box>
      </Container>
    </>
  );
};

export default Images;
