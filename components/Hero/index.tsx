import {NextPage} from 'next';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import {HeroProps} from '../../types/ui';
import {Typography} from '@mui/material';
import {ArrowDownward} from '@mui/icons-material';

const Hero: NextPage<HeroProps> = ({image, title, subtitle}: HeroProps) => {
  return (
    <Grid
      component="section"
      container
      sx={{
        position: `relative`,
        height: '100vh',
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
          backgroundColor: 'rgba(0,0,0, .3)',
        }}
      >
        <Grid container item flexDirection="column" justifyContent="center" alignItems="center">
          <Typography
            variant="h1"
            align="center"
            gutterBottom
            sx={{
              color: 'secondary.main',
              fontWeight: 300,
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            variant="h3"
            align="center"
            color="primary.main"
            sx={{
              mb: 10,
            }}
          >
            {subtitle}
          </Typography>
          <Typography component="p" variant="h6" color="secondary" gutterBottom>
            {`About Us`}
          </Typography>
          <ArrowDownward fontSize="large" color="secondary" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Hero;
