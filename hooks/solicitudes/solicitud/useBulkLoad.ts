// 🧾 Types
import { BulkLoad } from "@/types/commons/file";

const useBulkLoad = () => {
  /**
   * 📤 Envía el archivo de carga masiva al servidor.
   */
  const bulkLoad = async ({
    onSuccess,
    file,
    setSubmitting,
    typeBtn,
  }: BulkLoad) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      onSuccess();
      console.log("🚀 ~ bulkLoad ~ typeBtn:", typeBtn);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors = error as any;
      console.log("🚀 ~ bulkLoad ~ errors:", errors);
    } finally {
      setSubmitting(false);
    }
  };

  // 🔄 Returns the function
  return {
    bulkLoad,
  };
};

export default useBulkLoad;
