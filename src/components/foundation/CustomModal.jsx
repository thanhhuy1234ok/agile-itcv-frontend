import React from 'react';
import { Modal } from 'antd';
import '@/styles/CustomModalStyle.scss';

const ReusableModal = ({
  visible,
  title,
  children,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Hủy',
  footer = undefined,
}) => {
  return (
    <Modal
      title={<div className="modal-title">{title}</div>}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      centered
      className="reusable-modal"
      footer={footer}
    >
      <div className="modal-content">{children}</div>
    </Modal>
  );
};

export default ReusableModal;
