import Link from "next/link";

const FiltersSectionHeader = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <span className="mb-0 fs-3 text-primary fw-semibold">Solicitudes</span>

      <div className="d-flex gap-2">
        <Link
          href="/solicitudes/crear"
          type="button"
          className="btn btn-outline-light border fw-bold text-primary d-flex align-items-center gap-2"
        >
          <i className="bi bi-pen fw-bold fs-4" />
          <span className="mx-4">Nueva</span>
        </Link>
        <button
          type="button"
          className="btn btn-outline-light border text-primary fw-bold d-flex align-items-center gap-2"
        >
          <i className="bi bi-funnel fw-bold fs-4" />
          <span className="mx-4">Filtrado</span>
        </button>
      </div>
    </div>
  );
};

export default FiltersSectionHeader;
