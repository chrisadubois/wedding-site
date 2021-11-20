import {NextPage} from 'next';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import {HeroProps} from '../../types/ui';
import {Typography} from '@mui/material';

const Hero: NextPage<HeroProps> = ({image, title, subtitle}: HeroProps) => {
  return (
    <Grid
      component="section"
      container
      sx={{
        position: `relative`,
        height: '95vh',
        width: `100vw`,
        overflow: `hidden`,
        zIndex: -100,
      }}
    >
      <Image src={image.src} alt={image.alt} layout="fill" object-fit="cover" quality={95} priority />
      <Grid
        container
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0, .5)',
        }}
      >
        <Grid container item flexDirection="column" justifyContent="center" alignItems="center">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              color: 'primary.main',
              fontWeight: 300,
              opacity: '0.5',
            }}
          >
            {title}
          </Typography>
          <Typography
            component="h3"
            variant="h3"
            align="center"
            color="secondary.main"
            sx={{
              mb: 10,
            }}
          >
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Hero;
