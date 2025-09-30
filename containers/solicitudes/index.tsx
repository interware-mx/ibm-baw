"use client";

// 🧩 Components / Containers
import TableSolicitud from "@/components/solicitudes/table-solicitud";

// 🌐 Context
import { FilterSolicitudesProvider } from "@/context/solicitudes/filter-solicitudes-context";

// 🧾 Types
import { Tableprocesses } from "@/types/solicitudes/solicitud";

const Solicitudes = ({ catalog }: { catalog: Tableprocesses | undefined }) => {
  return (
    <FilterSolicitudesProvider data={catalog?.data?.data?.processes ?? []}>
      <TableSolicitud catalog={catalog} />
    </FilterSolicitudesProvider>
  );
};

export default Solicitudes;
