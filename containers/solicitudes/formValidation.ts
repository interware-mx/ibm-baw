// 📦 Dependencies
import * as Yup from "yup";
import ShortUUID from "short-uuid";

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

const digitsOnly = '0123456789';
const decimalTranslator = ShortUUID(digitsOnly)
const [id_material, tipo_material] = decimalTranslator.uuid().split("-")

const randomAmount: number = (Math.random() * 10000) + 0.01;
const amount = Math.round(randomAmount * 100) / 100;

const descripciones = [
  "Jabón Líquido para Manos Dove - 150ml",
  "Jabón en Barra Lux Rosas Francesas - 125g",
  "Shampoo Sedal Restauración Instantánea - 340ml",
  "Desodorante Axe Body Spray Dark Temptation - 150ml",
  "Mayonesa Hellmanns Clásica - 390g",
  "Crema Corporal Vaseline Cocoa Glow - 400ml",
  "Limpiador CIF Crema Multiuso - 500ml",
  "Desodorante Dove Roll-On Original - 50ml"
]

const index = Math.floor(Math.random() * descripciones.length);;
const descripcion = descripciones[index];

export const solicitudSchema = Yup.object({
  idMaterial: Yup.string().required(requiredMessage),
  descripcion: Yup.string().required(requiredMessage),
  piezas: Yup.number().min(1, requiredMessage).required(requiredMessage),
  tipoMaterial: Yup.string().required(requiredMessage),
  moneda: Yup.string()
    .matches(RGX_LETTERS, invalidFormatValidation)
    .required(requiredMessage),
  precio: Yup.number().min(1, requiredMessage).required(requiredMessage),
  canal: Yup.string().required(requiredMessage),
});

export const solicitudInitialValues: formSolicitud = {
  idMaterial: `MFN-${id_material.toUpperCase()}`,
  descripcion,
  piezas: Math.floor(Math.random() * 100) + 1,
  tipoMaterial: `AAX-${tipo_material.toUpperCase()}`,
  moneda: "MXN",
  precio: amount,
  canal: "Min",
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
