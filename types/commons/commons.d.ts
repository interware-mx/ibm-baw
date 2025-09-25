// 🧷 Custom Types

export interface GenericModal {
  closeAction?: () => void;
  closeDisabled?: boolean;
  closeLabel: string;
  dismissAction?: () => void;
  dismissible?: boolean;
  isLoading?: boolean;
  okAction: () => void;
  okDisabled?: boolean;
  okLabel: string;
  modalId: string;
  size?: "modal-sm" | "modal-lg" | "modal-xl";
  title: string;
}

export interface LoadingSpinnerProps {
  label: string | React.ReactNode;
  isLoading: boolean;
  textColor: string;
}

export type TitlePageProps = {
  text: string;
};
