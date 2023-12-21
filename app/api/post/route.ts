import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const post = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: { contains: "github", mode: "insensitive" },
        },
        {
          title: { contains: "Twitter" },
        },
      ],
      AND: {
        published: true,
      },
    },
  });
  return NextResponse.json(post);
}
