import React, { useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Upload,
  message,
  Row,
  Col,
  Typography,
  Tag,
  Form,
} from "antd";
import {
  UploadOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import CustomModal from "@/components/share/customModal";
import CustomForm from "@/components/share/customForm";
import { upload, updateUser } from "@/services/api";

interface ProfileInfoProps {
  user?: any;
}

const { Text, Title } = Typography;

const ProfileInfo: React.FC<ProfileInfoProps> = () => {
  const [form] = Form.useForm();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [avatarUrl, setAvatarUrl] = useState(
    user?.img_url || "https://via.placeholder.com/100"
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [open, setOpen] = useState(false);

  const handleChange = async ({ fileList }: { fileList: UploadFile[] }) => {
    const latestList = fileList.slice(-1);
    setFileList(latestList);

    const rawFile = latestList[0]?.originFileObj as File;

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

  const handleUpdateUser = async (values: any) => {
    try {
      const res = await updateUser({
        ...values,
        img_url: avatarUrl,
      });

      if (res?.data.data.updatedUser) {
        const updatedUser = res.data.data.updatedUser;

        localStorage.setItem("user", JSON.stringify(updatedUser));
        message.success("Cập nhật hồ sơ thành công!");
        setOpen(false);
      } else {
        message.error("Không thể cập nhật hồ sơ!");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi cập nhật hồ sơ!");
    }
  };

  return (
    <>
      <Card
        title="Thông tin cá nhân"
        bordered
        extra={
          <span
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
            onClick={() => setOpen(true)}
          >
            <EditOutlined />
            Chỉnh sửa hồ sơ
          </span>
        }
      >
        <Row gutter={24} align="middle">
          {/* Cột trái: Avatar + upload */}
          <Col span={3} style={{ textAlign: "center" }}>
            <Avatar size={120} src={avatarUrl} />
            <div style={{ marginTop: 10 }}>
              <Upload
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleChange}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
              </Upload>
            </div>
          </Col>

          {/* Cột phải: Thông tin user */}
          <Col
            span={21}
            style={{
              alignSelf: "flex-start",
            }}
          >
            <Title level={1} style={{ margin: "0px 0px 10px 0px" }}>
              {user?.name}
            </Title>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 20 }}>
                <UserOutlined style={{ color: "#A6A6A6" }} />{" "}
                {user?.role?.name || "Người dùng"}
              </Text>

              <Tag color={user?.isDeleted ? "volcano" : "green"}>
                {user?.isDeleted ? "Deleted" : "Available"}
              </Tag>
            </div>
            <Text style={{ fontSize: 20, display: "block" }}>
              <MailOutlined style={{ color: "#A6A6A6" }} /> {user?.email}
            </Text>
            <Text style={{ fontSize: 20, display: "block" }}>
              <PhoneOutlined style={{ color: "#A6A6A6" }} /> {user?.phone}
            </Text>

            <a
              href={user?.cv_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 18,
                color: "red",
                fontStyle: "italic",
                textDecoration: "underline",
              }}
              onClick={(e) => {
                if (!user?.cv_url) {
                  e.preventDefault();
                  message.warning("Chưa có CV để hiển thị");
                }
              }}
            >
              <EyeOutlined /> Xem hồ sơ của bạn
            </a>
          </Col>
        </Row>
      </Card>
      <CustomModal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        title="Chỉnh sửa hồ sơ"
      >
        <CustomForm
          form={form}
          title=""
          initialValues={{
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
          }}
          fields={[
            {
              name: "name",
              label: "Họ và tên",
              type: "text",
              rules: [{ required: true, message: "Nhập tên" }],
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              rules: [{ required: true, message: "Nhập email" }],
            },
            { name: "phone", label: "Số điện thoại", type: "text" },
          ]}
          onFinish={handleUpdateUser}
        />
      </CustomModal>
    </>
  );
};

export default ProfileInfo;
