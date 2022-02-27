import Hero from '../components/Hero';
import Countdown, {CountdownRenderProps} from 'react-countdown';
import {ReactElement} from 'react';
import Images from '../components/Images';
import {cms} from '../common/cms';
import {HomeProps} from '../types/ui';
import {getSerializableEnvironment} from '../common/env';
import {Stack, Typography} from '@mui/material';
import {minimal} from '../common/routes';
import StyledLink from '../components/StyledLink';
import {useRouter} from 'next/router';

export async function getStaticProps() {
  const environmentVariables = getSerializableEnvironment(process.env);
  const cmsClient = cms.getInstance(environmentVariables);
  const heroData = await cmsClient.getHeroData();
  const galleryData = await cmsClient.getGalleryData();

  return {
    props: {
      heroData: heroData,
      galleryData: galleryData,
    },
    revalidate: 60 * 60, // 60 seconds --> 3600 seconds = 1 hour
  };
}

const renderer = ({days, hours, minutes, seconds, completed}: CountdownRenderProps): ReactElement => {
  if (completed) {
    // Render a completed state
    return <Typography color="secondary.main" component="h3">{`Happily Ever After!`}</Typography>;
  } else {
    // Render a countdown
    return (
      <Typography align="center" color="secondary.main" component="h3">
        {`${days > 0 ? `${days} days ` : ''}${hours > 0 ? `${hours} hours ` : ''}${
          minutes > 0 ? `${minutes} minutes ` : ''
        }${seconds} seconds until "I do"`}
      </Typography>
    );
  }
};

const Home = ({heroData, galleryData}: HomeProps) => {
  const router = useRouter();
  return (
    <>
      {
        <Hero
          image={{
            src: heroData ? `https:${heroData?.image?.fields?.file?.url || ''}` : '/static/main.jpg',
            alt: 'Sara and Chris',
          }}
          subtitle={<Countdown date={new Date(heroData?.eventDate || '2022-07-16T12:00:00')} renderer={renderer} />}
        />
      }
      <Images images={galleryData} />
      <Stack direction="row" spacing={4}>
        {minimal.map(({title, path, external}, i) => (
          <StyledLink
            key={`${title}${i}`}
            href={path}
            target={external ? '_blank' : '_self'}
            rel="noopener noreferrer"
            variant="button"
            sx={{color: `white`, opacity: 0.7, textDecoration: router.pathname === path ? 'underline' : 'none'}}
          >
            {title}
          </StyledLink>
        ))}
      </Stack>
    </>
  );
};

export default Home;
