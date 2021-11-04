import {createClient, EntryCollection} from 'contentful';

import {ContentTypeQuery, HeroImage, ICMS} from '../../types/cms';
import {IHeroFields} from '../../types/cms/generated/contentful';

console.log('commonenv', process.env);
export class cms implements ICMS {
  private client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  public getHeroImage = async (): Promise<HeroImage> => {
    const data: EntryCollection<IHeroFields> = await this.client.getEntries({
      content_type: ContentTypeQuery.HERO,
    });

    return data.items[0].fields.heroImage;
  };
}
