"use client";

// 📦 Dependencies
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Función para capitalizar la primera letra y eliminar guiones
const formatBreadcrumb = (text: string) => {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const slugRoutes = ["agregar", "detalle", "eliminar", "modificar"];

export default function Breadcrumb() {
  // 🔁 Hooks
  const pathname = usePathname();

  // 🔘 State
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  // 🔄 useEffects
  useEffect(() => {
    if (pathname) {
      let paths = pathname.split("/").filter((x) => x);

      const option = slugRoutes
        .map((path) => paths.find((el) => el === path))
        .filter((el) => el !== undefined)
        .pop();

      if (option && paths.includes(option)) {
        paths = paths.slice(0, paths.indexOf(option) + 1);
      }

      setBreadcrumb(paths);
    }
  }, [pathname]);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li key="home" className="breadcrumb-item fw-semibold">
          <Link className="text-decoration-none link-iw-dark" href="/">
            Inicio
          </Link>
        </li>
        {breadcrumb.map((path, index) => {
          const pathName = formatBreadcrumb(path.split("?")[0]);
          const isLast = index === breadcrumb.length - 1;
          const href = `/${breadcrumb.slice(0, index + 1).join("/")}`;

          if (isLast) {
            return (
              <li
                key={index}
                className={`breadcrumb-item fw-semibold ${
                  isLast ? "active" : ""
                }`}
                aria-current={isLast ? "page" : undefined}
              >
                {pathName}
              </li>
            );
          }

          return (
            <li key={index} className="breadcrumb-item  fw-semibold">
              <Link className="text-decoration-none link-iw-dark" href={href}>
                {pathName}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
