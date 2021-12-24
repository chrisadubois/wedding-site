// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {getPlaylistItems} from '../../lib/spotify';
import AuthGuard from '../../middleware/AuthGuard';

const handler = async (_req: NextApiRequest, res: NextApiResponse<any>) => {
  const response = await getPlaylistItems('63zaytd1HcY5YYOt2IFOLw');
  const data = await response.json();

  return res.status(200).json(data);
};

export default AuthGuard(handler);
