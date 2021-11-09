import {Button, CircularProgress, Grid, Typography, Box} from '@mui/material';
import {useRef, useCallback, useState, useEffect, useMemo, useContext} from 'react';
import Webcam from 'react-webcam';
import {mgmt} from '../../common/cms/mgmt';
import {usePrevious} from '../../hooks/usePrevious';
import {AppContext} from '../../context';
import {Status, Types} from '../../context/reducers';
import styles from '../../styles/modules/capture.module.scss';
import {dataURLtoFile} from '../../common/util';
import {v4} from 'uuid';

const WebcamCapture = ({apiKey, spaceId}: {apiKey: string; spaceId: string}) => {
  const cmsClient = useMemo(() => new mgmt(apiKey, spaceId), [apiKey, spaceId]);
  const {state, dispatch} = useContext(AppContext);

  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null | undefined>(null);
  const prevImgSrc = usePrevious(imgSrc);
  const [initWebcam, setInitWebcam] = useState<boolean>(false);

  const capture = useCallback(() => {
    dispatch({
      type: Types.ImageCanQuery,
      payload: {
        canQuery: false,
      },
    });
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc);
    setTimeout(() => {
      dispatch({
        type: Types.ImageCanQuery,
        payload: {
          canQuery: true,
        },
      });
    }, 5000);
  }, [webcamRef, setImgSrc, dispatch]);

  useEffect(() => {
    if (!prevImgSrc && imgSrc) {
      const imgFile = dataURLtoFile(imgSrc, `peer_content-${v4()}.jpg`);
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

  const reset = useCallback(() => {
    dispatch({
      type: Types.ImageUploadStatus,
      payload: {
        status: null,
      },
    });
    setImgSrc(null);
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} container flexDirection="column" justifyContent="center" alignItems="center">
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom sx={{mt: 2, ml: 2}}>
            {`We are so excited to welcome you to our wedding`}
          </Typography>
          {!initWebcam && (
            <Button variant="outlined" color="primary" size="large" onClick={() => setInitWebcam(true)}>
              Take a photo and post it to the feed !
            </Button>
          )}
        </Grid>
        <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
          {state.social.imageUploadStatus === Status.Success && imgSrc && initWebcam && (
            <Button variant="outlined" size="large" color="success" onClick={reset}>
              Capture Success !
            </Button>
          )}
          {state.social.imageUploadStatus === Status.Pending && (
            <Button variant="outlined" size="large" color="secondary">
              <CircularProgress />
            </Button>
          )}
          {state.social.imageUploadStatus === Status.Failure && (
            <Button variant="outlined" size="large" color="error" onClick={reset}>
              Error
            </Button>
          )}
          {!imgSrc && state.social.imageUploadStatus !== Status.Success && initWebcam && (
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={capture}
              disabled={!state.social.imageCanQuery}
            >
              {state.social.imageCanQuery ? `Capture & Upload` : `Wait a sec`}
            </Button>
          )}
          {initWebcam && (
            <Button variant="outlined" size="large" color="secondary" onClick={() => setInitWebcam(false)}>
              Turn Off Camera
            </Button>
          )}
        </Box>
        <Grid item xs={12} container flexDirection="column" justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: '50%',
            }}
          >
            {state.social.imageUploadStatus === Status.Success && imgSrc && initWebcam ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={`${styles.camera}`} src={imgSrc} alt="self" />
            ) : (
              (initWebcam && (
                <Webcam
                  className={`${styles.camera}`}
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    facingMode: 'user',
                  }}
                  // eslint-disable-next-line @next/next/no-img-element
                />
              )) || <img src="/static/undraw_group_selfie_re_h8gb.svg" alt="about" width="100%" height="auto" />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default WebcamCapture;
