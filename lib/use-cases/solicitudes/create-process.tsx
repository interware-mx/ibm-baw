// 📖 lib
import { PostRequest } from "@/lib/api/api.client";

// 🧾 Types
import type { formSolicitud } from "@/types/solicitudes/solicitud";

export const createProcess = async (payload: formSolicitud) => {
  const { data } = await PostRequest({
    url: "/api/ibm-baw/create-process",
    data: payload,
  });

  return data;
};
