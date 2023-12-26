"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { Ztodo } from "../../types/todo";

export type TTodo = z.infer<typeof Ztodo>;

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TTodo>({ resolver: zodResolver(Ztodo) });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: TTodo) => {
      return await axios.post("/api/todo", data);
    },
    onMutate: () => {
      toast.loading("Loading...");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Success", { duration: 5000 });
      reset();
      router.push("/todo");
    },
  });
  const onSubmit = async (data: TTodo) => {
    return mutation.mutate(data);
  };
  return (
    <div className=" flex flex-col  justify-center items-center w-screen h-screen bg-stars bg-cover">
      <div className="flex flex-col max-md:gap-2 lg:gap-5 items-center justify-center max-sm:w-[90%] sm:w-3/5 lg:w-3/5 h-fit  rounded-lg isolate bg-slate-500/30 ring-1 ring-white/30 shadow-lg backdrop-filter backdrop-blur-md  ">
        {mutation.isPending && <Toaster />}
        <h1 className="font-bold text-center text-white text-2xl font-mono mt-5 ">
          Input Todo List
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
            {...register("title")}
            placeholder="Title"
            className="px-3 py-3  outline-none border-none bg-white   rounded-md lg:py-5 "
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
          <textarea
            {...register("description")}
            placeholder="Descripton"
            rows={5}
            className="px-3 py-3  border-2 outline-none border-none bg-white  rounded-md lg:py-5"
          />
          <select
            className="px-3 py-3  border-2 outline-none border-none bg-white rounded-md lg:py-5"
            {...register("status")}
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
        </form>
      </div>
    </div>
  );
};
export default TodoForm;
