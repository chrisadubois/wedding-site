import {Button, CircularProgress, Grid, Typography, Box} from '@mui/material';
import {useRef, useCallback, useState, useEffect, useMemo, useContext} from 'react';
import Webcam from 'react-webcam';
import {mgmt} from '../../common/cms/mgmt';
import {usePrevious} from '../../hooks/usePrevious';
import {AppContext} from '../../context';
import {Status, Types} from '../../context/reducers';
import styles from '../../styles/modules/capture.module.scss';

const dataURLtoFile = (dataUrl: string = '', filename: string = '') => {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = Buffer.from(arr[1], 'base64');
  let n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.at(n);
  }

  return new File([u8arr], filename, {type: mime});
};

const WebcamCapture = ({apiKey, spaceId}: {apiKey: string; spaceId: string}) => {
  const cmsClient = useMemo(() => new mgmt(apiKey, spaceId), [apiKey, spaceId]);
  const {state, dispatch} = useContext(AppContext);

  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null | undefined>(null);
  const prevImgSrc = usePrevious(imgSrc);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot({width: 960, height: 540});
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const reset = useCallback(() => {
    dispatch({
      type: Types.ImageUploadStatus,
      payload: {
        status: null,
      },
    });
    setImgSrc(null);
  }, [dispatch]);

  useEffect(() => {
    if (!prevImgSrc && imgSrc) {
      const imgFile = dataURLtoFile(imgSrc, 'photo2.jpg');
      dispatch({
        type: Types.ImageUploadStatus,
        payload: {
          status: Status.Pending,
        },
      });
      cmsClient
        .upload(imgFile)
        .then(() => {
          dispatch({
            type: Types.ImageUploadStatus,
            payload: {
              status: Status.Success,
            },
          });
        })
        .catch((e) => {
          dispatch({
            type: Types.ImageUploadStatus,
            payload: {
              status: Status.Failure,
            },
          });
        });
    }
    if (prevImgSrc && !imgSrc) {
      setImgSrc(null);
    }
  }, [imgSrc, cmsClient, prevImgSrc, dispatch]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          maxWidth="md"
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom sx={{mt: 2, ml: 2}}>
            {`We are so excited to welcome you to our wedding`}
          </Typography>
          {state.social.imageUploadStatus === Status.Success && imgSrc && (
            <Button variant="outlined" size="large" onClick={reset}>
              Success !
            </Button>
          )}
          {state.social.imageUploadStatus === Status.Pending && (
            <Button variant="outlined" size="large">
              <CircularProgress />
            </Button>
          )}
          {state.social.imageUploadStatus === Status.Failure && (
            <Button variant="outlined" size="large" onClick={reset}>
              Error
            </Button>
          )}
          {!imgSrc && state.social.imageUploadStatus !== Status.Success && (
            <Button variant="outlined" size="large" onClick={capture}>
              Take Photo and Upload!
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} maxWidth="md">
          <Box sx={{mt: 2, ml: 2, mr: 2}}>
            {state.social.imageUploadStatus === Status.Success ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={`${styles.camera}`} src={imgSrc} alt="self" />
            ) : (
              <Webcam
                className={`${styles.camera}`}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: 'user',
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default WebcamCapture;
