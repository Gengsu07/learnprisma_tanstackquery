"use client";

import { mpn } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { mpnSliced } from "./page";

export const columns: ColumnDef<mpnSliced>[] = [
  {
    accessorKey: "npwp15",
    header: "NPWP",
  },
  {
    accessorKey: "kdmap",
    header: "MAP",
  },
  {
    accessorKey: "nm_kategori",
    header: "Sektor",
  },
  {
    accessorKey: "datebayar",
    header: "Tanggal Bayar",
  },
  {
    accessorKey: "nominal",
    header: "Nominal",
  },
];
