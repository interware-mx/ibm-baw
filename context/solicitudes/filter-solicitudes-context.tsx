"use client";

// 📦 Dependencies
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

// 🔁 Hooks
import useTableConfig from "@/hooks/solicitudes/solicitud/useTableSolicitudes";

// 🧾 Types
import { Tableprocesses } from "@/types/solicitudes/solicitud";

// 🧷 Custom Types
interface FilterSolicitudesContext {
  table: ReturnType<typeof useReactTable>;
  tableRef: React.RefObject<HTMLDivElement | null>;
  isLoadingDownload?: boolean;
  handleDownload: () => void;
  catalog: Tableprocesses | undefined;
  isLoading: boolean;
}

interface FilterSolicitudesProvider {
  data: Tableprocesses | undefined;
  children: ReactNode;
  isLoading: boolean;
}

// 🌐 Context
export const FilterSolicitudesContext = createContext<
  FilterSolicitudesContext | undefined
>(undefined);

// 🌳 Provider
export const FilterSolicitudesProvider: React.FC<FilterSolicitudesProvider> = ({
  data,
  children,
  isLoading,
}) => {
  // 🔁 Hooks
  const { columns } = useTableConfig();

  const basicPagination = useMemo<PaginationState>(
    () => ({ pageIndex: 0, pageSize: 25 }),
    [],
  );
  const [isLoadingDownload, setIsLoadingDownload] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] =
    useState<PaginationState>(basicPagination);

  // 📊 Setup de la tabla
  const table = useReactTable({
    columns: columns as ColumnDef<unknown>[],
    data: data?.data?.data?.processes ?? [],
    enableRowSelection: true,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row: unknown) => (row as { documentId: string })?.documentId,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: { globalFilter, pagination },
  });

  const tableRef = useRef<HTMLDivElement>(null);

  // Reset al salir de viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          !entry.isIntersecting &&
          (pagination.pageIndex !== 0 ||
            pagination.pageSize !== 25 ||
            globalFilter.length)
        ) {
          setGlobalFilter("");
          setPagination(basicPagination);
        }
      },
      { threshold: 0.1 },
    );

    if (tableRef.current) observer.observe(tableRef.current);
    return () => observer.disconnect();
  }, [
    basicPagination,
    globalFilter.length,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  const handleDownload = useCallback(async () => {
    setIsLoadingDownload(true);

    try {
      // const contentDisposition = response.headers["content-disposition"];
      // let filename = "reporte.xlsx";
      // if (contentDisposition) {
      //   const filenameMatch = contentDisposition.match(
      //     /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
      //   );
      //   if (filenameMatch != null && filenameMatch[1]) {
      //     filename = filenameMatch[1].replace(/['"]/g, "");
      //   }
      // }
      // // Crear una URL para el blob
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // // Crear un enlace para la descarga
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", filename); // Usar el nombre del archivo obtenido
      // // Agregar el enlace al DOM y simular un clic para descargar
      // document.body.appendChild(link);
      // link.click();
      // // Eliminar el enlace del DOM
      // document.body.removeChild(link);
    } catch (e) {
      console.error("🚨 ~ handleDownload ~ e:", e);
    } finally {
      setIsLoadingDownload(false);
    }
  }, []);

  return (
    <FilterSolicitudesContext.Provider
      value={{
        table,
        tableRef,
        isLoading,
        catalog: data,
        isLoadingDownload,
        handleDownload,
      }}
    >
      {children}
    </FilterSolicitudesContext.Provider>
  );
};

/**
 * Hook para acceder al contexto
 */
export const useFilterSolicitudesContext = (): FilterSolicitudesContext => {
  const context = useContext(FilterSolicitudesContext);
  if (!context) {
    throw new Error(
      "useFilterSolicitudesContext must be used within a FilterSolicitudesProvider ",
    );
  }
  return context;
};
