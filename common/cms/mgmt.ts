import {createClient} from 'contentful-management';
import {AssetFileProp, EntryProps, KeyValueMap} from 'contentful-management/dist/typings/export-types';
import {v4} from 'uuid';

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
              title: {'en-US': 'Peer Content'},
            },
            version: '1',
          } as Omit<EntryProps<KeyValueMap>, 'sys'>)
          .then((entry) => {
            entry.publish().then((entry) => {
              environment
                .createAssetFromFiles({
                  fields: {
                    title: {
                      'en-US': 'Peer Content',
                    },
                    description: {
                      'en-US': 'peer generated content',
                    },
                    file: {
                      'en-US': {
                        contentType: file.type,
                        fileName: file.name || `peerContent-${v4()}`,
                        file,
                      },
                    },
                  },
                  version: '1',
                } as Omit<AssetFileProp, 'sys'>)
                .then((asset) => asset.processForAllLocales({processingCheckWait: 250}))
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
