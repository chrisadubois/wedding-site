import React, {useState, ReactElement, useEffect} from 'react';
import {GalleryData} from '../../types/cms';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const ImageCarousel = ({
  images,
  initialIndex,
  isOpen,
  setOpen,
}: {
  images: GalleryData;
  initialIndex: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}): ReactElement | null => {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  const generateLightbox = (): ReactElement => {
    const mainSrc = images?.[index]?.fields?.file?.url || undefined;
    const nextSrc = images?.[index + 1]?.fields?.file?.url || undefined;
    const prevSrc = images?.[index - 1]?.fields?.file?.url || undefined;

    return (
      <Lightbox
        mainSrc={`https:${mainSrc}`}
        nextSrc={nextSrc ? `https:${nextSrc}` : undefined}
        prevSrc={prevSrc ? `https:${prevSrc}` : undefined}
        onCloseRequest={() => setOpen(false)}
        onMovePrevRequest={() => setIndex(index - 1)}
        onMoveNextRequest={() => setIndex(index + 1)}
      />
    );
  };

  return isOpen ? generateLightbox() : null;
};

export default ImageCarousel;
