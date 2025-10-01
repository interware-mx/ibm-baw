// 📦 Dependencies
import Link from "next/link";
import Image from "next/image";

export default async function Header() {
  return (
    <header>
      <nav className="navbar bg-white fixed-top position-fixed border-bottom">
        <div className="d-flex align-items-center gap-2 me-auto">
          <button
            className="btn btn-primary-outline border-0 p-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
            aria-expanded="false"
            joyride-beacon="offcanvas_btn--open"
          >
            <i className={`bi bi-filter-left text-primary fs-1`} />
          </button>
          <Link className="navbar-brand ps-3" href="/">
            <Image
              alt="Logo"
              src="/assets/images/logotipo.png"
              width={130}
              height={40}
              priority={true}
            />
          </Link>
        </div>
        <ul className="nav gap-4">
          <li className="nav-item">
            <span className="d-flex align-items-center gap-2">
              <i className="bi bi-person-circle fs-3" />
              <span className="d-flex flex-column">
                <span>BGonzalez</span>
                <small className="text-muted">32 cedis J7h5hf</small>
              </span>
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
