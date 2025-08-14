import React, { useState } from "react";
import { Card, Avatar, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { upload } from "@/services/api";

interface ProfileInfoProps {
  user?: any;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const [avatarUrl, setAvatarUrl] = useState(
    user?.img_url || "https://via.placeholder.com/100"
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = async ({ fileList }: { fileList: UploadFile[] }) => {
    // chỉ giữ 1 file
    const latestList = fileList.slice(-1);
    setFileList(latestList);

    // lấy file thật từ AntD UploadFile
    const rawFile = latestList[0]?.originFileObj as File;
    console.log(rawFile);
    if (!rawFile) return;

    if (!rawFile.type.startsWith("image/")) {
      message.error("Vui lòng chọn file hình ảnh!");
      return;
    }

    try {
      const res = await upload(null, rawFile);
      if (res.data?.data?.url) {
        setAvatarUrl(res.data.data.url);
        message.success("Tải ảnh thành công!");
      } else {
        message.error("Không nhận được URL ảnh từ server!");
      }
    } catch (err) {
      console.error(err);
      message.error("Tải ảnh thất bại!");
    }
  };

  return (
    <Card title="Thông tin cá nhân" bordered>
      <div style={{ textAlign: "left", marginBottom: 20 }}>
        <Avatar size={100} src={avatarUrl} />
        <div style={{ marginTop: 10 }}>
          <Upload
            fileList={fileList}
            beforeUpload={() => false} // Không upload tự động
            onChange={handleChange}
            showUploadList={false} // Ẩn danh sách file
            accept="image/*" // chỉ chọn ảnh
          >
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
        </div>
      </div>
    </Card>
  );
};

export default ProfileInfo;
