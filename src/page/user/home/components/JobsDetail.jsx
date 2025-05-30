import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getJobsDetail } from '@/services/api';
import '@/styles/DetailJobs.scss';
import '@/styles/markdown.scss';
const JobsDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const fetchJobDetail = async (jobId) => {
        try {
            const res = await getJobsDetail(jobId);
            setData(res.data);
        } catch (error) {
            console.error('Error fetching job details:', error);
        }
    };

    useEffect(() => {
        if (id) fetchJobDetail(id);
    }, [id]);

    if (!data) return <div className="loading">Đang tải dữ liệu...</div>;

    return (
        <div className="job-detail-container">
            <h1 className="job-title">{data.name}</h1>
            <p className="job-subtitle">Chi tiết công việc tuyển dụng</p>
            <div className="apply-button-wrapper">
                <button className="apply-button" onClick={() => alert('Ứng tuyển thành công!')}>
                    Ứng tuyển ngay
                </button>
            </div>
            <div className="company-info">
                <p><strong>Công ty:</strong> {data.companyId?.name}</p>
                <p><strong>Địa chỉ:</strong> {data.companyId?.address}</p>
            </div>

            <div className="job-meta">
                <div className="meta-item">
                    <strong>Kỹ năng</strong>
                    <span>{data.skill?.join(', ')}</span>
                </div>
                <div className="meta-item">
                    <strong>Lương</strong>
                    <span>{data.salary.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="meta-item">
                    <strong>Địa điểm</strong>
                    <span>{data.location}</span>
                </div>
                <div className="meta-item">
                    <strong>Trình độ</strong>
                    <span>{data.level}</span>
                </div>
                <div className="meta-item">
                    <strong>Số lượng</strong>
                    <span>{data.quantity}</span>
                </div>
                <div className="meta-item">
                    <strong>Thời gian</strong>
                    <span>
                        {new Date(data.startDate).toLocaleDateString()} - {new Date(data.endDate).toLocaleDateString()}
                    </span>
                </div>
               
            </div>

            <div
                className="markdown-preview"
                dangerouslySetInnerHTML={{ __html: data.description }}
            />

          
        </div>
    );
};

export default JobsDetail;
