// 📦 Dependencies
import { queryOptions } from "@tanstack/react-query";

// 📖 lib
import { PostRequest } from "@/lib/api/api.client";

const idProcess = async (payload: { piid: string }) => {
  const { data } = await PostRequest({
    url: "/api/ibm-baw/get-piid-process",
    data: payload,
  });

  return data;
};

export const getPiidProcessOptions = (payload: { piid: string }) =>
  queryOptions({
    queryKey: ["get-piid-process", payload],
    queryFn: () => idProcess(payload),
    enabled: !!payload,
  });
