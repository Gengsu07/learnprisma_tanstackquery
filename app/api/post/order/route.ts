import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
export async function GET() {
  const order = await prisma.post.findMany({
    orderBy: {
      likeNum: "desc",
    },
  });
  return NextResponse.json(order);
}
