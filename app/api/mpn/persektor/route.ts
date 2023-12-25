import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const perSektor = await prisma.mpn.groupBy({
    by: ["nm_kategori", "map"],
    _sum: {
      nominal: true,
    },
    orderBy: {
      _sum: {
        nominal: "desc",
      },
    },
  });
  return NextResponse.json(perSektor);
}
