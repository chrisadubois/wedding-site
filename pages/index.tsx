import Hero from '../components/Hero';
import Countdown, {CountdownRenderProps} from 'react-countdown';
import {ReactElement} from 'react';
import Images from '../components/Images';
import {cms} from '../common/cms';
import {HomeProps} from '../types/ui';
import {getSerializableEnvironment} from '../common/env';
import {Typography} from '@mui/material';

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
  };
}

const renderer = ({days, hours, minutes, seconds, completed}: CountdownRenderProps): ReactElement => {
  if (completed) {
    // Render a completed state
    return <span>{`Happily Ever After!`}</span>;
  } else {
    // Render a countdown
    return (
      <Typography align="center" color="primary.main" component="h2">
        {`${days > 0 ? `${days} days ` : ''}${hours > 0 ? `${hours} hours ` : ''}${
          minutes > 0 ? `${minutes} minutes ` : ''
        }${seconds} seconds until "I do"`}
      </Typography>
    );
  }
};

const Home = ({heroData, galleryData}: HomeProps) => {
  return (
    <>
      {
        <Hero
          image={{
            src: heroData ? `https:${heroData?.image?.fields?.file?.url || ''}` : '/static/main.jpg',
            alt: 'Sara and Chris',
          }}
          title={heroData?.title || `DuBois & Crauer Wedding`}
          subtitle={<Countdown date={new Date(heroData?.eventDate || '2022-07-16T12:00:00')} renderer={renderer} />}
        />
      }
      <Images images={galleryData} />
    </>
  );
};

export default Home;
