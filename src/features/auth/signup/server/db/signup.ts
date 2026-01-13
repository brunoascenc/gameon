import prisma from "@/lib/prisma";

export async function checkUsernameDb(username: string) {
  return prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
    },
  });
}
