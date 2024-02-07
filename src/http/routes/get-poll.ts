import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';

export async function getPoll(app: FastifyInstance) {
	app.get('/polls/:pollId', async (request, reply) => {
		const getPollParams = z.object({
			pollId: z.string().uuid()
		});
	
		const { pollId } = getPollParams.parse(request.params);
	
		const poll = await prisma.poll.findUnique({
			where: {
        id: pollId
      },
      include: {
        options: {
          select: {
            id: true,
            title: true
          }
        }
      } as never
		});
	
		return reply.send({ poll });
	});
}
