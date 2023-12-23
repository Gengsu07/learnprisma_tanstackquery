import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const groupby = await prisma.post.groupBy({
    by: ["authorId"],
    _sum: {
      likeNum: true,
    },
    _count: {
      id: true,
    },
    _avg: {
      likeNum: true,
    },
  });
  return NextResponse.json(groupby);
}
