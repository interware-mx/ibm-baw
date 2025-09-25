"use client";

// 📦 Dependencies
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// 🧾 Types
interface tableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catalog: any | undefined;
}
// 🔁 Hooks
import useTableConfig from "@/hooks/solicitudes/solicitud/useTableUpload";

// 🧩 Components / Containers
import Table from "@/components/commons/generic-table";

const TablaUpload = ({ catalog }: tableProps) => {
  // 🔁 Hooks
  const { columns } = useTableConfig();

  // ⚙️ Config
  const table = useReactTable({
    columns: columns as ColumnDef<unknown>[],
    data: catalog ?? [],
    enableRowSelection: true,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row: unknown) => (row as { documentId: string })?.documentId,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <section className="mt-2">
      <Table table={table} tableData={catalog} />
    </section>
  );
};

export default TablaUpload;
