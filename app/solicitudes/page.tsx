"use client";

// 🧩 Components / Containers
import SolicitudesCom from "@/containers/solicitudes";
import { useQuery } from "@tanstack/react-query";
import { GetRequest } from "@/lib/api/api.client";
import { Tableprocesses } from "@/types/solicitudes/solicitud";

export const fetchUsers = async (): Promise<Tableprocesses> => {
  const { data } = await GetRequest({
    url: "/api/ibm-baw/get-piid-processes",
  });
  return data;
};

export default function Solicitudes() {
  const { data, isLoading, isError, error } = useQuery<Tableprocesses>({
    queryKey: ["piid-processes"],
    queryFn: fetchUsers,
  });

  console.log("🚀 ~ Solicitudes ~ fetchPiidProcesses:", data);

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error: {`${error}`}</p>;

  return (
    <section>
      <SolicitudesCom catalog={data} />
    </section>
  );
}
