"use client";
import { prisma } from "@/prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { TTodo } from "./add/page";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

type TodoGet = TTodo & {
  id: number;
};
const TodoPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<TodoGet[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("http://localhost:3000/api/todo").then((res) => res.json()),
  });
  const Delete = async (todoId: number) => {
    const response = await axios.delete(
      `http://localhost:3000/api/todo/${todoId}`
    );
    if (response.status === 200) {
      toast.success("Delete Success");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-stars bg-cover">
      <div className="flex  justify-start flex-wrap content-start items-start gap-5 w-[95vw] h-[90vh] border-blue-500 bg-white/40 rounded-lg backdrop-filter background-blur-lg px-5 py-5">
        {isLoading && <p>Loading...</p>}
        {data?.map((todo) => (
          <div
            key={todo.id}
            className="flex flex-col  justify-center item-center  gap-1 px-2  w-44 h-fit bg-white/50 rounded-lg backdrop-filter background-blur-sm "
          >
            <div className="w-full h-fit bg-white rounded-lg py-1 px-2 my-2 ">
              <h5 className="font-bold text-center text-black font-mono ">
                {todo.title}
              </h5>
            </div>
            <div className="w-full h-full bg-white rounded-lg py-1 px-2 my-2">
              <p className="text-slate-500 text-justify">{todo.description}</p>
            </div>
            <div className="w-full h-fit flex justify-between items-center gap-1 bg-white rounded-lg py-1 px-2 mb-2 ">
              <h6 className="font-bold text-center text-sm font-mono ">
                {todo.status}
              </h6>

              <Link href={`/todo/${todo.id}`}>
                <FaRegEdit size={20} color="blue" className="cursor-pointer" />
              </Link>

              <button
                className=" bg-white/0 rounded-lg text-white"
                onClick={() => Delete(todo.id)}
              >
                <MdDelete size={20} color="red" className="cursor-pointer" />
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-center item-center  gap-1 px-2  w-44 h-44 bg-white/50 rounded-lg backdrop-filter background-blur-sm ">
          <Link href={"/todo/add"}>
            <IoMdAddCircle
              size={30}
              color="blue"
              className="cursor-pointer mt-5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TodoPage;
