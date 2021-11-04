import {createClient, EntryCollection} from 'contentful';

import {Asset} from 'contentful';
import {ContentTypeQuery, ICMS} from '../../types/cms';
import {IHero} from '../../types/cms/generated/contentful';

export class cms implements ICMS {
  private client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  public getHeroImage = async (): Promise<Asset | undefined> => {
    const data: EntryCollection<IHero> = await this.client.getEntries({
      content_type: ContentTypeQuery.HERO,
    });

    console.log(data.items[0]);

    return data.items[0];
  };
}
