// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {getSearchTracks} from '../../lib/spotify';
import AuthGuard from '../../middleware/AuthGuard';

const handler = async (_req: NextApiRequest, res: NextApiResponse<any>) => {
  const response = await getSearchTracks(_req.body);

  const data = await response.json();

  return res.status(200).json(data);
};

export default AuthGuard(handler);
