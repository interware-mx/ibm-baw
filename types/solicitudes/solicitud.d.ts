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
  isUpdate?: boolean;
  initialData?: formSolicitud;
  submitAction: (
    values: formSolicitud,
    { ...args }: FormikHelpers<formSolicitud>,
  ) => void;
};

export interface FormikVariables extends Form<formSolicitud> {
  handleSubmit: () => void;
  isSubmitting: boolean;
}

export interface FormaSolicitudProps {
  formikVariables: FormikVariables;
  isUpdate?: boolean;
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

export interface Overview {
  Active: number;
  Total: number;
  Completed: number;
  Failed: number;
  Terminated: number;
  Did_not_Start: number;
  Suspended: number;
}

export interface Process {
  piid: string;
  name: string;
  bpdName: string;
  snapshotID: string;
  projectID: string;
  dueDate: string;
  atRiskDate: string | null;
  executionState: string;
  instanceError: string | null;
  creationDate: string;
  lastModificationTime: string;
  closedDate: string | null;
  username?: string;
}

export interface DataContent {
  overview: Overview;
  processes: Process[];
}

export interface Tableprocesses {
  data: {
    status: string;
    data: DataContent;
  };
}

export type MaterialProps = {
  descripcion: string;
  precio: number | null;
  piezas: number | null;
  tipo_material: string;
  moneda: string;
  material_cod: string;
  canal: string;
  aprobacion?: boolean;
};

export interface UpdatePiidprocesses {
  tkiid: string;
  material: MaterialProps;
}
