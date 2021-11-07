export type SerializableEnvironment = {
  cmsMgmtApiKey: string;
  cmsApiKey: string;
  cmsSpaceId: string;
  cmsPreviewApiKey: string;
  vercelEnv: string;
  mapsApiKey: string;
  cmsEnv: string;
};

export const getSerializableEnvironment = (env: any): SerializableEnvironment => {
  return {
    cmsMgmtApiKey: env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
    cmsApiKey: env.CONTENTFUL_ACCESS_TOKEN,
    cmsSpaceId: env.CONTENTFUL_SPACE_ID,
    cmsPreviewApiKey: env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    vercelEnv: env.VERCEL_ENV,
    mapsApiKey: env.MAPS_API_KEY,
    cmsEnv: env.CONTENTFUL_ENVIRONMENT,
  };
};
