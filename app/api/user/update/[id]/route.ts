import { prisma } from "@/prisma/client";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface User {
  email?: string;
  name?: string;
  role?: Role;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body: User = await req.json();
  if (!body) return NextResponse.json({ error: "No Data passed" });

  const { email, name, role = "USER" } = body;
  const updatedUser = await prisma.user.update({
    where: {
      id: +params.id,
    },
    data: {
      email,
      name,
      role,
    },
  });
  return NextResponse.json(updatedUser);
}
