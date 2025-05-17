import { useEffect } from "react";
import {
  Card,
  Typography,
  Tabs,
  Button,
  Table,
  Statistic,
  Spin,
  notification,
  Tag,
  Avatar,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  SettingOutlined,
  DatabaseOutlined,
  ReloadOutlined,
  DashboardOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useAdminHomepageModal } from "../viewmodal/AdminHomepageModal";
import "./style.AdminHomepage.scss";

const { Title, Paragraph } = Typography;

const AdminHomepage = () => {
  const {
    stats,
    users,
    settings,
    loading,
    fetchStats,
    fetchUsers,
    fetchSettings,
    updateSetting,
  } = useAdminHomepageModal();

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchSettings();
  }, [fetchStats, fetchUsers, fetchSettings]);

  const handleRefresh = () => {
    fetchStats();
    fetchUsers();
    fetchSettings();
    notification.success({
      message: "Làm mới dữ liệu",
      description: "Dữ liệu đã được cập nhật mới nhất.",
    });
  };

  const userColumns = [
    {
      title: "Người dùng",
      key: "user",
      render: () => (
        <div className="user-info-cell">
          <Avatar icon={<UserOutlined />} />
          <div className="user-details">
            <div className="user-name">N/A</div>
            <div className="user-email">N/A</div>
          </div>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "blue" : "default"}>
          {role === "admin" ? "Quản trị viên" : "Người dùng"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          icon={status ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          color={status ? "success" : "error"}>
          {status ? "Hoạt động" : "Bị khóa"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => (
        <div className="action-buttons">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              className="action-button"
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              className="action-button"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              className="action-button delete"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const settingColumns = [
    {
      title: "Tên cài đặt",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
      render: (value) => <div className="setting-value">{value}</div>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<EditOutlined />}
          onClick={() => {
            // Xử lý cập nhật cài đặt
            const newValue = prompt("Nhập giá trị mới:", record.value);
            if (newValue !== null) {
              updateSetting(record.id, newValue);
            }
          }}>
          Cập nhật
        </Button>
      ),
    },
  ];

  const tabItems = [
    {
      key: "users",
      label: (
        <span className="tab-label">
          <UserOutlined />
          Người dùng
        </span>
      ),
      children: (
        <Spin spinning={loading.users}>
          <div className="table-header">
            <div className="table-title">Danh sách người dùng</div>
            <Button type="primary">Thêm người dùng</Button>
          </div>
          <Table
            columns={userColumns}
            dataSource={users}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} người dùng`,
            }}
            className="data-table"
          />
        </Spin>
      ),
    },
    {
      key: "settings",
      label: (
        <span className="tab-label">
          <SettingOutlined />
          Cài đặt hệ thống
        </span>
      ),
      children: (
        <Spin spinning={loading.settings}>
          <div className="table-header">
            <div className="table-title">Cài đặt hệ thống</div>
            <Button type="primary">Thêm cài đặt</Button>
          </div>
          <Table
            columns={settingColumns}
            dataSource={settings}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} cài đặt`,
            }}
            className="data-table"
          />
        </Spin>
      ),
    },
  ];

  return (
    <div className="admin-panel-container">
      <Card className="admin-panel-header">
        <div className="admin-panel-title">
          <div>
            <Title level={2}>Admin Panel</Title>
            <Paragraph>
              Quản lý hệ thống và cấu hình các tùy chọn nâng cao.
            </Paragraph>
          </div>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading.stats || loading.users || loading.settings}>
            Làm mới dữ liệu
          </Button>
        </div>
      </Card>

      <Spin spinning={loading.stats}>
        <div className="stats-grid">
          <Card className="stat-card">
            <Statistic
              title="Tổng người dùng"
              value={stats.totalUsers || 0}
              prefix={<UserOutlined />}
              className="stat-content"
            />
          </Card>
          <Card className="stat-card">
            <Statistic
              title="Tổng site"
              value={stats.totalSites || 0}
              prefix={<DatabaseOutlined />}
              className="stat-content"
            />
          </Card>
          <Card className="stat-card">
            <Statistic
              title="Site hoạt động"
              value={stats.activeSites || 0}
              prefix={<DashboardOutlined />}
              className="stat-content"
            />
          </Card>
          <Card className="stat-card">
            <Statistic
              title="Cài đặt hệ thống"
              value={stats.totalSettings || 0}
              prefix={<SettingOutlined />}
              className="stat-content"
            />
          </Card>
        </div>
      </Spin>

      <Card className="admin-panel-content">
        <Tabs defaultActiveKey="users" items={tabItems} />
      </Card>
    </div>
  );
};

export default AdminHomepage;
