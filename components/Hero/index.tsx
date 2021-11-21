import {NextPage} from 'next';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import {HeroProps} from '../../types/ui';
import {Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Hero: NextPage<HeroProps> = ({image, title, subtitle}: HeroProps) => {
  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid
      component="section"
      sx={{
        position: `relative`,
        width: `100vw`,
        overflow: `hidden`,
        zIndex: -100,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={6237}
        height={4163}
        layout="responsive"
        object-fit="cover"
        quality={95}
        priority
      />
      <Grid
        container
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0, .5)',
        }}
      >
        <Grid container item flexDirection="column" justifyContent="flex-end" alignItems="center">
          {matchesSmUp ? (
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{
                color: 'primary.main',
                fontWeight: 300,
                opacity: '0.4',
              }}
            >
              {title}
            </Typography>
          ) : null}
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
