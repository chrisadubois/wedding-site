// https://stackoverflow.com/questions/67468972/using-nextjs-link-with-mui-link-or-mui-button-in-another-functional-component
// https://gist.github.com/brettscott/df3adda293cfa2be5e6f2af2aba99689
// https://mui.com/guides/routing/

import React, {forwardRef, Ref} from 'react';
import Link, {LinkProps} from 'next/link';
import {Link as MuiLink, LinkProps as MuiLinkProps} from '@mui/material';

type LinkRef = HTMLAnchorElement;
type NextLinkProps = Omit<MuiLinkProps, 'href' | 'classes'> & Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

const NextLink = ({href, as, prefetch, ...props}: LinkProps, ref: Ref<LinkRef>) => (
  <Link href={href} as={as} prefetch={prefetch} passHref>
    <MuiLink ref={ref} {...props} />
  </Link>
);

export default forwardRef<LinkRef, NextLinkProps>(NextLink);

// https://www.ansonlowzf.com/create-a-website-with-material-ui-v5-nextjs/
// /* eslint-disable jsx-a11y/anchor-has-content */
// import * as React from "react";
// import clsx from "clsx";
// import { useRouter } from "next/router";
// import NextLink from "next/link";
// import MuiLink from "@mui/material/Link";

// export const NextLinkComposed = React.forwardRef(function NextLinkComposed(
//   props,
//   ref
// ) {
//   const {
//     to,
//     linkAs,
//     href,
//     replace,
//     scroll,
//     passHref,
//     shallow,
//     prefetch,
//     locale,
//     ...other
//   } = props;

//   return (
//     <NextLink
//       href={to}
//       prefetch={prefetch}
//       as={linkAs}
//       replace={replace}
//       scroll={scroll}
//       shallow={shallow}
//       passHref={passHref}
//       locale={locale}
//     >
//       <a ref={ref} {...other} />
//     </NextLink>
//   );
// });

// // A styled version of the Next.js Link component:
// // https://nextjs.org/docs/#with-link
// const Link = React.forwardRef(function Link(props, ref) {
//   const {
//     activeClassName = "active",
//     as: linkAs,
//     className: classNameProps,
//     href,
//     noLinkStyle,
//     role, // Link don't have roles.
//     ...other
//   } = props;

//   const router = useRouter();
//   const pathname = typeof href === "string" ? href : href.pathname;
//   const className = clsx(classNameProps, {
//     [activeClassName]: router.pathname === pathname && activeClassName,
//   });

//   const isExternal =
//     typeof href === "string" &&
//     (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

//   if (isExternal) {
//     if (noLinkStyle) {
//       return <a className={className} href={href} ref={ref} {...other} />;
//     }

//     return <MuiLink className={className} href={href} ref={ref} {...other} />;
//   }

//   if (noLinkStyle) {
//     return (
//       <NextLinkComposed className={className} ref={ref} to={href} {...other} />
//     );
//   }

//   return (
//     <MuiLink
//       component={NextLinkComposed}
//       linkAs={linkAs}
//       className={className}
//       ref={ref}
//       to={href}
//       {...other}
//     />
//   );
// });

// export default Link;
