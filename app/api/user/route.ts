import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  //find user yang semua status posnya sudah published
  const usersPublished = await prisma.user.findMany({
    where: {
      posts: {
        every: {
          published: true,
        },
      },
    },
  });

  //find user yang some status posnya sudah published/ at least 1
  // const usersPublished = await prisma.user.findMany({
  //   where: {
  //     posts: {
  //       some: {
  //         published: true,
  //       },
  //     },
  //   },
  // });

  //find user yang none status posnya sudah published/
  //   const usersPublished = await prisma.user.findMany({
  //     where: {
  //       posts: {
  //         none: {
  //           published: true,
  //         },
  //       },
  //     },
  //   });

  return NextResponse.json(usersPublished);
}
