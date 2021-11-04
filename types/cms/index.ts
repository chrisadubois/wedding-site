import {Asset} from 'contentful';

export enum ContentTypeQuery {
  HERO = 'hero',
}

export interface ICMS {
  getHeroImage: () => Promise<Asset | undefined>;
}
