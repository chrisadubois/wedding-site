/**
 =================================================================================
 NextJS Link React component using next-link, next-router, muilink and TypeScript.
 
 Updated to resolve the following browser warning regarding passing "ref" to the DOM:
 > Warning: Failed prop type: Invalid prop `component` supplied to `ForwardRef(Link)`. 
 > Expected an element type that can hold a ref. Did you accidentally provide a plain function component instead? 
 > For more information see https://material-ui.com/r/caveat-with-refs-guide
 
 Example usage with Material UI:
 ```ts
 <Link href="/" color="inherit" underline="none">
   Hello World
 </Link>
 
 <Link href="/home">
  <StyledMenuItem onClick={handleClose} selected={router.pathname === "/home"}>
    Home
  </StyledMenuItem>
</Link>

<Typography variant="h6" className={classes.title} >
  <Link href="/" color="inherit" underline="none">
    Hello World
  </Link>
</Typography>
 ```
 =================================================================================
 */
 
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';

function NextComposed(props) {
  const { as, href, prefetch, forwardedRef, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a {...other} ref={forwardedRef} />
    </NextLink>
  );
}

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string.isRequired,
  prefetch: PropTypes.bool,
  forwardedRef: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
}

// eslint-disable-next-line react/display-name
const NextComposedWithRef = React.forwardRef((props, ref) => <NextComposed {...props} forwardedRef={ref} />)

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const { activeClassName, router, className: classNameProps, naked, ...other } = props;

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} {...other} />;
  }

  return <MuiLink component={NextComposedWithRef} className={className} {...other} />
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

Link.defaultProps = {
  activeClassName: 'active',
};

export default withRouter(Link)