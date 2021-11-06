import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import StyledLink from '../StyledLink';
import {useState} from 'react';
import {NextPage} from 'next';
import {NavigationProps} from '../../types/ui';
import {Divider, Stack} from '@mui/material';

const NavigationDrawer: NextPage<NavigationProps> = ({navLinks}: NavigationProps) => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  const list = (anchor: string) => (
    <Box
      sx={{width: 250, marginTop: `auto`, marginBottom: `auto`}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {
        <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />}>
          {navLinks.map(({title, path, external}, i) => (
            <Typography
              variant="button"
              key={`${title}${i}`}
              sx={{
                ml: 5,
                my: 2,
                textTransform: `uppercase`,
              }}
            >
              <StyledLink
                sx={{color: 'common.white'}}
                href={path}
                target={external ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                {title}
              </StyledLink>
            </Typography>
          ))}
        </Stack>
      }
    </Box>
  );

  return (
    <>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer('right', true)}
        sx={{
          color: `common.white`,
          display: {xs: `inline`, md: `none`},
        }}
      >
        <Menu fontSize="large" />
      </IconButton>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        sx={{
          '.MuiDrawer-paper': {
            bgcolor: 'primary.main',
          },
        }}
      >
        {list('right')}
      </Drawer>
    </>
  );
};

export default NavigationDrawer;
