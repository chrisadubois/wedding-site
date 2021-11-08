import {createClient, Entry, EntryCollection, Asset} from 'contentful';

import {ContentTypeQuery, GalleryData, HeroData, HeroImage, ICMS, PeerImage} from '../../types/cms';
import {IHeroFields, IHomeCuratedGalleryFields, IPeerImageFields} from '../../types/cms/generated/contentful';
import {SerializableEnvironment} from '../env';

export class cms implements ICMS {
  private client;
  private static instance: cms;

  private constructor(environmentVariables: SerializableEnvironment) {
    this.client = createClient({
      space: environmentVariables.cmsSpaceId as string,
      accessToken: (environmentVariables.vercelEnv === 'preview'
        ? environmentVariables.cmsPreviewApiKey
        : environmentVariables.cmsApiKey) as string,
      host: environmentVariables.vercelEnv === 'preview' ? 'preview.contentful.com' : 'cdn.contentful.com',
    });
  }

  public static getInstance(environmentVariables?: any): cms {
    if (!cms.instance) {
      cms.instance = new cms(environmentVariables);
    }

    return cms.instance;
  }

  public getHeroData = async (): Promise<HeroData> => {
    const data: EntryCollection<IHeroFields> = await this.client.getEntries({
      content_type: ContentTypeQuery.HERO,
    });

    return {
      image: data.items[0].fields.heroImage,
      eventDate: data.items[0].fields.eventDate,
      title: data.items[0].fields.title,
    };
  };

  public getGalleryData = async (): Promise<GalleryData> => {
    const data: EntryCollection<IHomeCuratedGalleryFields> = await this.client.getEntries({
      content_type: ContentTypeQuery.HOME_CURATED_GALLERY,
    });

    return data.items[0].fields.gallery;
  };

  public getPeerContent = async (
    limit?: number,
    skip?: number
  ): Promise<{items: Array<Entry<IPeerImageFields>>; total: number}> => {
    const query = {
      content_type: ContentTypeQuery.PEER_IMAGE,
      limit: limit || 1000,
      skip: skip || 0,
    };
    const data: EntryCollection<IPeerImageFields> = await this.client.getEntries(query);

    return {items: data.items, total: data.total};
  };

  public getPeerContent = async (
    limit?: number,
    skip?: number
  ): Promise<{items: Array<Entry<IPeerImageFields>>; total: number}> => {
    const query = {
      content_type: ContentTypeQuery.PEER_IMAGE,
      limit: limit || 1000,
      skip: skip || 0,
    };
    const data: EntryCollection<IPeerImageFields> = await this.client.getEntries(query);

    return {items: data.items, total: data.total};
  };
}
