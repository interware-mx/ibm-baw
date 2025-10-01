// 📦 Dependencies
import { useFormik } from "formik";

// 🧾 Types
import {
  UseSetupFormikProps,
  formSolicitud,
} from "@/types/solicitudes/solicitud";

// 🔨 Utils
import {
  solicitudSchema,
  solicitudInitialValues,
} from "@/containers/solicitudes/formValidation";

const useSetupFormik = ({
  submitAction,
  initialData,
  isUpdate,
}: UseSetupFormikProps) => {
  /**
   *  setup de formik
   */
  const createUpdateFormik = useFormik({
    enableReinitialize: true,
    validateOnMount: false,
    initialValues: isUpdate ? initialData : solicitudInitialValues,
    validationSchema: isUpdate ? undefined : solicitudSchema,
    onSubmit: (values: formSolicitud, { setSubmitting }) => {
      submitAction({ values, setSubmitting });
    },
  });

  const {
    handleSubmit,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    isValid,
    dirty,
    resetForm,
    isSubmitting,
  } = createUpdateFormik;

  // 🔄 Returns
  return {
    handleSubmit,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    isValid,
    dirty,
    resetForm,
    isSubmitting,
  };
};

export default useSetupFormik;
