import {createClient, EntryCollection} from 'contentful';

import {ContentTypeQuery, HeroImage, ICMS} from '../../types/cms';
import {IHeroFields} from '../../types/cms/generated/contentful';

console.log(
  'resolve here',
  process.env.VERCEL_ENV,
  process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  process.env.CONTENTFUL_ACCESS_TOKEN,
  process.env.CONTENTFUL_SPACE_ID
);

console.log(
  'theobjectPassed',
  JSON.stringify({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: (process.env.VERCEL_ENV === 'preview'
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN) as string,
    host: process.env.VERCEL_ENV === 'preview' ? 'preview.contentful.com' : 'cdn.contentful.com',
  })
);
export class cms implements ICMS {
  private client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: (process.env.VERCEL_ENV === 'preview'
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN) as string,
    host: process.env.VERCEL_ENV === 'preview' ? 'preview.contentful.com' : 'cdn.contentful.com',
  });

  public getHeroImage = async (): Promise<HeroImage> => {
    const data: EntryCollection<IHeroFields> = await this.client.getEntries({
      content_type: ContentTypeQuery.HERO,
    });

    return data.items[0].fields.heroImage;
  };
}
