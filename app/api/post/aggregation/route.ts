import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const aggregation = await prisma.post.aggregate({
    _min: {
      likeNum: true,
    },
    _max: {
      likeNum: true,
    },
    _sum: {
      likeNum: true,
    },
    _avg: {
      likeNum: true,
    },
    _count: {
      id: true,
    },
  });
  return NextResponse.json(aggregation);
}
