// 📦 Dependencies
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

// 🌐 Context
import { SolicitudDetalleProvider } from "@/context/solicitudes/solicitud-detalle-context";

// 📖 lib
import { getQueryClient } from "@/lib/providers/get-query-client";
import { getPiidProcessOptions } from "@/lib/use-cases/solicitudes/get-piid-process";

// 🧩 Components / Containers
import DetalleCont from "@/containers/solicitudes/detalle-cont";

const Detalle = async ({ params }: { params: { [key: string]: string } }) => {
  const { piid } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    getPiidProcessOptions({ piid: piid.toString() }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SolicitudDetalleProvider piid={piid}>
        <DetalleCont />;
      </SolicitudDetalleProvider>
    </HydrationBoundary>
  );
};

export default Detalle;
