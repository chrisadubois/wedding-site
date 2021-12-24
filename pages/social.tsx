/* eslint-disable @next/next/no-img-element */
import {useContext, useEffect, useState, useRef, useCallback} from 'react';
import {Button, Container, Grid, ImageList, ImageListItem, Pagination, Stack, useMediaQuery} from '@mui/material';
import {Box} from '@mui/system';
import {cms} from '../common/cms';
import {getSerializableEnvironment, SerializableEnvironment} from '../common/env';
import WebcamCapture from '../components/Capture';
import {IPeerImageFields} from '../types/cms/generated/contentful';
import {Entry} from 'contentful';
import {AppContext} from '../context';
import {Status, Types} from '../context/reducers';
import {usePrevious} from '../hooks/usePrevious';
import {useTheme} from '@mui/material/styles';
import {useAuth} from '../hooks/useAuth';

export async function getStaticProps() {
  const environmentVariables = getSerializableEnvironment(process.env);

  return {
    props: {
      environmentVariables: environmentVariables,
    },
  };
}

const Social = ({environmentVariables}: {environmentVariables: SerializableEnvironment}) => {
  const authenticated = useAuth();
  const {state, dispatch} = useContext(AppContext);
  const [socialImages, setSocialImages] = useState<Array<Entry<IPeerImageFields>> | null>(null);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const previousImageUploadStatus = usePrevious<Status | null>(state.social.imageUploadStatus);
  const [page, setPage] = useState<number>(1);
  const theme = useTheme();
  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  let columns = 3;
  if (matchesSmDown) {
    columns = 2;
  }
  const limit = 18; // columns * 6;
  const refreshRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const cmsClient = cms.getInstance(environmentVariables);
    cmsClient.getPeerContent(limit).then((content) => {
      setSocialImages(content.items);
      setTotalEntries(content.total);
    });
  }, []); // must be empty array even with warning

  const handleChange = (event: any, value: number) => {
    refreshRef?.current?.scrollIntoView();
    dispatch({
      type: Types.ImageCanQuery,
      payload: {
        canQuery: false,
      },
    });
    setPage(value);
    cms
      .getInstance(environmentVariables)
      .getPeerContent(limit, (value - 1) * limit)
      .then((content) => {
        setSocialImages(content.items);
        setTotalEntries(content.total);
      });
    setTimeout(() => {
      dispatch({
        type: Types.ImageCanQuery,
        payload: {
          canQuery: true,
        },
      });
    }, 2000);
  };

  const refresh = useCallback(() => {
    dispatch({
      type: Types.ImageCanQuery,
      payload: {
        canQuery: false,
      },
    });
    setPage(1);
    cms
      .getInstance(environmentVariables)
      .getPeerContent(limit)
      .then((content) => {
        setSocialImages(content.items);
        setTotalEntries(content.total);
      });
    setTimeout(() => {
      dispatch({
        type: Types.ImageCanQuery,
        payload: {
          canQuery: true,
        },
      });
    }, 2000);
  }, [environmentVariables, limit, dispatch]);

  // TODO: come back as the refresh automatically does not happen on first photo
  useEffect(() => {
    if (state.social.imageUploadStatus === Status.Success && previousImageUploadStatus !== Status.Success) {
      refresh();
    }
  }, [state.social.imageUploadStatus, previousImageUploadStatus, refresh]);

  if (!authenticated) {
    return null;
  }

  return (
    <Box>
      <WebcamCapture apiKey={environmentVariables.cmsMgmtApiKey} spaceId={environmentVariables.cmsSpaceId} />
      <Container component="section" maxWidth="md" sx={{mb: 5, mt: 5}}>
        <Grid container spacing={3}>
          <Grid item xs={12} container flexDirection="column" justifyContent="center" alignItems="center">
            <div ref={refreshRef}>
              <Button variant="outlined" size="large" onClick={refresh} disabled={!state.social.imageCanQuery}>
                {state.social.imageCanQuery ? `Refresh Feed` : `Wait a sec`}
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} container flexDirection="column" justifyContent="center" alignItems="center">
            <Box
              sx={{
                width: '100%',
                height: '100%',
                mt: 5,
              }}
            >
              <ImageList sx={{width: '100%', height: '100%'}} variant="quilted" cols={columns} gap={5}>
                {socialImages?.map((item, i) => {
                  return (
                    <ImageListItem key={i}>
                      <img
                        src={`https:${item.fields.image?.fields.file.url}`}
                        alt={`Peer Content ${i}`}
                        loading="lazy"
                      />
                    </ImageListItem>
                  );
                }) || []}
              </ImageList>
            </Box>
          </Grid>
          <Grid item xs={12} container flexDirection="column" justifyContent="center" alignItems="center">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(totalEntries / limit)}
                page={page}
                onChange={handleChange}
                color="primary"
                disabled={!state.social.imageCanQuery}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Social;
