-- CreateTable
CREATE TABLE "mpn" (
    "admin" TEXT,
    "kdmap" TEXT,
    "kdbayar" TEXT,
    "masa" TEXT,
    "masa2" TEXT,
    "tahun" TEXT,
    "tanggalbayar" INTEGER,
    "bulanbayar" INTEGER,
    "tahunbayar" INTEGER,
    "datebayar" DATE,
    "nominal" REAL,
    "ket" TEXT,
    "seksi" TEXT,
    "segmentasi_wp" TEXT,
    "jenis_wp" TEXT,
    "nama_klu" TEXT,
    "kd_kategori" TEXT,
    "nm_kategori" TEXT,
    "nm_golpok" TEXT,
    "map" TEXT,
    "npwp15" TEXT,
    "nama_wp" TEXT,
    "nama_ar" TEXT,
    "ntpn" TEXT,
    "id" INTEGER NOT NULL,

    CONSTRAINT "mpn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
