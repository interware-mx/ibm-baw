// 📦 Dependencies
import { RefObject } from "react";
import { flexRender, Table } from "@tanstack/react-table";
import classNames from "classnames";

// 🔨 Utils
import { generatePages } from "@/lib/utils";

// 🧩 Components / Containers
import LoadingSpinner from "@/components/commons/loading-spinner";
import TableContentLoader from "@/components/commons/content-loader/table";

const TableGenerica = ({
  ref,
  table,
  tableData,
  downloadAction,
  downloadLabel,
  downloadLoader,
  isLoading,
}: {
  ref?: RefObject<HTMLDivElement | null>;
  table: Table<unknown>;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: any | undefined;
  downloadAction?: () => void;
  downloadLoader?: boolean;
  downloadLabel?: string;
}) => {
  const { pageIndex } = table.getState().pagination;

  const tablePageSize =
    table.getState().pagination.pageSize *
    (table.getState().pagination.pageIndex + 1);

  const pagesWithEllipses = generatePages(pageIndex, table.getPageCount() ?? 0);

  if (isLoading) {
    return <TableContentLoader style={{ width: "100%", height: "auto" }} />;
  }

  return (
    <>
      <div
        ref={ref}
        className="table-responsive overflow-visible shadow rounded-3"
      >
        <table
          id="generic-table"
          data-testid="generic-table"
          className="table table-striped"
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className="text-primary fw-semibold bg-iw-light-blue"
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        cursor: header.column.getCanSort()
                          ? "pointer"
                          : "default",
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {{
                        asc: <i className="bi bi-sort-up ms-2" />,
                        desc: <i className="bi bi-sort-down ms-2" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, indexCell) => {
                  const roundedClass = classNames({
                    "rounded-3 rounded-top-0 rounded-end-0 border-bottom-0":
                      index === table.getRowModel().rows.length - 1 &&
                      indexCell === 0,
                    "rounded-3 rounded-top-0 rounded-start-0 border-bottom-0":
                      index === table.getRowModel().rows.length - 1 &&
                      indexCell === row.getVisibleCells().length - 1,
                    "border-bottom-0":
                      index === table.getRowModel().rows.length - 1,
                  });
                  return (
                    <td
                      key={cell.id}
                      className={roundedClass}
                      style={{ verticalAlign: "middle" }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tableData?.data?.data?.overview?.Total && (
        <div className="row g-3 mx-0 mt-3 d-flex align-items-center">
          <div className="col-6 col-md-4 col-lg-3 col-xl-2 d-flex align-items-center">
            <select
              id="table-request-pageSize"
              data-testid="table-request-pageSize"
              className="form-select me-2 w-50"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span className="fs-6 fw-semibold mb-0 ms-2">
              {tableData &&
              tableData?.data?.data?.overview?.Total < tablePageSize
                ? tableData?.data?.data?.overview?.Total
                : tablePageSize}
              &nbsp;de {tableData?.data?.data?.overview?.Total}
            </span>
          </div>
          <div className="col-6 col-md-5 col-lg-6 col-xl-8">
            <nav
              className="d-flex justify-content-end justify-content-md-center"
              id="generic-table-pagination"
              data-testid="generic-table-pagination"
            >
              <ul className="pagination mb-0 justify-content-md-center">
                <li
                  className={`page-item ${
                    !table.getCanPreviousPage() && "disabled"
                  }`}
                >
                  <button
                    id="pagination-generic-table-previousPage"
                    data-testid="pagination-generic-table-previousPage"
                    className="page-link rounded-start-pill"
                    onClick={(e) => {
                      e.preventDefault();
                      table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                    type="button"
                  >
                    &lsaquo;
                  </button>
                </li>
                {pagesWithEllipses.map((page: string | number, idx: number) => (
                  <li
                    id={`page-generic-table-${idx}`}
                    data-testid={`page-generic-table-${idx}`}
                    key={`page-generic-table-${page}`}
                    className={`page-item ${
                      page === pageIndex ? "active" : ""
                    }`}
                  >
                    {page === "..." ? (
                      <span className="page-link">...</span>
                    ) : (
                      <button
                        id={`page-generic-table-btn-${idx}`}
                        data-testid={`page-generic-table-btn-${idx}`}
                        className="page-link"
                        onClick={(e) => {
                          e.preventDefault();
                          table.setPageIndex(page as number);
                        }}
                        type="button"
                        disabled={table.getPageCount() <= 1}
                      >
                        {(page as number) + 1}
                      </button>
                    )}
                  </li>
                ))}
                <li
                  className={`page-item ${
                    !table.getCanNextPage() && "disabled"
                  }`}
                >
                  <button
                    id="pagination-generic-table-nextPage"
                    data-testid="pagination-generic-table-nextPage"
                    className="page-link rounded-end-pill"
                    onClick={(e) => {
                      e.preventDefault();
                      table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                    type="button"
                  >
                    &rsaquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          {downloadAction && downloadLabel && (
            <div className="col-12 col-md-3 col-xl-2 d-flex justify-content-end">
              <a
                className="link-tw-blue-gem text-decoration-none fw-semibold d-flex justify-content-sm-between align-items-sm-center gap-2"
                data-testid="table-colaborador-download"
                id="table-download"
                onClick={downloadAction}
                role="button"
              >
                <i className="bi bi-download fw-semibold" />
                &nbsp;
                <LoadingSpinner
                  label={downloadLabel}
                  isLoading={downloadLoader ?? false}
                  textColor="text-tw-blue-gem"
                />
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TableGenerica;
