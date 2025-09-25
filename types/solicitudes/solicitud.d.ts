// 📦 Dependencies
import { FormikHandlers, FormikHelpers, FormikState } from "formik";

// 🧷 Custom Types

export interface Form<T>
  extends Pick<FormikState<T>, "values" | "errors" | "touched">,
    Pick<FormikHandlers, "handleBlur" | "handleChange">,
    Pick<FormikHelpers<T>, "setFieldValue"> {
  isUpdate?: boolean;
}

export type formSolicitud = {
  idMaterial: string;
  descripcion: string;
  piezas: number | null;
  tipoMaterial: string;
  moneda: string;
  precio: number | null;
  canal: string;
};

export type UseSetupFormikProps = {
  submitAction: ({
    values,
    setSubmitting,
  }: {
    values: formSolicitud;
    setSubmitting: (isSubmitting: boolean) => void;
  }) => void;
};

export interface FormikVariables extends Form<formSolicitud> {
  handleSubmit: () => void;
  isSubmitting: boolean;
}

export interface FormaSolicitudProps {
  formikVariables: FormikVariables;
}

export type DocumentosAsociadosProps = {
  nombre: string;
  url: string;
  version: string;
  modificacion: string;
  modificado: string;
};

export interface ButtonConfig {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "outline-light";
  modalTargetId?: string;
}

export interface HeaderFilterProps {
  text: string;
  buttons?: ButtonConfig[];
}
