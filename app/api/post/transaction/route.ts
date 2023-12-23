import { prisma } from "@/prisma/client";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface User {
  id: string;
  email?: string;
  name?: string;
  role?: Role;
}

export async function POST(req: NextRequest) {
  const body: User = await req.json();
  if (!body) return NextResponse.json({ error: "No Data passed" });

  const { id, email, name, role = "USER" } = body;

  //tidak pakai await karena kita hanya ingin promise saja
  const updatedUser = prisma.user.update({
    where: {
      id: +id,
    },
    data: {
      email,
      name,
      role,
    },
  });
  const updatedPost = prisma.post.updateMany({
    where: {
      authorId: +id,
    },
    data: {
      likeNum: {
        increment: 10,
      },
    },
  });

  const result = await prisma.$transaction([updatedUser, updatedPost]);
  return NextResponse.json(result);
}
