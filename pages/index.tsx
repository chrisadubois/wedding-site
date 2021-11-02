import type {NextPage} from 'next';
import Hero from '../components/Hero';
import styles from '../styles/modules/home.module.scss';
import Countdown, {CountdownRenderProps} from 'react-countdown';
import {ReactElement} from 'react';
import About from '../components/About';
import Images from '../components/Images';

const renderer = ({days, hours, minutes, seconds, completed}: CountdownRenderProps): ReactElement => {
  if (completed) {
    // Render a completed state
    return <span>{`Mr. & Mrs. DuBois`}</span>;
  } else {
    // Render a countdown
    return <span>{`${days}:${hours}:${minutes}:${seconds}`}</span>;
  }
};

const Home: NextPage = () => {
  return (
    <>
      <Hero
        image={{src: '/static/main.jpg', alt: 'Sara and Chris'}}
        title={`DuBois & Crauer Wedding`}
        subtitle={<Countdown date={new Date('2022-07-16T12:00:00')} renderer={renderer} />}
      />
      <About />
      <Images />
    </>
  );
};

export default Home;
