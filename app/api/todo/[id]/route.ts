import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return null;
  const deletedTodo = await prisma.todo.delete({
    where: {
      id: +id,
    },
  });
  return NextResponse.json(deletedTodo);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  if (!body) return null;
  const { id, title, description, status } = body;
  if (!id) return null;

  const updatedTodo = await prisma.todo.update({
    where: {
      id: +id,
    },
    data: {
      title,
      description,
      status,
    },
  });
  return NextResponse.json(updatedTodo);
}

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return null;
  const selectedTodo = await prisma.todo.findUnique({
    where: {
      id: +id,
    },
  });
  return NextResponse.json(selectedTodo);
}
