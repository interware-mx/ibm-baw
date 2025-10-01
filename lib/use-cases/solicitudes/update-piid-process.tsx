// 📖 lib
import { PostRequest } from "@/lib/api/api.client";

// 🧾 Types
import type { UpdatePiidprocesses } from "@/types/solicitudes/solicitud";

export const updatePiidProcess = async (payload: UpdatePiidprocesses) => {
  const { data } = await PostRequest({
    url: "/api/ibm-baw/update-piid-process",
    data: payload,
  });

  return data;
};
