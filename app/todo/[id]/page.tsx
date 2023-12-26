"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Ztodo } from "../../types/todo";

export type TTodo = z.infer<typeof Ztodo>;

const TodoForm = ({ params }: { params?: { id: string } }) => {
  const { data } = useQuery<Todo>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/todo/${params?.id}`).then((res) =>
        res.json()
      ),
  });
  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
  } = useForm<TTodo>({ resolver: zodResolver(Ztodo) });
  const router = useRouter();

  const onSubmit = async (data: TTodo) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/todo/${params?.id}`
      );
      if (response.status === 200) {
        router.push("/todo");
      }

      if (response.status !== 200) {
        reset();
        alert("Submitting form failed!");
        return;
      }
      reset();
    } catch (error) {
      throw Error;
    }
  };
  return (
    <div className=" flex flex-col  justify-center items-center w-screen h-screen bg-stars bg-cover">
      <div className="flex flex-col max-md:gap-2 lg:gap-5 items-center justify-center max-sm:w-[90%] sm:w-3/5 lg:w-3/5 h-fit  rounded-lg isolate bg-slate-500/30 ring-1 ring-white/30 shadow-lg backdrop-filter backdrop-blur-md  ">
        <h1 className="font-bold text-center text-white text-2xl font-mono mt-5 ">
          Edit Todo List
        </h1>
        <form
          className="flex flex-col gap-3 xl:gap-5 justify-center w-3/4 max-sm:w-full px-5 mb-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <input
            type="text"
            placeholder={data?.title}
            {...register("title")}
            className="px-3 py-3  outline-none border-none bg-white   rounded-md lg:py-5 "
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
          <textarea
            placeholder={data?.description}
            {...register("description")}
            rows={5}
            className="px-3 py-3  border-2 outline-none border-none bg-white  rounded-md lg:py-5"
          />
          <select
            className="px-3 py-3  border-2 outline-none border-none bg-white rounded-md lg:py-5"
            {...register("status")}
            defaultValue={data?.status}
          >
            <option value="NOT_STARTED" defaultValue="NOT_STARTED">
              Not Started
            </option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          <button
            className="bg-teal-500 hover:bg-teal-800 text-white py-5 px-5 rounded-xl cursor-pointer"
            disabled={isSubmitting}
          >
            Submit
          </button>
          {isSubmitting && (
            <p className="text-white font-mono text-center">
              Submitting...please wait
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
export default TodoForm;
