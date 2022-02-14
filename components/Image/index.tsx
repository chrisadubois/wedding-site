/* eslint-disable @next/next/no-img-element */
import React, {useState, ReactElement} from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import {ImageListItemBar} from '@mui/material';
import Image from 'next/image';
import styles from '../../styles/modules/image-item.module.scss';
import {convertImage, toBase64} from '../../common/util';

const ImageItem = ({
  item,
  onClickHandler,
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
  onClickHandler?: (e: React.MouseEvent<HTMLElement>) => void;
}): ReactElement => {
  const [hover, setHover] = useState(false);

  return (
    <ImageListItem onClick={onClickHandler}>
      <Image
        className={`${styles.image}`}
        priority
        src={item.img}
        alt={item.title}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        width={item.details.image?.width}
        height={item.details.image?.height}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          convertImage(item.details.image?.width || 0, item.details.image?.height || 0)
        )}`}
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
