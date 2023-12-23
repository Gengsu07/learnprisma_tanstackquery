import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface UserId {
  params: { id: string };
}

export async function DELETE(req: NextRequest, { params: { id } }: UserId) {
  const body = await req.json();
  if (!body) return NextResponse.json({ error: "No Data passed" });
  const deletedUser = await prisma.user.delete({
    where: {
      id: +id,
    },
  });

  return NextResponse.json(deletedUser);
}
