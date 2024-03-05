import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getPogs(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const pogs = await prisma.pogs.findMany();
      res.status(200).json(pogs);
    } catch (error) {
      console.error('Error fetching pogs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
