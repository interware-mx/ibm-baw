// 🔨 Utils
import { validationClass } from "@/lib/utils";

// 🧾 Types
import { FormaSolicitudProps } from "@/types/solicitudes/solicitud";

const FormaSolicitud = ({ formikVariables, isUpdate }: FormaSolicitudProps) => {
  /**
   * Variables de formik
   */
  const { values, handleBlur, handleChange, touched, errors } = formikVariables;

  return (
    <>
      <div className="row mt-4">
        <div className="col-12 col-sm-12 col-md-6">
          <label htmlFor="idMaterial" className="form-label">
            Código de material
            <span className="text-iw-red"> *</span>
          </label>
          <input
            type="text"
            className={validationClass({
              touched: touched["idMaterial"],
              errors: errors["idMaterial"],
            })}
            data-testid="idMaterial"
            name="idMaterial"
            id="idMaterial"
            placeholder="Código de material"
            required
            onBlur={handleBlur}
            onChange={handleChange}
            value={values?.idMaterial as string}
            disabled={isUpdate}
          />
          {touched.idMaterial && errors.idMaterial && (
            <span className="invalid-feedback pt-1">{errors.idMaterial}</span>
          )}
        </div>
        <div className="col-12 col-sm-12 col-md-6">
          <label htmlFor="descripcion" className="form-label">
            Descripción
            <span className="text-iw-red"> *</span>
          </label>
          <input
            type="text"
            className={validationClass({
              touched: touched["descripcion"],
              errors: errors["descripcion"],
            })}
            data-testid="descripcion"
            name="descripcion"
            id="descripcion"
            placeholder="Descripción"
            required
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.descripcion as string}
            disabled={isUpdate}
          />

          {touched.descripcion && errors.descripcion && (
            <span className="invalid-feedback pt-1">{errors.descripcion}</span>
          )}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12 col-sm-12 col-md-3">
          <label htmlFor="tipoMaterial" className="form-label">
            Tipo de material
            <span className="text-iw-red"> *</span>
          </label>
          <input
            type="text"
            className={validationClass({
              touched: touched["tipoMaterial"],
              errors: errors["tipoMaterial"],
            })}
            data-testid="tipoMaterial"
            name="tipoMaterial"
            id="tipoMaterial"
            placeholder="Tipo de material"
            required
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.tipoMaterial as string}
            disabled={isUpdate}
          />

          {touched.tipoMaterial && errors.tipoMaterial && (
            <span className="invalid-feedback pt-1">{errors.tipoMaterial}</span>
          )}
        </div>
        <div className="col-12 col-sm-12 col-md-3">
          <label htmlFor="piezas" className="form-label">
            Piezas
            <span className="text-iw-red"> *</span>
          </label>
          <input
            type="number"
            className={validationClass({
              touched: touched["piezas"],
              errors: errors["piezas"],
            })}
            data-testid="piezas"
            name="piezas"
            id="piezas"
            placeholder="Piezas"
            required
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.piezas ?? ""}
            disabled={isUpdate}
          />

          {touched.piezas && errors.piezas && (
            <span className="invalid-feedback pt-1">{errors.piezas}</span>
          )}
        </div>
        <div className="col-12 col-sm-12 col-md-3">
          <label htmlFor="moneda" className="form-label">
            Moneda
            <span className="text-iw-red"> *</span>
          </label>
          <input
            type="text"
            className={validationClass({
              touched: touched["moneda"],
              errors: errors["moneda"],
            })}
            data-testid="moneda"
            name="moneda"
            id="moneda"
            placeholder="Moneda"
            required
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.moneda as string}
            disabled={isUpdate}
          />

          {touched.moneda && errors.moneda && (
            <span className="invalid-feedback pt-1">{errors.moneda}</span>
          )}
        </div>
        <div className="col-12 col-sm-12 col-md-3">
          <label htmlFor="moneda" className="form-label">
            Precio
            <span className="text-iw-red"> *</span>
          </label>
          <input
            type="number"
            className={validationClass({
              touched: touched["precio"],
              errors: errors["precio"],
            })}
            data-testid="precio"
            name="precio"
            id="precio"
            placeholder="Precio"
            required
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.precio ?? ""}
            disabled={isUpdate}
          />

          {touched.precio && errors.precio && (
            <span className="invalid-feedback pt-1">{errors.precio}</span>
          )}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-sm-12 col-md-6">
          <label htmlFor="canal" className="form-label">
            Canal
            <span className="text-iw-red"> *</span>
          </label>
          <input
            type="text"
            className={validationClass({
              touched: touched["canal"],
              errors: errors["canal"],
            })}
            data-testid="canal"
            name="canal"
            id="canal"
            placeholder="Canal"
            required
            onBlur={handleBlur}
            onChange={handleChange}
            value={values?.canal as string}
            disabled={isUpdate}
          />

          {touched.canal && errors.canal && (
            <span className="invalid-feedback pt-1">{errors.canal}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default FormaSolicitud;
