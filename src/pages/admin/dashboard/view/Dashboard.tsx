import { Card, Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

const Dashboard = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Admin Dashboard</Title>
      <Text>Chào mừng bạn đến với trang quản trị.</Text>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card title="Tổng số người dùng" bordered>
            <Text strong>105</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tổng số đơn đặt phòng" bordered>
            <Text strong>320</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Doanh thu hôm nay" bordered>
            <Text strong>12.500.000đ</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
