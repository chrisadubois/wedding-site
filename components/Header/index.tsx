import {IconButton, Theme} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import {styled} from '@mui/system';
import StyledLink from '../StyledLink';
import {ThemeContainer} from '../../types/global';
import Home from '@mui/icons-material/Home';
import {routes} from '../../common/routes';
import NavigationBar from '../NavigationBar';
import NavigationDrawer from '../NavigationDrawer';
import HideOnScroll from '../HideOnScroll';

const Offset = styled('div')(({theme}: ThemeContainer) => ({
  ...theme?.mixins.toolbar,
}));

const Header = () => {
  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          // color="transparent"
          // sx={{boxShadow: `none`}}
        >
          <Toolbar>
            <Container maxWidth="lg" sx={{display: `flex`, justifyContent: `space-between`}}>
              <IconButton edge="start" aria-label="home">
                <StyledLink
                  activeClassName="active"
                  href={{
                    // TODO: typescript styled link source
                    pathname: '/',
                  }}
                >
                  <Home
                    sx={{
                      color: (theme: Theme) => theme.palette.common.white,
                    }}
                    fontSize="large"
                  />
                </StyledLink>
              </IconButton>
              <NavigationBar navLinks={routes} />
              <NavigationDrawer navLinks={routes} />
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Offset />
    </>
  );
};

export default Header;
