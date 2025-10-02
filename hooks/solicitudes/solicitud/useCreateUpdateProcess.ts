// 📦 Dependencies
import { useMutation } from "@tanstack/react-query";

// 📖 useCases
import { createProcess } from "@/lib/use-cases/solicitudes/create-process";
import { updatePiidProcess } from "@/lib/use-cases/solicitudes/update-piid-process";

// 🧾 Types
import { formSolicitud } from "@/types/solicitudes/solicitud";

// 🧷 Custom Types
export interface SubmitCrearUpdateSolicitudesProps {
  values: formSolicitud;
  action: "Update" | "Create";
  tkiid?: string;
  onSuccess?: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  aprobacion?: boolean;
}

export const useSubmitSolicitud = () => {
  // 🔁 Hooks
  const crearSolicitud = useMutation({ mutationFn: createProcess });
  const updateSolicitud = useMutation({ mutationFn: updatePiidProcess });

  const submitSolicitud = async ({
    action,
    tkiid,
    values,
    setSubmitting,
    onSuccess,
    aprobacion,
  }: SubmitCrearUpdateSolicitudesProps) => {
    try {
      if (action === "Update") {
        if (!tkiid) throw new Error("piid is required for Update");

        const baseValues = {
          tkiid,
          material: {
            descripcion: values.descripcion,
            precio: values.precio,
            piezas: String(values.piezas),
            tipo_material: values.tipoMaterial,
            moneda: values.moneda,
            material_cod: values.idMaterial,
            canal: values.canal,
            aprobacion: aprobacion,
          },
        };
        await updateSolicitud.mutateAsync(baseValues);
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
