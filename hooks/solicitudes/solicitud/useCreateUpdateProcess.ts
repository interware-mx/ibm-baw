// 📦 Dependencies
import { useMutation } from "@tanstack/react-query";

// 📖 useCases
import { createProcess } from "@/lib/use-cases/solicitudes/create-process";

// 🧾 Types
import { formSolicitud } from "@/types/solicitudes/solicitud";

// 🧷 Custom Types
export interface SubmitCrearUpdateSolicitudesProps {
  values: formSolicitud;
  action: "Update" | "Create";
  id?: string;
  onSuccess?: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

export const useSubmitSolicitud = () => {
  // 🔁 Hooks
  const crearSolicitud = useMutation({ mutationFn: createProcess });

  const submitSolicitud = async ({
    action,
    id,
    values,
    setSubmitting,
    onSuccess,
  }: SubmitCrearUpdateSolicitudesProps) => {
    try {
      if (action === "Update") {
        if (!id) throw new Error("ID is required for Update");
      } else {
        await crearSolicitud.mutateAsync(values);
      }

      setSubmitting(false);
      onSuccess?.();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitting(false);
    }
  };

  // 🔄 Returns the function
  return {
    submitSolicitud,
  };
};
