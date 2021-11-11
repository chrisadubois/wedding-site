// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {getPlaylist} from '../../lib/spotify';

const handler = async (_req: NextApiRequest, res: NextApiResponse<any>) => {
  const response = await getPlaylist('63zaytd1HcY5YYOt2IFOLw');
  const data = await response.json();

  return res.status(200).json(data);
};

export default handler;
