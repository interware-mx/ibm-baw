// 📦 Dependencies
import {
  PropsWithChildren,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useRef,
} from "react";

// 🧾 Types
import { GenericModal } from "@/types/commons/commons";

// 🧩 Components / Containers
import LoadingSpinner from "@/components/commons/loading-spinner";

const Modal = ({
  children,
  closeAction,
  closeDisabled = false,
  closeLabel,
  dismissAction,
  dismissible = true,
  isLoading = false,
  modalId,
  okAction,
  okDisabled = false,
  okLabel,
  size,
  title,
}: PropsWithChildren<GenericModal>): ReactElement => {
  // 🔁 Hooks
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // ⚙️ Funciones
  const blurFocusedElement = () => {
    const focusedElement = document
      .getElementById(modalId)
      ?.querySelector(":focus");
    if (focusedElement instanceof HTMLElement) {
      focusedElement.blur();
    }
  };
  const innerOkAction = (e: SyntheticEvent) => {
    e.preventDefault();
    if (okAction) {
      blurFocusedElement();
      okAction();
    }
  };
  const innerCloseAction = (e: SyntheticEvent) => {
    e.preventDefault();
    if (closeAction) {
      blurFocusedElement();
      closeAction();
    }
  };
  const innerDismissAction = (e: SyntheticEvent) => {
    e.preventDefault();
    if (dismissAction) {
      blurFocusedElement();
      dismissAction();
    }
  };
  const parsedSize = ` ${size}`;

  // 🔄 useEffects
  useEffect(() => {
    if (closeButtonRef.current) {
      if (closeLabel === "Corregir") {
        closeButtonRef.current.removeAttribute("data-bs-dismiss");
      } else {
        closeButtonRef.current.setAttribute("data-bs-dismiss", "modal");
      }
    }
  }, [closeLabel]);

  return (
    <div
      className="modal fade"
      id={modalId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className={`modal-dialog${size ? parsedSize : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <span
              className="modal-title fs-5 fw-semibold"
              id={`${modalId}Label`}
            >
              {title}
            </span>
            {(dismissible || dismissAction) && (
              <button
                id="close-modal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={innerDismissAction}
              ></button>
            )}
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <div className="row g-0 justify-content-end m-0 p-0 mt-3">
              <div className="col-auto">
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  data-bs-dismiss="modal"
                  onClick={innerCloseAction}
                  disabled={closeDisabled}
                >
                  {closeLabel}
                </button>
              </div>
              <div className="col-auto ms-3">
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={innerOkAction}
                  disabled={okDisabled}
                >
                  <LoadingSpinner
                    label={okLabel}
                    isLoading={isLoading}
                    textColor="text-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
