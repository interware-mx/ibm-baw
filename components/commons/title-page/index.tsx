// 🧾 Types
import { TitlePageProps } from "@/types/commons/commons";

export default function TitlePage({ text }: TitlePageProps) {
  return (
    <>
      <div className="row d-flex align-items-center p-1">
        <div className="col">
          <span className="fs-6 fw-bold m-0">{text}</span>
        </div>
      </div>
      <hr className="border-iw-gray-400 opacity-100 mt-2 mb-4" />
    </>
  );
}
