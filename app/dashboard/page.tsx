"use client";
import { useQuery } from "@tanstack/react-query";

interface Persektor {
  _sum: { nominal: number };
  nm_kategori: string;
  map: string;
}

interface mpnSliced {
  id: number;
  npwp15: string;
  map: string;
  nm_kategori: string;
  nominal: number;
  datebayar: Date;
}
const Dashboard = () => {
  const {
    data: dataMPN,
    isLoading,
    isError,
    error,
  } = useQuery<mpnSliced[]>({
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

  const { data: dataSektor } = useQuery<Persektor[]>({
    queryKey: ["sektor"],
    queryFn: () =>
      fetch("http://localhost:3000/api/mpn/persektor").then((res) =>
        res.json()
      ),
    enabled: !!dataMPN,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full  gap-5 mx-5">
      <div className="flex flex-col items-center justify-center w-full  gap-5 mt-5">
        <h1 className="text-2xl font-bold  mx-auto w-full text-center">MPN</h1>
        <table className="table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 max-w-full">
            <tr>
              <th scope="col" className="px-6 py-3">
                Datebayar
              </th>
              <th scope="col" className="px-6 py-3">
                NPWP
              </th>
              <th scope="col" className="px-6 py-3">
                MAP
              </th>
              <th scope="col" className="px-6 py-3">
                Sektor
              </th>
              <th scope="col" className="px-6 py-3">
                Nominal
              </th>
            </tr>
          </thead>
          <tbody>
            {dataMPN?.map((mpn) => (
              <tr
                key={mpn.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  {mpn.datebayar
                    ? new Date(mpn.datebayar).toLocaleDateString("id")
                    : ""}
                </td>
                <td className="px-6 py-4">{mpn.npwp15}</td>
                <td className="px-6 py-4">{mpn.map}</td>
                <td className="px-6 py-4">{mpn.nm_kategori}</td>
                <td className="px-6 py-4 text-right">
                  {mpn?.nominal?.toLocaleString("id")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-center w-full  gap-5 mt-5">
        <h1 className="text-2xl font-bold  mx-auto w-full text-center">
          Per Sektor
        </h1>
        <table className="table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 max-w-full">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sektor
              </th>
              <th scope="col" className="px-6 py-3">
                MAP
              </th>
              <th scope="col" className="px-6 py-3">
                NOMINAL
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSektor?.map((sektor, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{sektor.nm_kategori}</td>
                <td className="px-6 py-4">{sektor.map}</td>
                <td className="px-6 py-4">
                  {sektor._sum?.nominal.toLocaleString("id")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Dashboard;
