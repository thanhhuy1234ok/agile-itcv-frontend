import React, { useEffect, useState } from 'react';
import {
    Card,
    Avatar,
    Typography,
    Descriptions,
    Button,
    List,
    Tag,
    Empty,
    Space,
    Divider,
    Skeleton
} from 'antd';
import {
    EditOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined
} from '@ant-design/icons';
import '../../../../styles/ProfileClient.scss';
import { getResumeByUser } from '@/services/api';
import { useAuth } from '@/global/AuthenticationContext';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const Profile = () => {
    const { detailUser } = useAuth();
    const [resumeUser, setResumeUser] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchResumeByUser = async () => {
        try {
            setLoading(true);
            const response = await getResumeByUser();
            setResumeUser(response.data || []);
        } catch (error) {
            console.error('Error fetching resume:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumeByUser();
    }, []);

    return (
        <div className="profile-container">
            <Card className="profile-card" bordered={false}>
                <div className="profile-header">
                    <Avatar
                        size={100}
                        icon={<UserOutlined />}
                        src={detailUser?.img_url}
                        className="profile-avatar"
                    />
                    <div className="profile-info">
                        <Title level={3} className="profile-name">
                            {detailUser?.name || 'Chưa có tên'}
                        </Title>
                        <Space>
                            <Button icon={<EditOutlined />} type="primary" ghost>
                                Chỉnh sửa
                            </Button>
                        </Space>
                    </div>
                </div>

                <Divider />

                <Descriptions
                    title={<Text strong>Thông tin cá nhân</Text>}
                    column={1}
                    className="profile-descriptions"
                    labelStyle={{ width: '150px' }}
                >
                    <Descriptions.Item label={<MailOutlined />}>
                        {detailUser?.email || 'Chưa có'}
                    </Descriptions.Item>
                    <Descriptions.Item label={<PhoneOutlined />}>
                        {detailUser?.phone || 'Chưa có'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tham gia">
                        {dayjs(detailUser?.createdAt).format('DD-MM-YYYY')}
                    </Descriptions.Item>
                </Descriptions>

                <Divider />

                <Title level={4} style={{ marginBottom: 16 }}>
                    Việc làm đã ứng tuyển
                </Title>

                {loading ? (
                    <Skeleton active paragraph={{ rows: 3 }} />
                ) : resumeUser.length === 0 ? (
                    <Empty description="Bạn chưa ứng tuyển công việc nào" />
                ) : (
                    <List
                        itemLayout="vertical"
                        dataSource={resumeUser}
                        renderItem={(job) => (
                            <Card className={`job-card job-${job.status?.toLowerCase()}`} size="small">
                                <Space direction="vertical">
                                    <Text strong>{job.jobId?.name || 'Không rõ công việc'}</Text>
                                    <Text type="secondary">
                                        Công ty: {job.companyId?.name || 'Không rõ công ty'}
                                    </Text>
                                    <Text type="secondary">
                                        Ứng tuyển: {dayjs(job.createdAt).format('DD-MM-YYYY HH:mm')}
                                    </Text>
                                    <Tag color={job.status === 'Đã duyệt' ? 'green' : 'orange'}>
                                        {job.status}
                                    </Tag>
                                </Space>
                            </Card>
                        )}
                    />
                )}
            </Card>
        </div>
    );
};

export default Profile;
