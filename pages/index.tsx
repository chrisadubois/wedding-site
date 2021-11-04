import Hero from '../components/Hero';
import Countdown, {CountdownRenderProps} from 'react-countdown';
import {ReactElement} from 'react';
import About from '../components/About';
import Images from '../components/Images';
import {cms} from '../common/cms';
import {HomeProps} from '../types/ui';

export async function getStaticProps() {
  const cmsClient = new cms();
  const heroImage = await cmsClient.getHeroImage();

  return {
    props: {
      heroImage: heroImage,
    },
  };
}

const renderer = ({days, hours, minutes, seconds, completed}: CountdownRenderProps): ReactElement => {
  if (completed) {
    // Render a completed state
    return <span>{`Mr. & Mrs. DuBois`}</span>;
  } else {
    // Render a countdown
    return <span>{`${days}:${hours}:${minutes}:${seconds}`}</span>;
  }
};

const Home = ({heroImage}: HomeProps) => {
  return (
    <>
      {
        <Hero
          image={{src: `https:${heroImage?.fields.file.url}`, alt: 'Sara and Chris'}}
          title={`DuBois & Crauer Wedding`}
          subtitle={<Countdown date={new Date('2022-07-16T12:00:00')} renderer={renderer} />}
        />
      }
      <About />
      <Images />
    </>
  );
};

export default Home;
