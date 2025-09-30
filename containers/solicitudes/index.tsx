"use client";

// 📦 Dependencies
import dynamic from "next/dynamic";

// 🌐 Context
import { useFilterSolicitudesContext } from "@/context/solicitudes/filter-solicitudes-context";

// 🧩 Components / Containers
import Header from "@/components/solicitudes/filters-section-header";
const Table = dynamic(() => import("@/components/commons/generic-table"), {
  ssr: false,
});

const Solicitudes = () => {
  // 🌐 Context
  const {
    table,
    tableRef,
    handleDownload,
    isLoadingDownload,
    catalog,
    isLoading,
  } = useFilterSolicitudesContext();

  // 🧾 Render
  return (
    <section className="mt-2">
      <Header />
      <Table
        ref={tableRef}
        table={table}
        tableData={catalog}
        isLoading={isLoading}
        downloadLabel="Descargar"
        downloadAction={handleDownload}
        downloadLoader={isLoadingDownload}
      />
    </section>
  );
};

export default Solicitudes;
