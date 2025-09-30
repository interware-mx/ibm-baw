"use client";

// 📦 Dependencies
import { useQuery } from "@tanstack/react-query";

// 📖 lib
import { fetchPiidProcesses } from "@/lib/use-cases/solicitudes/get-piid-processes";

// 🌐 Context
import { FilterSolicitudesProvider } from "@/context/solicitudes/filter-solicitudes-context";

// 🧾 Types
import { Tableprocesses } from "@/types/solicitudes/solicitud";

// 🧩 Components / Containers
import SolicitudesCom from "@/containers/solicitudes";

export default function Solicitudes() {
  const { data, isError, isLoading, error } = useQuery<Tableprocesses>({
    queryKey: ["piid-processes"],
    queryFn: fetchPiidProcesses,
  });

  if (isError) return <p>Error: {`${error}`}</p>;

  return (
    <FilterSolicitudesProvider data={data} isLoading={isLoading}>
      <SolicitudesCom />
    </FilterSolicitudesProvider>
  );
}
