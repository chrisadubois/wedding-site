import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import {NextPage} from 'next';
import {NavigationProps} from '../../types/ui';
import StyledLink from '../StyledLink';

const Navbar: NextPage<NavigationProps> = ({navLinks}: NavigationProps) => {
  return (
    <Toolbar
      component="nav"
      sx={{
        display: {xs: `none`, md: `flex`},
      }}
    >
      <Stack direction="row" spacing={4}>
        {navLinks.map(({title, path}, i) => (
          <StyledLink // TODO: typescript source for StyledLink
            key={`${title}${i}`}
            href={path}
            variant="button"
            sx={{color: `white`, opacity: 0.7}}
          >
            {title}
          </StyledLink>
        ))}
      </Stack>
    </Toolbar>
  );
};

export default Navbar;
