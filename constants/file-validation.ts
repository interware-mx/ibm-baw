// 📏 File Size Limits
export const fileMaxSize = 15728640;

// 📄 Allowed MIME Types & Extensions
export const allowedExcelMimeTypes = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];
export const allowedPdfMimeTypes = ["application/pdf"];
export const allowedExcelExtensions = [".csv", ".xlsx", ".xls"];
export const allowedPDFExtensions = [".pdf"];

// 📥 Accept Attributes for Inputs
export const acceptImages = "image/*";

export const acceptPDF = "application/pdf";

export const acceptExcel =
  ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";
