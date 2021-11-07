import {Asset, Entry} from 'contentful';
import {IPeerImageFields} from './generated/contentful';

export enum ContentTypeQuery {
  HERO = 'hero',
  PEER_IMAGE = 'peerImage',
}

export type HeroImage = Asset | undefined;

export type PeerImage = Asset | undefined;

export interface ICMS {
  getHeroImage: () => Promise<HeroImage>;
  getPeerContent: () => Promise<{items: Array<Entry<IPeerImageFields>>; total: number}>;
}
