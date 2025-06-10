import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Modal, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getJobsDetail, uploadPdfFile, createResume } from '@/services/api';
import { useAuth } from '@/global/AuthenticationContext';
import '@/styles/DetailJobs.scss';
import '@/styles/markdown.scss';



const JobsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { isAuthenticated } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

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

  const handleFileChange = (info) => {
    const fileList = info.fileList;

    if (fileList.length > 1) {
      fileList.splice(0, fileList.length - 1);
    }

    const lastFile = fileList[0];
    if (lastFile && lastFile.type !== 'application/pdf') {
      message.error('Vui lòng chọn file định dạng PDF.');
      setPdfFile(null);
      return;
    }

    setPdfFile(lastFile ? lastFile.originFileObj : null);
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      Modal.warning({
        title: 'Bạn chưa đăng nhập',
        content: 'Vui lòng đăng nhập để ứng tuyển công việc!',
        onOk: () => navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`),
      });
      return;
    }
    setIsModalOpen(true);
  };

 const handleModalOk = async () => {
  if (!pdfFile) {
    message.error('Vui lòng chọn file PDF hồ sơ ứng tuyển.');
    return;
  }

  try {
    
    const uploadRes = await uploadPdfFile(pdfFile, data.companyId._id);

    const filePath = uploadRes.data.url; 
    console.log('File uploaded successfully:', uploadRes);
    if (!filePath) {
      message.error('Không nhận được đường dẫn file từ server.');
      return;
    }

    await createResume({
      companyId: data.companyId._id,
      jobId: data._id,
      url: filePath,
    });

    setIsModalOpen(false);
    message.success('Ứng tuyển thành công! Chúng tôi đã nhận được hồ sơ của bạn.');
  } catch (error) {
    console.error('Lỗi khi upload hoặc tạo hồ sơ:', error);
    message.error('Lỗi khi gửi hồ sơ, vui lòng thử lại.');
  }
};




  if (!data) return <div className="loading">Đang tải dữ liệu...</div>;

  return (
    <div className="job-detail-container">
      <h1 className="job-title">{data.name}</h1>
      <p className="job-subtitle">Chi tiết công việc tuyển dụng</p>
      <div className="apply-button-wrapper">
        <button className="apply-button" onClick={handleApplyClick}>
          Ứng tuyển ngay
        </button>
      </div>
      <div className="company-info">
        <p><strong>Công ty:</strong> {data.companyId?.name}</p>
        <p><strong>Địa chỉ:</strong> {data.companyId?.address}</p>
      </div>

      <div className="job-meta">
        <div className="meta-item"><strong>Kỹ năng</strong><span>{data.skill?.join(', ')}</span></div>
        <div className="meta-item"><strong>Lương</strong><span>{data.salary.toLocaleString('vi-VN')} VNĐ</span></div>
        <div className="meta-item"><strong>Địa điểm</strong><span>{data.location}</span></div>
        <div className="meta-item"><strong>Trình độ</strong><span>{data.level}</span></div>
        <div className="meta-item"><strong>Số lượng</strong><span>{data.quantity}</span></div>
        <div className="meta-item">
          <strong>Thời gian</strong>
          <span>{new Date(data.startDate).toLocaleDateString()} - {new Date(data.endDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: data.description }} />

      <Modal
        title="Xác nhận ứng tuyển"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>
          Bạn có chắc chắn muốn ứng tuyển vào vị trí <strong>{data.name}</strong> tại{' '}
          <strong>{data.companyId?.name}</strong>?
        </p>

        <Upload
          beforeUpload={() => false} // Ngăn upload tự động
          onChange={handleFileChange}
          accept=".pdf"
          maxCount={1}
          fileList={pdfFile ? [{ uid: '-1', name: pdfFile.name, status: 'done' }] : []}
        >
          <Button icon={<UploadOutlined />}>Chọn file PDF hồ sơ (CV)</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default JobsDetail;
