"use client";

// 📦 Dependencies
import { useState } from "react";
import { useFormik } from "formik";

// 🌐 Context
import { useSolicitudDetalleContext } from "@/context/solicitudes/solicitud-detalle-context";

// 📖 lib
import { closeModalById } from "@/lib/utils";
import { schema } from "@/containers/solicitudes/formValidation";
import { acceptPDF } from "@/constants/file-validation";

// 🔁 Hooks
import useBulkLoad from "@/hooks/solicitudes/solicitud/useBulkLoad";

// 🧩 Components / Containers
import TitlePage from "@/components/commons/title-page";
import HeaderFilters from "@/components/solicitudes/forma-solicitud/header-filters";
import Modal from "@/components/commons/modal";
import FormaSolicitud from "@/components/solicitudes/forma-solicitud";
import TableUpload from "@/components/solicitudes/forma-solicitud/table-upload";
import DragDropFileInput from "@/components/commons/drag-drop-file-input";
import LoadingSpinner from "@/components/commons/loading-spinner";

const initialValues = {
  file: undefined,
};

const DetalleCont = () => {
  // 🔁 Hooks
  const { bulkLoad } = useBulkLoad();
  const { formikVariables, setAprobacion, aprobacion, isDisabled } =
    useSolicitudDetalleContext();

  // 🔘 State
  const [typeBtn, setTypeBtn] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values, { setSubmitting }) => {
      const onSuccess = () => {
        setSubmitting(false);
        closeModalById("bulkModal");
        formik.resetForm();
      };

      bulkLoad({ file: values.file, onSuccess, setSubmitting, typeBtn });
    },
  });

  const handleAddFile = (files: File[] | undefined) => {
    if (!files?.length) return;

    formik.setFieldValue("file", files[0]);
  };

  return (
    <>
      <div className="border p-4">
        <TitlePage text="Información del material" />
        <FormaSolicitud formikVariables={formikVariables} isUpdate />
      </div>
      <div className="border p-4 mt-3">
        <HeaderFilters
          text="Documentos asociados"
          buttons={[
            {
              label: "Renovar",
              variant: "outline-light",
              modalTargetId: "bulkModal",
              onClick: () => {
                setTypeBtn("Renovar");
              },
            },
            {
              label: "Añadir",
              modalTargetId: "bulkModal",
              onClick: () => {
                setTypeBtn("Añadir");
              },
              variant: "primary",
            },
          ]}
        />
        <TableUpload
          catalog={[
            {
              nombre: "Ficha técnica (ejemplo)",
              url: "/docs/ficha-tecnica.pdf",
              version: "1.0",
              modificacion: "2025-09-02 14:55",
              modificado: "BGonzalez",
            },
          ]}
        />
      </div>
      <div className="row justify-content-end m-0 p-0 mt-3 g-3">
        <div className="col-12 col-sm-12 col-md-2">
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              setAprobacion(false);
              formikVariables.handleSubmit();
            }}
            disabled={formikVariables.isSubmitting}
          >
            <LoadingSpinner
              label="Rechazar"
              isLoading={!aprobacion && formikVariables.isSubmitting}
              textColor="text-white"
            />
          </button>
        </div>
        <div className="col-12 col-sm-12 col-md-2">
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={() => {
              setAprobacion(true);
              formikVariables.handleSubmit();
            }}
            disabled={formikVariables.isSubmitting}
          >
            <LoadingSpinner
              label="Aprobar"
              isLoading={aprobacion && formikVariables.isSubmitting}
              textColor="text-white"
            />
          </button>
        </div>
      </div>
      <Modal
        modalId="bulkModal"
        title={`${typeBtn} documentos asociados`}
        okLabel="Añadir"
        okDisabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        okAction={formik.handleSubmit}
        closeLabel="Cancelar"
        closeAction={() => formik.resetForm()}
        dismissible={false}
        closeDisabled={formik.isSubmitting}
        isLoading={formik.isSubmitting}
      >
        <div className="w-100">
          <DragDropFileInput
            accept={acceptPDF}
            addAction={handleAddFile}
            disabled={formik.isSubmitting}
            file={formik.values.file}
            id="bulkLoad__input"
            instructions="Click o arrastra tu archivo aquí para subirlo"
            maxFileSizeLabel="Tamaño máximo de archivos 15mb"
            removeAction={() => formik.resetForm()}
            standAlone={false}
          />
          {formik.errors.file && (
            <span
              className="invalid-feedback d-block pt-1"
              data-testid={"bulkLoad_errors"}
            >
              {formik.errors.file}
            </span>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DetalleCont;
