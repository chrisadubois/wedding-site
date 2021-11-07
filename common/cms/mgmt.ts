import {createClient} from 'contentful-management';
import {AssetFileProp, EntryProps, KeyValueMap} from 'contentful-management/dist/typings/export-types';

export class mgmt {
  private client;
  private spaceId: string;

  constructor(apiKey: string, spaceId: string) {
    this.client = createClient({
      // This is the access token for this space. Normally you get the token in the Contentful web app
      accessToken: apiKey as string,
    });
    this.spaceId = spaceId;
  }

  async upload(file: any) {
    // This API call will request a space with the specified ID
    this.client.getSpace(this.spaceId).then((space) => {
      // This API call will request an environment with the specified ID
      space.getEnvironment('master').then((environment) => {
        environment
          .createEntry('peerImage', {
            fields: {
              title: {'en-US': 'Entry title'},
            },
            version: '1',
          } as Omit<EntryProps<KeyValueMap>, 'sys'>)
          .then((entry) => {
            entry.publish().then((entry) => {
              environment
                .createAssetFromFiles({
                  fields: {
                    title: {
                      'en-US': 'photo2.jpg',
                    },
                    description: {
                      'en-US': 'peer generated content',
                    },
                    file: {
                      'en-US': {
                        contentType: file.type,
                        fileName: 'photo2.jpg',
                        file,
                      },
                    },
                  },
                  version: '1',
                } as Omit<AssetFileProp, 'sys'>)
                .then((asset) => asset.processForAllLocales({processingCheckWait: 2000}))
                .then((asset) => asset.publish())
                .then((asset) => {
                  entry.fields['image'] = {
                    'en-US': {
                      sys: {
                        id: asset.sys.id,
                        linkType: 'Asset',
                        type: 'Link',
                      },
                    },
                  };
                  entry.update().then((entry) => entry.publish());
                });
            });
          });
      });
    });
  }
}
