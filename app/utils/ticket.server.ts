import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const ticket = z.object({
	name: z.string(),
	email: z.string().email(),
	issue: z.string(),
});

export type Ticket = z.infer<typeof ticket>;

export async function createTicket(ticketInput: Ticket) {
	return await prisma.ticket.create({ data: { ...ticketInput } });
}
