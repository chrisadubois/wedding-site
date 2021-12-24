import {ImageProps} from 'next/image';
import {ReactElement} from 'react';
import {GalleryData, HeroData} from './cms';
import {NavRoute} from './global';

export interface SimpleContainerProps {
  children: ReactElement;
}

export interface ContainerProps {
  children: Array<ReactElement> | ReactElement;
}

export interface LayoutProps extends SimpleContainerProps {}

export interface RequireAuthProps extends ContainerProps {}

export interface NavigationProps {
  navLinks: Array<NavRoute>;
}

export interface HomeProps {
  heroData: HeroData;
  galleryData: GalleryData;
}

export interface HeroProps {
  image: ImageProps;
  title?: string;
  subtitle?: string | ReactElement;
}
