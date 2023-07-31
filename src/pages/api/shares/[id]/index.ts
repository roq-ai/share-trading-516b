import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { sharesValidationSchema } from 'validationSchema/shares';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.shares
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSharesById();
    case 'PUT':
      return updateSharesById();
    case 'DELETE':
      return deleteSharesById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSharesById() {
    const data = await prisma.shares.findFirst(convertQueryToPrismaUtil(req.query, 'shares'));
    return res.status(200).json(data);
  }

  async function updateSharesById() {
    await sharesValidationSchema.validate(req.body);
    const data = await prisma.shares.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSharesById() {
    const data = await prisma.shares.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
