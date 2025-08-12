import React from "react";
import { Card, Avatar, Descriptions } from "antd";
import dayjs from "dayjs";

interface ProfileInfoProps {
  user?: any;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  return (
    <Card title="Thông tin cá nhân" bordered>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar
          size={100}
          src={user?.img_url || "https://via.placeholder.com/100"}
        />
      </div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Họ và tên">
          {user?.name || "Chưa có"}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {user?.email || "Chưa có"}
        </Descriptions.Item>
        <Descriptions.Item label="Vai trò">
          {user?.role.name || "Người dùng"}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {user?.createdAt
            ? dayjs(user.createdAt).format("DD/MM/YYYY HH:mm")
            : "Không xác định"}
        </Descriptions.Item>
        <Descriptions.Item label="Cập nhật lần cuối">
          {user?.updatedAt
            ? dayjs(user.updatedAt).format("DD/MM/YYYY HH:mm")
            : "Không xác định"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProfileInfo;
