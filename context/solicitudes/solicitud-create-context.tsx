"use client";

// 📦 Dependencies
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext } from "react";

// 🧾 Types
import type { FormikHelpers } from "formik";
import { Form, formSolicitud } from "@/types/solicitudes/solicitud";

// 🔁 Hooks
import useSetupFormik from "@/hooks/solicitudes/solicitud/useSetupFormik";
import { useSubmitSolicitud } from "@/hooks/solicitudes/solicitud/useCreateUpdateProcess";

// 🧷 Custom Types
interface SolicitudCreateContext {
  cancelAction: () => void;
  formikVariables: Form<formSolicitud> & {
    handleSubmit: () => void;
    isSubmitting: boolean;
  };
  isDisabled: boolean;
}

interface SolicitudCreateProvider {
  children: React.ReactNode;
}

// 🌐 Context
export const SolicitudCreateContext = createContext<
  SolicitudCreateContext | undefined
>(undefined);

// 🌳 Provider
export const SolicitudCreateProvider: React.FC<SolicitudCreateProvider> = ({
  children,
}) => {
  // 🔁 Hooks
  const router = useRouter();
  const { submitSolicitud } = useSubmitSolicitud();

  const handleSubmitSolicitud = async (
    values: formSolicitud,
    { setSubmitting }: FormikHelpers<formSolicitud>
  ) => {
    const onSuccess = () => {
      cancelAction();
    };
    await submitSolicitud({
      action: "Create",
      values,
      onSuccess,
      setSubmitting,
    });
  }

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
    isSubmitting,
  } = useSetupFormik({
    submitAction: handleSubmitSolicitud,
  });

  const cancelAction = useCallback(() => {
    resetForm();
    router.push("/solicitudes");
  }, [resetForm, router]);

  return (
    <SolicitudCreateContext.Provider
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
        isDisabled: isSubmitting,
        cancelAction,
      }}
    >
      {children}
    </SolicitudCreateContext.Provider>
  );
};

/**
 * Hook para acceder al contexto
 */
export const useSolicitudCreateContext = (): SolicitudCreateContext => {
  const context = useContext(SolicitudCreateContext);
  if (!context) {
    throw new Error(
      "useSolicitudCreateContext must be used within a SolicitudCreateProvider ",
    );
  }
  return context;
};
