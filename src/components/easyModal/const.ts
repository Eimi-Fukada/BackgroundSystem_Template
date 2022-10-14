export interface EasyModalProps extends React.PropsWithChildren<object> {
  visible: boolean;
  title?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
}
