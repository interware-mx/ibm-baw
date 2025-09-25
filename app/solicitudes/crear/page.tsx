// 🌐 Context
import { SolicitudCreateProvider } from "@/context/solicitudes/solicitud-create-context";

// 🧩 Components / Containers
import CrearCont from "@/containers/solicitudes/crear-cont";

const Crear = () => {
  return (
    <SolicitudCreateProvider>
      <CrearCont />;
    </SolicitudCreateProvider>
  );
};

export default Crear;
