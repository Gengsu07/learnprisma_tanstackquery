import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const mpn = await prisma.mpn.findMany({
    skip: 0,
    take: 20,
  });
  return NextResponse.json(mpn);
}
