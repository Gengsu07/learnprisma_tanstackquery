import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const post = await prisma.post.findMany();
  return NextResponse.json(post);
}
