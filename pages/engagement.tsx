import {ReactElement} from 'react';
import Images from '../components/Images';
import {cms} from '../common/cms';
import {getSerializableEnvironment} from '../common/env';
import {EngagementGallery} from '../types/cms';

export async function getStaticProps() {
  const environmentVariables = getSerializableEnvironment(process.env);
  const cmsClient = cms.getInstance(environmentVariables);
  const galleryData = await cmsClient.getEngagementData();

  return {
    props: {
      galleryData: galleryData,
    },
    revalidate: 60 * 60, // 60 seconds --> 3600 seconds = 1 hour
  };
}

const Engagement = ({galleryData}: {galleryData: EngagementGallery}) => {
  return (
    <>
      <Images images={galleryData} />
    </>
  );
};

export default Engagement;
