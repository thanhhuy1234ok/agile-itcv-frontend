import React, { useState } from "react";
import { Modal, Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { IJob } from "@/types/job";
import type { UploadFile } from "antd/es/upload/interface";

interface ApplyJobModalProps {
  open: boolean;
  onOk: (file?: UploadFile) => void;
  onCancel: () => void;
  job: IJob;
  confirmLoading: boolean;
}

const ApplyModal: React.FC<ApplyJobModalProps> = ({
  open,
  onOk,
  onCancel,
  job,
  confirmLoading,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.slice(-1));
  };

  const handleConfirm = () => {
    if (fileList.length === 0) {
      message.warning("Vui lòng tải lên một tệp trước khi xác nhận.");
      return;
    }

    onOk(fileList[0]);
  };

  return (
    <Modal
      title="Xác nhận ứng tuyển"
      open={open}
      onOk={handleConfirm}
      onCancel={onCancel}
      okText="Xác nhận"
      cancelText="Hủy"
      confirmLoading={confirmLoading}
    >
      <p>
        Bạn có chắc chắn muốn ứng tuyển vào vị trí <b>{job.name}</b> tại{" "}
        <b>{job.companyId.name}</b> không?
      </p>

      <Upload
        beforeUpload={(file) => {
          const isPdf = file.type === "application/pdf";
          if (!isPdf) {
            message.error("Chỉ chấp nhận tệp PDF!");
          }
          return isPdf ? false : Upload.LIST_IGNORE;
        }}
        onChange={handleUploadChange}
        fileList={fileList}
        maxCount={1}
        accept=".pdf"
      >
        <Button icon={<UploadOutlined />}>Tải lên CV (chỉ PDF)</Button>
      </Upload>
    </Modal>
  );
};

export default ApplyModal;
