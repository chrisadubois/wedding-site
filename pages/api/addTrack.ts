// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {addTrack} from '../../lib/spotify';

const handler = async (_req: NextApiRequest, res: NextApiResponse<any>) => {
  const response = await addTrack('63zaytd1HcY5YYOt2IFOLw', '3TEbThqomZVo8Fpe5TiWfW');
  const data = await response.json();

  return res.status(200).json(data);
};

export default handler;
