import React, { useEffect, useRef, useState } from 'react';
import { Card, Tag, Button, Typography, Space, Pagination, Spin } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import '../../../../styles/JobList.scss';
import { getAllJobs } from '@/services/api';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const JobList = () => {
    const [jobList, setJobList] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [meta, setMeta] = useState({ current: 1, pageSize: 4, total: 0 });
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchJobs = async (page = 1, shouldScroll = true) => {
        setLoading(true);
        try {
            const queryParams = {
                current: page,
                pageSize: 4,
                sort: '-createdAt',
            };

            const res = await getAllJobs(queryParams);
            const result = res.data.result;

            setJobList(result.data);
            setMeta(result.meta);
            setSelectedJob(result.data[0]);

            if (shouldScroll) {
                setTimeout(() => {
                    const top = document.querySelector('.job-container')?.offsetTop || 0;
                    window.scrollTo({ top: top - 80, behavior: 'smooth' });
                }, 100);
            }
        } catch (error) {
            console.error('Error fetching job data:', error);
        }
        setLoading(false);
      };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;
        fetchJobs(page, false);
    }, []);

    const handlePageChange = (page) => {
        navigate(`?page=${page}`); // 🔁 cập nhật URL
        fetchJobs(page,true);           // 🔁 gọi lại API
      };

    return (
        <>
            <div className="job-container" >
                {/* LEFT SIDEBAR */}
                <div className="job-sidebar " >
                    {loading ? (
                        <Spin />
                    ) : (
                        <>
                            {jobList.map((job) => (
                                <Card
                                    key={job._id}
                                    title={<Text strong>{job.name}</Text>}
                                    extra={<Tag color="red">🔥 SUPER HOT</Tag>}
                                    className={`job-card ${selectedJob?._id === job._id ? 'selected' : ''}`}
                                    onClick={() => setSelectedJob(job)}
                                    
                                >
                                    <Text type="secondary">{job.companyId.name}</Text>
                                    <br />
                                    <Text type="secondary">
                                        {job.mode || 'At office'} • 📍 {job.companyId.address}
                                    </Text>
                                    <div style={{ marginTop: 10 }}>
                                        {job.skill.map((tag) => (
                                            <Tag key={tag}>{tag}</Tag>
                                        ))}
                                    </div>
                                    <ul style={{ paddingLeft: 20, marginTop: 10, color: '#dc2626' }}>
                                        <li>Mức lương: {job.salary.toLocaleString()} VND</li>
                                        <li>Level: {job.level}</li>
                                        <li>Số lượng tuyển: {job.quantity}</li>
                                    </ul>
                                </Card>
                            ))}
                        </>
                    )}
                </div>

                {/* RIGHT DETAIL */}
                <div className="job-content">
                    {selectedJob && (
                        <Card
                            title={<Title level={4}>{selectedJob.name}</Title>}
                            extra={<Button type="primary" danger>Apply now</Button>}
                            style={{ minHeight: 'calc(100vh - 100px)' }}
                        >
                            <Text strong>{selectedJob.companyId.name}</Text>
                            <div style={{ marginTop: 10 }}>
                                <Space>
                                    <EnvironmentOutlined />
                                    <Text>{selectedJob.companyId.address}</Text>
                                </Space>
                                <br />
                                <Text type="secondary">{selectedJob.mode || 'At office'}</Text>
                            </div>

                            <div style={{ marginTop: 15 }}>
                                {selectedJob.skill.map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>

                            <Title level={5} style={{ marginTop: 20 }}>Job Description</Title>
                            <div
                                className="markdown-preview"
                                dangerouslySetInnerHTML={{ __html: selectedJob.description }}
                            />
                        </Card>
                    )}
                </div>


            </div>
            <div className="pagination-center">
                <Pagination
                    align="center"
                    current={meta.current}
                    pageSize={meta.pageSize}
                    total={meta.total}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </>

    );
};

export default JobList;
