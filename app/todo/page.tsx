"use client";
import { useQuery } from "@tanstack/react-query";
import { TTodo } from "./add/page";

const TodoPage = () => {
  const { data, isLoading, error } = useQuery<TTodo[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("http://localhost:3000/api/todo").then((res) => res.json()),
  });
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {data?.map((todo, index) => (
        <div
          key={index}
          className="flex  justify-center items-center gap-10 w-48  bg-slate-500 rounded-lg "
        >
          <div className="flex flex-col gap-5 items-center justify-center">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TodoPage;
