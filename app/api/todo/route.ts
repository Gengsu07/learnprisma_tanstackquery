import { Ztodo } from "@/app/types/todo";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body) return null;

  const todo = Ztodo.safeParse(body);

  let zodErrors = {};
  if (!todo.success) {
    todo.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json({ errors: zodErrors });
  }

  const { title, description, status } = body;
  try {
    const createdTodo = await prisma.todo.create({
      data: {
        title,
        description,
        status,
      },
    });

    return NextResponse.json(createdTodo);
  } catch (error) {
    return NextResponse.json({ error: "Failed Submit Todo" }, { status: 400 });
  }
}

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}
