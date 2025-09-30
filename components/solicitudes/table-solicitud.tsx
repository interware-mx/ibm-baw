"use client";
// 🧾 Types
import { Tableprocesses } from "@/types/solicitudes/solicitud";

// 🌐 Context
import { useFilterSolicitudesContext } from "@/context/solicitudes/filter-solicitudes-context";

// 🧩 Components / Containers
import Table from "@/components/commons/generic-table";
import Header from "@/components/solicitudes/filters-section-header";

const TablaSolicitudes = ({
  catalog,
}: {
  catalog: Tableprocesses | undefined;
}) => {
  const { table, tableRef, handleDownload, isLoadingDownload } =
    useFilterSolicitudesContext();

  // 🧾 Render
  return (
    <section className="mt-2">
      <Header />
      <Table
        ref={tableRef}
        table={table}
        tableData={catalog}
        downloadLabel="Descargar"
        downloadAction={handleDownload}
        downloadLoader={isLoadingDownload}
      />
    </section>
  );
};

export default TablaSolicitudes;
