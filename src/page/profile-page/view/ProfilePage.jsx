"use client";
import {
  Avatar,
  Card,
  Typography,
  Space,
  Tag,
  Divider,
  Spin,
  Alert,
  Button,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CrownOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/global/AuthenticationContext";
import { useProfileViewModal } from "../viewmodal/ProfileViewModal";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function ProfilePage() {
  const { user } = useAuth();
  const userId = user?._id;
  const isAdmin = user?.role?.name?.toLowerCase() === "admin";
  const { profile, loading, error } = useProfileViewModal(userId);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
          padding: "20px",
        }}>
        <Spin size="large" tip="Đang tải thông tin..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: 500,
          margin: "32px auto",
          padding: "0 16px",
        }}>
        <Alert
          message="Lỗi tải dữ liệu"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        style={{
          maxWidth: 500,
          margin: "32px auto",
          padding: "0 16px",
        }}>
        <Alert
          message="Không có dữ liệu"
          description="Không tìm thấy thông tin người dùng"
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "32px auto",
        padding: "0 16px",
      }}>
      {!isAdmin && (
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          style={{
            marginBottom: 12,
            paddingLeft: 0,
            fontSize: 16,
            color: "#1890ff",
            fontWeight: 500,
          }}
          onClick={() => navigate("/")}>
          Về trang chủ
        </Button>
      )}
      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid #f0f0f0",
        }}
        bodyStyle={{
          padding: "32px 24px",
        }}>
        {/* Header Section with Avatar and Basic Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: 32,
          }}>
          <Avatar
            size={120}
            src={profile.img_url}
            icon={<UserOutlined />}
            style={{
              marginBottom: 16,
              border: "4px solid #f0f0f0",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Space direction="vertical" size={4} style={{ width: "100%" }}>
            <Title
              level={2}
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: 600,
                color: "#262626",
              }}>
              {profile.name}
            </Title>

            <Space align="center" style={{ marginBottom: 8 }}>
              <MailOutlined style={{ color: "#8c8c8c" }} />
              <Text type="secondary" style={{ fontSize: "16px" }}>
                {profile.email}
              </Text>
            </Space>

            {isAdmin && (
              <Tag
                icon={<CrownOutlined />}
                color="gold"
                style={{
                  fontSize: "14px",
                  padding: "4px 12px",
                  borderRadius: 20,
                  fontWeight: 500,
                }}>
                {profile.role?.name}
              </Tag>
            )}
          </Space>
        </div>

        <Divider style={{ margin: "24px 0" }} />

        {/* Contact Information */}
        <div style={{ marginTop: 24 }}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                backgroundColor: "#fafafa",
                borderRadius: 8,
                border: "1px solid #f0f0f0",
              }}>
              <PhoneOutlined
                style={{
                  color: "#1890ff",
                  fontSize: "16px",
                  marginRight: 12,
                  minWidth: 16,
                }}
              />
              <div>
                <Text
                  strong
                  style={{
                    display: "block",
                    marginBottom: 2,
                    color: "#595959",
                    fontSize: "14px",
                  }}>
                  Số điện thoại
                </Text>
                <Text
                  style={{
                    fontSize: "16px",
                    color: "#262626",
                  }}>
                  {profile.phone || "Chưa cập nhật"}
                </Text>
              </div>
            </div>
          </Space>
        </div>
      </Card>
    </div>
  );
}
