// 📦 Dependencies
import * as Yup from "yup";

// 🧾 Types
import { formSolicitud } from "@/types/solicitudes/solicitud";

import {
  allowedPDFExtensions,
  allowedPdfMimeTypes,
  fileMaxSize,
} from "@/constants/file-validation";
/*
 **Mensajes genérico
 */
export const requiredMessage: string = "Este es un campo requerido";
export const invalidFormatValidation: string = "Formato inválido";

export const RGX_LETTERS_NUMBERS = /^[a-zA-Z\d]+$/;
export const RGX_LETTERS = /^[a-zA-Z]+$/;
export const RGX_ONLY_NUMBERS = /^\d+$/;

export const solicitudSchema = Yup.object({
  idMaterial: Yup.string()
    .matches(RGX_ONLY_NUMBERS, invalidFormatValidation)
    .required(requiredMessage),
  descripcion: Yup.string().required(requiredMessage),
  piezas: Yup.number().min(1, requiredMessage).required(requiredMessage),
  tipoMaterial: Yup.string()
    .matches(RGX_LETTERS_NUMBERS, invalidFormatValidation)
    .required(requiredMessage),
  moneda: Yup.string()
    .matches(RGX_LETTERS, invalidFormatValidation)
    .required(requiredMessage),
  precio: Yup.number().min(1, requiredMessage).required(requiredMessage),
  canal: Yup.string().required(requiredMessage),
});

export const solicitudInitialValues: formSolicitud = {
  idMaterial: "",
  descripcion: "",
  piezas: null,
  tipoMaterial: "",
  moneda: "",
  precio: null,
  canal: "",
};

export const schema = Yup.object().shape({
  file: Yup.mixed()
    .test("required", "Debe subir al menos un archivo", (file) => {
      return !!file;
    })
    .test("fileType", "Archivo inválido", (file) => {
      const parsedFile = file as File;
      if (parsedFile) {
        if (allowedPdfMimeTypes.includes(parsedFile.type)) {
          return true;
        }

        const fileExtension = parsedFile.name.split(".").pop()?.toLowerCase();
        if (
          fileExtension &&
          allowedPDFExtensions.includes(`.${fileExtension}`)
        ) {
          return true;
        }
      }

      return false;
    })
    .test("fileSize", "El archivo es demasiado grande", (file) => {
      return file && (file as File).size <= fileMaxSize;
    }),
});
