import { newsletterSchema } from "@/lib/api-schemas";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const payload = newsletterSchema.safeParse(await request.json());

  if (!payload.success) {
    return Response.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const email = payload.data.email.toLowerCase();

  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  return Response.json({ message: "Subscribed successfully" });
}
