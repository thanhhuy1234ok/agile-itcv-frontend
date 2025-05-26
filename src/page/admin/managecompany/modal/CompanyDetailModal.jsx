import React from 'react';
import { Card, Typography, Avatar, Tag, Space } from 'antd';
import {
  EnvironmentOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import { FORMATE_DATE_VN } from '@/utils/format.time';

const { Title, Text, Paragraph } = Typography;

const CompanyDetail = ({ data }) => {
  console.log(data)
  if (!data) return null;

  return (
    <Card style={{ width: 450, margin: 'auto', textAlign: 'center' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Avatar shape="square" size={120} src={data.logo} style={{ margin: 'auto' }} />
        <Title level={3}>{data.name}</Title>
        <Tag color={data.isActive ? 'green' : 'volcano'} style={{ fontSize: 14 }}>
          {data.isActive ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          &nbsp;{data.isActive ? 'Đang hoạt động' : 'Tạm khóa'}
        </Tag>

        <div style={{ textAlign: 'left' }}>
          <CalendarOutlined style={{ fontSize: 18, color: '#1890ff', marginRight: 8 }} />
          <Text strong>Ngày tạo:</Text>
          <div style={{ marginTop: 4 }}>
            <Text>{dayjs(data.createdAt).format(FORMATE_DATE_VN)}</Text>
          </div>
        </div>

        <div style={{ textAlign: 'left' }}>
          <EnvironmentOutlined style={{ fontSize: 18, color: '#1890ff', marginRight: 8 }} />
          <Text strong>Địa chỉ:</Text>
          <div style={{ marginTop: 4 }}>
            <Text>{data.address}</Text>
          </div>
        </div>

        <div style={{ textAlign: 'left' }}>
          <InfoCircleOutlined style={{ fontSize: 18, color: '#1890ff', marginRight: 8 }} />
          <Text strong>Mô tả:</Text>
          <Paragraph style={{ whiteSpace: 'pre-line', marginBottom: 0, marginTop: 4 }}>
            <ReactMarkdown>{data.description || 'Không có mô tả'}</ReactMarkdown>
          </Paragraph>
        </div>
      </Space>
    </Card>
  );
};

export default CompanyDetail;
