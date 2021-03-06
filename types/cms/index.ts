import {Asset, AssetCollection, Entry} from 'contentful';
import {IDetailsFields, IPeerImageFields} from './generated/contentful';

export enum ContentTypeQuery {
  HERO = 'hero',
  PEER_IMAGE = 'peerImage',
  HOME_CURATED_GALLERY = 'homeCuratedGallery',
  DETAILS = 'details',
  ENGAGEMENT_PHOTOS = 'engagementPhotos',
}

export type HeroImage = Asset | undefined;

export type PeerImage = Asset | undefined;

export type HeroData = {image: HeroImage; eventDate: string | undefined; title: string | undefined};

export type GalleryData = Asset[] | undefined;

export type EngagementGallery = Asset[] | undefined;

export type DetailsData = IDetailsFields;

export interface ICMS {
  getHeroData: () => Promise<HeroData>;
  getPeerContent: () => Promise<{items: Array<Entry<IPeerImageFields>>; total: number}>;
  getGalleryData: () => Promise<GalleryData>;
  getDetailsData: () => Promise<DetailsData>;
}
