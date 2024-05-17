import prisma from "../../../../db/db.config";

export async function POST(request: Request, response: Response) {
  const { email } = await request.json();
  if (!email) {
    return new Response("No email found", { status: 400 });
  }

  try {
    const existingUser = await prisma.subscribers.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new Response("user already subscribed", { status: 400 });
    } else {
      const user = await prisma.subscribers.create({
        data: {
          email: email,
        },
      });
      return new Response("success", { status: 200 });
    }
  } catch (err) {
    console.log(err);
  }
}
