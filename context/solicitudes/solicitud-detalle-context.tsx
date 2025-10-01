"use client";

// 📦 Dependencies
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

// 🧾 Types
import { Form, formSolicitud } from "@/types/solicitudes/solicitud";

// 📖 lib
import { getPiidProcessOptions } from "@/lib/use-cases/solicitudes/get-piid-process";

// 🔁 Hooks
import useSetupFormik from "@/hooks/solicitudes/solicitud/useSetupFormik";
import { useSubmitSolicitud } from "@/hooks/solicitudes/solicitud/useCreateUpdateProcess";

// 🧷 Custom Types
interface SolicitudDetalleContext {
  cancelAction: () => void;
  formikVariables: Form<formSolicitud> & {
    handleSubmit: () => void;
    isSubmitting: boolean;
  };
  isDisabled: boolean;
  setAprobacion: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SolicitudDetalleProvider {
  children: React.ReactNode;
  piid: string;
}

const detalleInitialValues: formSolicitud = {
  idMaterial: "",
  descripcion: "",
  piezas: null,
  tipoMaterial: "",
  moneda: "",
  precio: null,
  canal: "",
};

// 🌐 Context
export const SolicitudDetalleContext = createContext<
  SolicitudDetalleContext | undefined
>(undefined);

// 🌳 Provider
export const SolicitudDetalleProvider: React.FC<SolicitudDetalleProvider> = ({
  children,
  piid,
}) => {
  // 🔁 Hooks
  const router = useRouter();
  const { submitSolicitud } = useSubmitSolicitud();
  const { data } = useSuspenseQuery(
    getPiidProcessOptions({ piid: piid.toString() }),
  );

  const [aprobacion, setAprobacion] = useState<boolean>(false);

  const initialData = useMemo(() => {
    if (data?.data?.data?.tasks[0]?.data?.variables?.material) {
      const {
        material_cod,
        descripcion,
        piezas,
        tipo_material,
        precio,
        moneda,
        canal,
      } = data?.data?.data?.tasks[0]?.data?.variables?.material;

      const parsedData: formSolicitud = {
        idMaterial: material_cod?.trim(),
        descripcion: descripcion?.trim(),
        piezas: piezas?.trim(),
        tipoMaterial: tipo_material?.trim(),
        moneda: moneda?.trim(),
        precio: precio?.trim(),
        canal: canal?.trim(),
      };

      return parsedData;
    }

    return detalleInitialValues;
  }, [data?.data?.data?.tasks]);

  const handleSubmitSolicitud = async ({
    values,
    setSubmitting,
  }: {
    values: formSolicitud;
    setSubmitting: (isSubmitting: boolean) => void;
  }) => {
    const onSuccess = () => {
      cancelAction();
    };
    await submitSolicitud({
      aprobacion,
      tkiid: data?.data?.data?.tasks[0]?.tkiid,
      action: "Update",
      values,
      onSuccess,
      setSubmitting,
    });

    setSubmitting(false);
    resetForm();
  };

  /**
   * Setup de formik
   */
  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    setFieldValue,
    isValid,
    isSubmitting,
    dirty,
  } = useSetupFormik({
    isUpdate: true,
    initialData,
    submitAction: handleSubmitSolicitud,
  });

  const cancelAction = useCallback(() => {
    resetForm();
    router.push("/solicitudes");
  }, [resetForm, router]);

  return (
    <SolicitudDetalleContext.Provider
      value={{
        formikVariables: {
          handleSubmit,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting,
        },
        isDisabled: !(isValid && dirty) || isSubmitting,
        cancelAction,
        setAprobacion,
      }}
    >
      {children}
    </SolicitudDetalleContext.Provider>
  );
};

/**
 * Hook para acceder al contexto
 */
export const useSolicitudDetalleContext = (): SolicitudDetalleContext => {
  const context = useContext(SolicitudDetalleContext);
  if (!context) {
    throw new Error(
      "useSolicitudDetalleContext must be used within a SolicitudDetalleProvider ",
    );
  }
  return context;
};
