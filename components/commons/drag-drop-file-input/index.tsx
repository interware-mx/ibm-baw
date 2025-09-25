"use client";

// 📦 Dependencies
import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

// 🧾 Types
import { DragDropFileInputProps } from "@/types/commons/file";

const DragDropFileInput = ({
  accept,
  addAction,
  disabled,
  dashedBorder,
  file,
  icon,
  id,
  instructions,
  maxFileSizeLabel,
  multiple = false,
  removeAction,
  standAlone = false,
}: DragDropFileInputProps) => {
  // 🔘 State
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [fileVersion, setFileVersion] = useState<number>(0);

  /**
   * Genera un thumbnail si es que el archivo es una imagen
   */
  const thumbnailCondition = accept.startsWith("image/") && file && !standAlone;

  // 🔄 useEffects
  useEffect(() => {
    let mounted = true;

    if (mounted && thumbnailCondition) {
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
    }

    return () => {
      mounted = false;
      setImage(null);
    };
  }, [file, thumbnailCondition]);

  // ⚙️ Funciones
  /**
   * Funciones para la obtención y eliminación del archivo.
   */
  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.files?.length) {
        const files = Array.from(event.dataTransfer.files);
        addAction(files);

        event.dataTransfer.clearData();
        setFileVersion((prev) => prev + 1);
      }
    },
    [addAction],
  );

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.target.files?.length) {
        const files = Array.from(event.target.files);
        addAction(files);

        event.target.value = "";
        setFileVersion((prev) => prev + 1);
      }
    },
    [addAction],
  );

  const handleRemoveFile = useCallback(() => {
    if (removeAction) removeAction();
    setImage(null);
  }, [removeAction]);

  const imageURL = useMemo(
    () => (thumbnailCondition ? `url(${image})` : ""),
    [image, thumbnailCondition],
  );

  const styles = thumbnailCondition
    ? {
        backgroundImage: imageURL,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
        backgroundSize: "cover",
        backgroundColor: "rgb(248, 249, 250)",
      }
    : {};

  return (
    <div
      className={`d-flex w-100 h-100 align-content-start${
        thumbnailCondition ? " p-1 rounded-2 border justify-content-end" : ""
      }`}
      style={{
        cursor: disabled ? "not-allowed" : "default",
        ...styles,
      }}
      role="button"
      tabIndex={0}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      aria-label="Drag and drop area for file upload"
    >
      {file && !standAlone ? (
        <>
          {accept.startsWith("image/") ? (
            <button
              aria-label="Remove uploaded file"
              className="btn btn-iw-red d-flex justify-content-center align-items-center"
              data-testid="btn-remove-upload"
              disabled={disabled}
              id="btn-remove-upload"
              onClick={handleRemoveFile}
              style={{
                maxHeight: "3rem",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          ) : (
            <div className="row g-0 align-items-center justify-content-between w-100">
              <div className="col-9 col-md-10 text-truncate fs-5">
                {file?.name}
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-iw-red"
                  data-testid="btn-remove-upload"
                  disabled={disabled}
                  id="btn-remove-upload"
                  onClick={handleRemoveFile}
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <input
            accept={accept}
            aria-label="File upload input"
            className="form-control-file d-none"
            data-testid="input-file-upload"
            disabled={disabled}
            id={id}
            key={fileVersion}
            multiple={multiple}
            name={id}
            onChange={handleFileChange}
            type="file"
          />
          <label
            className={`d-flex flex-column align-content-center justify-content-center w-100 h-100 p-3 text-center rounded-2 bg-iw-light border border-iw-gray-500${
              dashedBorder ? " border-dashed" : ""
            }`}
            data-testid={`${id}__label`}
            htmlFor={id}
            id={`${id}__label`}
            style={{
              cursor: disabled ? "not-allowed" : "pointer",
            }}
            role="button"
          >
            <div>
              <i className={`bi ${icon ? icon : "bi-inbox display-5"}`} />
            </div>
            <div className="text-iw-gray-900">{instructions}</div>
            <div className="text-iw-gray-600">{maxFileSizeLabel}</div>
          </label>
        </>
      )}
    </div>
  );
};

export default DragDropFileInput;
