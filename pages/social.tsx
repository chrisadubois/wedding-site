/* eslint-disable @next/next/no-img-element */
import {useContext, useEffect, useState, useRef} from 'react';
import {Button, Container, Grid, ImageList, ImageListItem, Pagination, Stack, useMediaQuery} from '@mui/material';
import {Box} from '@mui/system';
import {cms} from '../common/cms';
import {getSerializableEnvironment, SerializableEnvironment} from '../common/env';
import WebcamCapture from '../components/Capture';
import {IPeerImageFields} from '../types/cms/generated/contentful';
import {Entry} from 'contentful';
import {AppContext} from '../context';
import {Status} from '../context/reducers';
import {usePrevious} from '../hooks/usePrevious';
import {useTheme} from '@mui/material/styles';

export async function getStaticProps() {
  const environmentVariables = getSerializableEnvironment(process.env);

  return {
    props: {
      environmentVariables: environmentVariables,
    },
  };
}

const Social = ({environmentVariables}: {environmentVariables: SerializableEnvironment}) => {
  const {state, dispatch} = useContext(AppContext);
  const [socialImages, setSocialImages] = useState<Array<Entry<IPeerImageFields>> | null>(null);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const previousImageUploadStatus = usePrevious<Status | null>(state.social.imageUploadStatus);
  const [canQuery, setCanQuery] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const theme = useTheme();
  let columns = 3;
  const limit = columns * 6;
  const refreshRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const cmsClient = cms.getInstance(environmentVariables);
    cmsClient.getPeerContent(limit).then((content) => {
      setSocialImages(content.items);
      setTotalEntries(content.total);
    });
  }, []);

  const handleChange = (event: any, value: number) => {
    refreshRef?.current?.scrollIntoView();
    setCanQuery(false);
    setPage(value);
    cms
      .getInstance(environmentVariables)
      .getPeerContent(limit, (value - 1) * limit)
      .then((content) => {
        setSocialImages(content.items);
        setTotalEntries(content.total);
      });
    setTimeout(() => {
      setCanQuery(true);
    }, 2000);
  };

  useEffect(() => {
    if (state.social.imageUploadStatus === Status.Success && previousImageUploadStatus !== Status.Success) {
      cms
        .getInstance(environmentVariables)
        .getPeerContent(limit)
        .then((content) => {
          setSocialImages(content.items);
          setTotalEntries(content.total);
        });
    }
  }, [state.social.imageUploadStatus, previousImageUploadStatus, environmentVariables]);

  const refresh = () => {
    setCanQuery(false);
    cms
      .getInstance(environmentVariables)
      .getPeerContent(limit)
      .then((content) => {
        setSocialImages(content.items);
        setTotalEntries(content.total);
      });
    setTimeout(() => {
      setCanQuery(true);
    }, 2000);
  };

  return (
    <Box>
      <WebcamCapture apiKey={environmentVariables.cmsMgmtApiKey} spaceId={environmentVariables.cmsSpaceId} />
      <Container component="section" maxWidth="md" sx={{mb: 5, mt: 5}}>
        <Grid container spacing={3}>
          <Grid item xs={12} container flexDirection="column" justifyContent="center" alignItems="center">
            <div ref={refreshRef}>
              <Button variant="outlined" size="large" onClick={refresh} disabled={!canQuery}>
                Refresh Feed
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} container flexDirection="column" justifyContent="center" alignItems="center">
            <Box
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <ImageList sx={{width: '100%', height: '100%'}} variant="masonry" cols={3} gap={5}>
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
                disabled={!canQuery}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Social;
