import {Asset} from 'contentful';

export enum ContentTypeQuery {
  HERO = 'hero',
}

export type HeroImage = Asset | undefined;

export interface ICMS {
  getHeroImage: () => Promise<HeroImage>;
}
