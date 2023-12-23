import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  //   const pagenum = +(searchParams.get("pagenum") || 1);
  const cursor = +(searchParams.get("cursor") || 1);
  const pagesize = +(searchParams.get("pagesize") || 3);

  const pagination = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    cursor: {
      id: cursor,
    },
    take: pagesize,
  });
  return NextResponse.json(pagination);
}
