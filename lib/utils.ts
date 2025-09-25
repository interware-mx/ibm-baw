// 📦 Dependencies
import classNames from "classnames";
import { FormikErrors, FormikTouched } from "formik";

export const validationClass = <T extends object>({
  touched,
  errors,
}: {
  touched: boolean | FormikTouched<T> | FormikTouched<T>[] | undefined;
  errors: string | string[] | FormikErrors<T> | FormikErrors<T>[] | undefined;
}) =>
  classNames("form-control", {
    "is-invalid was-validated": Boolean(touched && errors),
  });

export const generatePages = (pageIndex: number, pageCount: number) => {
  const pages = [0];

  for (
    let i = Math.max(1, pageIndex - 1);
    i <= Math.min(pageCount - 2, pageIndex + 1);
    i++
  ) {
    pages.push(i);
  }

  if (!pages.includes(pageCount - 1) && pageCount > 1) {
    pages.push(pageCount - 1);
  }

  pages.sort((a, b) => a - b);

  return pages.reduce((acc, page, index, arr) => {
    if (index > 0 && page - arr[index - 1] > 1) {
      acc.push("...");
    }
    acc.push(page);
    return acc;
  }, [] as (number | string)[]);
};

export const closeModalById = (modalId: string) => {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) {
    console.error(`Modal con id ${modalId} no encontrado`);
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Modal } = require("bootstrap");
  const modal = Modal.getOrCreateInstance(modalElement);

  if (modal) {
    modal.hide();

    setTimeout(() => {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
      modalElement.classList.remove("show");
      modalElement.setAttribute("aria-hidden", "true");
      modalElement.removeAttribute("aria-modal");
      modalElement.style.display = "none";
    }, 300);
  }
};
