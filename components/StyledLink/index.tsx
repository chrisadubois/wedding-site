/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {ReactNode, useContext} from 'react';
import NextLink from 'next/link';

interface InternalLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string; // Forces href to be required - see "Gotchas"
  as?: string; // Optional Next.js property to support dynamic routing
  children: ReactNode; //
}

// eslint-disable-next-line react/display-name
const StyledLink = React.forwardRef<HTMLAnchorElement, InternalLinkProps>((props, ref) => {
  // Peel off the onClick handler if given and the next props...
  const {href, as, onClick, ...rest} = props;

  // I defined the handler in the component here because I need access to react context ala useContext ... not demonstrated here
  const wrappedOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    if (onClick) {
      // If the consumer passed in onClick, call it
      onClick(e);
    }

    // Record analytics, close menus, etc
  };

  return (
    <NextLink {...{href, as}}>
      <a ref={ref} {...rest} onClick={wrappedOnClick} />
    </NextLink>
  );
});

export default StyledLink;

// // Source Copied from: https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js on 11m/1d/2021y

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import {useRouter} from 'next/router';
// import NextLink from 'next/link';
// import MuiLink from '@mui/material/Link';
// import {styled} from '@mui/material/styles';

// // Add support for the sx prop for consistency with the other branches.
// const Anchor = styled('a')({});

// export const NextLinkComposed = React.forwardRef(function NextLinkComposed(props, ref) {
//   const {to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other} = props;

//   return (
//     <NextLink
//       href={to}
//       prefetch={prefetch}
//       as={linkAs}
//       replace={replace}
//       scroll={scroll}
//       shallow={shallow}
//       passHref
//       locale={locale}
//     >
//       <Anchor ref={ref} {...other} />
//     </NextLink>
//   );
// });

// NextLinkComposed.propTypes = {
//   href: PropTypes.any,
//   linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   locale: PropTypes.string,
//   passHref: PropTypes.bool,
//   prefetch: PropTypes.bool,
//   replace: PropTypes.bool,
//   scroll: PropTypes.bool,
//   shallow: PropTypes.bool,
//   to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
// };

// // A styled version of the Next.js Link component:
// // https://nextjs.org/docs/#with-link
// const StyledLink = React.forwardRef(function Link(props, ref) {
//   const {
//     activeClassName = 'active',
//     as: linkAs,
//     className: classNameProps,
//     href,
//     noLinkStyle,
//     role, // Link don't have roles.
//     ...other
//   } = props;

//   const router = useRouter();
//   const pathname = typeof href === 'string' ? href : href.pathname;
//   const className = clsx(classNameProps, {
//     [activeClassName]: router.pathname === pathname && activeClassName,
//   });

//   const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

//   if (isExternal) {
//     if (noLinkStyle) {
//       return <Anchor className={className} href={href} ref={ref} {...other} />;
//     }

//     return <MuiLink className={className} href={href} ref={ref} {...other} />;
//   }

//   if (noLinkStyle) {
//     return <NextLinkComposed className={className} ref={ref} to={href} {...other} />;
//   }

//   return <MuiLink component={NextLinkComposed} linkAs={linkAs} className={className} ref={ref} to={href} {...other} />;
// });

// StyledLink.propTypes = {
//   activeClassName: PropTypes.string,
//   as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   className: PropTypes.string,
//   href: PropTypes.any,
//   noLinkStyle: PropTypes.bool,
//   role: PropTypes.string,
// };

// export default StyledLink;
