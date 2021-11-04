import {ImageProps} from 'next/image';
import {ReactElement, ReactNode} from 'react';
import {HeroImage} from './cms';
import {NavRoute} from './global';

export interface SimpleContainerProps {
  children: ReactElement;
}

export interface LayoutProps extends SimpleContainerProps {}

export interface NavigationProps {
  navLinks: Array<NavRoute>;
}

export interface HomeProps {
  heroImage: HeroImage;
}

export interface HeroProps {
  image: ImageProps;
  title?: string;
  subtitle?: string | ReactElement;
}
