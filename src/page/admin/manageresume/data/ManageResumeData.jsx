import dayjs from "dayjs";
import { FORMATE_DATE_TIME_VN } from "@/utils/format.time";

export const getColumns = (currentPage, pageSize, companyFilters, jobFilters) => [
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
    }
  ];