import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import {NextPage} from 'next';
import {NavigationProps} from '../../types/ui';
import StyledLink from '../StyledLink';
import {useRouter} from 'next/router';
import styles from '../../styles/modules/styled-link.module.scss';
import {useContext} from 'react';
import {AppContext} from '../../context';
import {generateRouterClassName} from '../../common/helper';

const NavigationBar: NextPage<NavigationProps> = ({navLinks}: NavigationProps) => {
  const router = useRouter();
  const {state} = useContext(AppContext);

  return (
    <Toolbar
      component="nav"
      sx={{
        display: {xs: `none`, md: `flex`},
      }}
    >
      <Stack direction="row" spacing={4}>
        {navLinks.map(({title, path, external}, i) => (
          <StyledLink
            className={generateRouterClassName(styles, title, state, router.asPath)}
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
    </Toolbar>
  );
};

export default NavigationBar;
