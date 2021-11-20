// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {addTrack} from '../../lib/spotify';

const handler = async (_req: NextApiRequest, res: NextApiResponse<any>) => {
  const trackUri = _req.body?.uri;
  if (trackUri && typeof trackUri === 'string') {
    const response = await addTrack('63zaytd1HcY5YYOt2IFOLw', trackUri);
    const data = await response.json();
    return res.status(200).json(data);
  }

  return res.status(400).json(new Error('Missing parameters'));
};

export default handler;
