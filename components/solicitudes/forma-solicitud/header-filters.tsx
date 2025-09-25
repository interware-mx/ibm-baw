// 📦 Dependencies
import React from "react";
import classNames from "classnames";

// 🧾 Types
import { HeaderFilterProps } from "@/types/solicitudes/solicitud";

const HeaderFilter = ({ text, buttons = [] }: HeaderFilterProps) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <span className="fs-6 fw-bold m-0">{text}</span>

      {buttons.length > 0 && (
        <div className="d-flex gap-2">
          {buttons.map((btn, index) => (
            <button
              key={index}
              type="button"
              onClick={btn.onClick}
              disabled={btn.disabled}
              data-bs-toggle={btn.modalTargetId ? "modal" : ""}
              data-bs-target={`#${btn.modalTargetId}`}
              className={classNames(
                "btn border d-flex align-items-center gap-2",
                `btn-${btn.variant}`,
                {
                  "text-primary": btn.variant !== "primary",
                },
              )}
            >
              <span className="mx-4">{btn.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderFilter;
