// 🧷 Custom Types
interface BaseProps {
  accept: string;
  addAction: (file: File[] | undefined) => void;
  disabled?: boolean;
  dashedBorder?: boolean;
  icon?: string;
  id: string;
  instructions: string;
  maxFileSizeLabel: string;
  multiple?: boolean;
  standAlone: boolean;
}

interface StandAloneProps extends BaseProps {
  standAlone: true;
  file?: File | undefined;
  removeAction?: () => void;
}

interface NonStandAloneProps extends BaseProps {
  standAlone: false;
  file: File | undefined;
  removeAction: () => void;
}

export type DragDropFileInputProps = StandAloneProps | NonStandAloneProps;

export interface BulkLoad {
  file: File | undefined;
  onSuccess: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  typeBtn: string;
}
