// 📖 lib
import { GetRequest } from "@/lib/api/api.client";

// 🧾 Types
import type { Tableprocesses } from "@/types/solicitudes/solicitud";

export const fetchPiidProcesses = async (): Promise<Tableprocesses> => {
  const { data } = await GetRequest({
    url: "/api/ibm-baw/get-piid-processes",
  });

  return data;
};
