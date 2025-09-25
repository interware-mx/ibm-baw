// 📦 Dependencies
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

// 🧾 Types
import { DocumentosAsociadosProps } from "@/types/solicitudes/solicitud";

const useTableUpload = () => {
  // 📊 Setup de la tabla
  const columnHelper = createColumnHelper<DocumentosAsociadosProps>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("nombre", {
        id: "nombre",
        cell: (info) => info.getValue(),
        header: "Nombre",
        size: 800,
      }),
      columnHelper.accessor("url", {
        id: "url",
        cell: (info) => info.getValue(),
        header: "Archivo",
        size: 100,
      }),
      columnHelper.accessor("version", {
        id: "version",
        cell: (info) => info.getValue(),
        header: "Versión",
        size: 100,
      }),
      columnHelper.accessor("modificacion", {
        id: "modificacion",
        cell: (info) => info.getValue(),
        header: "Ultima modificación",
        size: 100,
      }),
      columnHelper.accessor("modificado", {
        id: "modificado",
        cell: (info) => info.getValue(),
        header: "Modificado por",
        size: 100,
      }),
    ],
    [columnHelper],
  );

  return { columns };
};

export default useTableUpload;
