import { prisma } from "@/prisma/client";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface User {
  email: string;
  name: string;
  role: Role;
}
export async function POST(req: NextRequest) {
  const body: User = await req.json();
  if (!body) return NextResponse.json({ error: "No Data passed" });

  const { email, name, role = "USER" } = body;
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      role,
    },
  });
  return NextResponse.json(newUser);
  //   const newUsers = await prisma.user.createMany({
  //     data: body.map((user) => ({
  //       email: user.email,
  //       name: user.name,
  //       role: user.role || "USER",
  //     })),
  //   });
}
