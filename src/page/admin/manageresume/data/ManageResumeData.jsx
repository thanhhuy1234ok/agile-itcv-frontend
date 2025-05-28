import dayjs from "dayjs";
import { FORMATE_DATE_TIME_VN } from "@/utils/format.time";
import { Tag, Select } from "antd";
import { EyeOutlined } from '@ant-design/icons';

const statusColorMap = {
  PENDING: "default",
  REVIEWING: "processing",
  APPROVED: "success",
  REJECTED: "error",
};

export const statusFields = [
  {
    name: "status",
    label: "Trạng thái",
    rules: [{ required: true, message: "Vui lòng chọn trạng thái" }],
    render: () => (
      <Select>
        <Select.Option value="PENDING">PENDING</Select.Option>
        <Select.Option value="REVIEWING">REVIEWING</Select.Option>
        <Select.Option value="APPROVED">APPROVED</Select.Option>
        <Select.Option value="REJECTED">REJECTED</Select.Option>
      </Select>
    ),
  },
];

export const getColumns = (currentPage, pageSize, companyFilters, jobFilters, handleViewDetail, setStatusRecord, setStatusModalOpen, form) => [
    {
        title: "STT",
        key: "stt",
        render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Company ID",
        dataIndex: "companyId",
        key: "companyId",
        filters: companyFilters,
        onFilter: (value, record) => record.companyId._id === value,
        render: (company) => company?.name
    },
    {
        title: "Job ID",
        dataIndex: "jobId",
        key: "jobId",
        filters: jobFilters,
        onFilter: (value, record) => record.jobId._id === value,
        render: (job) => job?.name
    },
    {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt) => dayjs(createdAt).format(FORMATE_DATE_TIME_VN),
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status, record) => (
        <Tag
            color={statusColorMap[status] || "default"}
            style={{ cursor: "pointer" }}
            onClick={() => {
                setStatusRecord(record)
                setStatusModalOpen(true)
                form.setFieldsValue({
                    
                    status: record.status,
                });
            }}
        >
            {status}
        </Tag>
        ),
    },
    {
        title: "CV",
        dataIndex: "cvPath",
        key: "cvPath",
        render: (path) => (
            <a
            href={`${import.meta.env.VITE_BACKEND_URL}/${path}`}
            target="_blank"
            rel="noopener noreferrer"
            >
                Xem CV
            </a>
        ),
    },
    {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
        <EyeOutlined 
            style={{ cursor: 'pointer', fontSize: '18px' }} 
            onClick={()=>handleViewDetail(record)} 
        />
        ),
    }
  ];