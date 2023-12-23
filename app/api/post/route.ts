import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const post = await prisma.post.findMany({
    where: {
      author: {
        isNot: {
          name: "Jack",
        },
        is: {
          email: {
            startsWith: "s",
          },
        },
      },
    },
    select: {
      title: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return NextResponse.json(post);
}
