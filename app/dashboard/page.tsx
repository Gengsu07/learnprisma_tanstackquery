"use client";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./datatable";
import { columns } from "./columns";

interface Persektor {
  _sum: { nominal: number };
  nm_kategori: string;
  map: string;
}

export interface mpnSliced {
  id: number;
  npwp15: string;
  map: string;
  nm_kategori: string;
  nominal: number;
  datebayar: Date;
}
const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery<mpnSliced[]>({
    queryKey: ["mpn"],
    queryFn: () =>
      fetch("http://localhost:3000/api/mpn").then((res) => res.json()),
    select: (mpn) =>
      mpn.map((rowdata) => ({
        id: rowdata.id,
        npwp15: rowdata.npwp15,
        datebayar: rowdata.datebayar,
        map: rowdata.map,
        nm_kategori: rowdata.nm_kategori,
        nominal: rowdata.nominal,
      })),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div>
      {/* {data?.map((mpn) => (
        <li key={mpn.id}>{mpn.npwp15}</li>
      ))} */}
      <DataTable columns={columns} data={data!} />
    </div>
  );
};
export default Dashboard;

//   const { data: dataSektor } = useQuery<Persektor[]>({
//     queryKey: ["sektor"],
//     queryFn: () =>
//       fetch("http://localhost:3000/api/mpn/persektor").then((res) =>
//         res.json()
//       ),
//     enabled: !!dataMPN,
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }
//   console.log(dataMPN);
