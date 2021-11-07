import {createClient, Entry, EntryCollection} from 'contentful';

import {ContentTypeQuery, HeroImage, ICMS, PeerImage} from '../../types/cms';
import {IHeroFields, IPeerImageFields} from '../../types/cms/generated/contentful';
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

  public getHeroImage = async (): Promise<HeroImage> => {
    const data: EntryCollection<IHeroFields> = await this.client.getEntries({
      content_type: ContentTypeQuery.HERO,
    });

    return data.items[0].fields.heroImage;
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
