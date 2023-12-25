"use client";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import { getMPN } from "./services/api";
import { mpn } from "@prisma/client";

export default function Home() {
  const { data } = useQuery<mpn[]>({
    queryKey: ["mpn"],
    queryFn: getMPN,
  });
  return (
    <main>
      <ul>
        {data?.map((mpn) => (
          <li key={mpn.id}>{mpn.datebayar}</li>
        ))}
      </ul>
    </main>
  );
}
