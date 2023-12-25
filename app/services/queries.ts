import { useQuery } from "@tanstack/react-query";
import getMPN from "./api";
import { mpn } from "@prisma/client";

export function useMPN() {
  return useQuery<any>({
    queryKey: ["mpn"],
    queryFn: getMPN,
  });
}
