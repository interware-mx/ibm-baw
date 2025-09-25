// 📦 Dependencies
import classNames from "classnames";

// 🧾 Types
import { LoadingSpinnerProps } from "@/types/commons/commons";

const LoadingSpinner = ({
  label,
  isLoading,
  textColor,
}: LoadingSpinnerProps) => {
  // 🎨 Styles
  const containerStyle = classNames(
    "spinner-border spinner-border-sm ms-1",
    textColor,
  );

  if (isLoading) {
    return (
      <>
        {label}
        &nbsp;
        <div className={containerStyle} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    );
  }
  return label;
};

export default LoadingSpinner;
