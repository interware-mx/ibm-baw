// 📦 Dependencies
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import moment from "moment";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

// 🧾 Types
import { Process } from "@/types/solicitudes/solicitud";

const useTableSolicitudes = () => {
  const router = useRouter();

  // 📊 Setup de la tabla
  const columnHelper = createColumnHelper<Process>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("projectID", {
        id: "projectID",
        cell: (info) => info.getValue(),
        header: "Núm. de solicitud",
        size: 800,
      }),
      columnHelper.accessor("bpdName", {
        id: "bpdName",
        cell: (info) => info.getValue(),
        header: "Código del material",
        size: 100,
      }),
      columnHelper.accessor("creationDate", {
        id: "creationDate",
        header: "Fecha de creación",
        size: 100,
        cell: (info) => {
          const value = info.getValue() as string;
          const formattedDate = moment(value).format("YYYY-MM-DD");
          return <span>{formattedDate}</span>;
        },
      }),
      columnHelper.accessor("username", {
        id: "username",
        cell: "BGonzalez",
        header: "Usuario",
        size: 100,
      }),
      columnHelper.accessor("executionState", {
        id: "executionState",
        header: "Estatus",
        size: 100,
        cell: (info) => {
          const value = info.getValue();

          return (
            <span
              className={classNames({
                "text-dark fw-bold": value === "Active",
                "text-iw-blue": value === "Aprobada",
                "text-danger": value === "Rechazada",
              })}
            >
              {value}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "acciones",
        cell: (info) => (
          <div className="row justify-content-start">
            <div className="col-auto justify-content-center">
              <button
                className="btn btn-link text-primary p-0 d-inline-flex align-items-center gap-1"
                onClick={() => {
                  router.push(`/solicitudes/detalle/${info.row.original.piid}`);
                }}
              >
                <i className="bi bi-eye-fill h4 m-0"></i>
                <span>Revisar solicitud</span>
              </button>
            </div>
          </div>
        ),
        header: "Acciones",
      }),
    ],
    [columnHelper, router],
  );

  return { columns };
};

export default useTableSolicitudes;
