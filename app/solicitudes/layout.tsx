// 🧩 Components / Containers
import Breadcrumb from "@/components/commons/breadcrumb";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main role="main" className="container-fluid mb-4">
      <div className="row d-flex align-items-center mt-3">
        <div className="col">
          <Breadcrumb />
        </div>
      </div>
      {children}
    </main>
  );
}

export default Layout;
