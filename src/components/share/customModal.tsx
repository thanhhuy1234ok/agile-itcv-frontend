import React from "react";
import { Modal, Button } from "antd";

interface CustomModalProps {
  open: boolean;
  title?: React.ReactNode;
  onCancel: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  children?: React.ReactNode;
  width?: number;
  loading?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  onCancel,
  onOk,
  okText = "Lưu",
  cancelText = "Hủy",
  children,
  width = 700,
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={width}
      style={{ top: 100 }}
      styles={{
        body: { padding: 20 },
      }}
      title={title}
    >
      {children}
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          {cancelText}
        </Button>
        {onOk && (
          <Button type="primary" onClick={onOk} loading={loading}>
            {okText}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;
