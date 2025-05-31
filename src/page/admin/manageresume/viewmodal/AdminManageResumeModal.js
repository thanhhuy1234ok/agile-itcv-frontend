import { useEffect, useState } from "react";
import { getAllResumes, updateStatusResume } from "@/services/api";
import { notification } from 'antd';

const useManageResume = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [companyFilters, setCompanyFilters] = useState([]);
    const [jobFilters, setJobFilters] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [statusRecord, setStatusRecord] = useState(null);

    const fetchResumes = async (queryParams = {}) => {
        setLoading(true);
        try {
        const params = {
            current: currentPage,
            pageSize,
            populate: "companyId,jobId",
            sort: "-score",
            ...queryParams,
        };
        const res = await getAllResumes(params);
        const resumes = res?.data?.result?.data || [];
        setDataSource(resumes);
        setTotal(res?.data?.result?.meta?.total || 0);

        // Filters
        const companyIds = resumes.map(item => item.companyId).filter(Boolean);
        const uniqueCompanies = Array.from(new Set(companyIds.map(id => JSON.stringify(id))))
            .map(idStr => JSON.parse(idStr))
            .map(company => ({
            text: company?.name || company,
            value: company?._id || company,
            }));
        setCompanyFilters(uniqueCompanies);

        const jobIds = resumes.map(item => item.jobId).filter(Boolean);
        const uniqueJobs = Array.from(new Set(jobIds.map(id => JSON.stringify(id))))
            .map(idStr => JSON.parse(idStr))
            .map(job => ({
            text: job?.name || job,
            value: job?._id || job,
            }));
        setJobFilters(uniqueJobs);
        } catch (error) {
        console.error("Failed to fetch resumes:", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, [currentPage, pageSize]);

    const handleViewDetail = (record) => {
        setDrawerOpen(true);
        setSelectedRecord(record);
        console.log(record)
    };

    const handleUpdateStatus = async (values) => {
        console.log("Giá trị form cập nhật trạng thái:", values);

        if (!statusRecord?._id) {
            notification.error({
            message: 'Lỗi',
            description: 'Không có hồ sơ để cập nhật trạng thái.',
            });
            return;
        }

        try {
            await updateStatusResume(statusRecord._id, { status: values.status });
            setStatusModalOpen(false);
            notification.success({
            message: 'Thành công',
            description: 'Cập nhật trạng thái hồ sơ thành công.',
            });
            fetchResumes(); 
        } catch (error) {
            notification.error({
            message: 'Thất bại',
            description: 'Cập nhật trạng thái hồ sơ thất bại. Vui lòng thử lại.',
            });
            console.error("Cập nhật trạng thái thất bại:", error);
        }
    };

    const handleSearch = (value, field) => {
        fetchResumes({ [field]: value });
    };

    const handleRefresh = () => {
        if (currentPage === 1) {
        fetchResumes();
        } else {
        setCurrentPage(1);
        }
    };

    const handleSortChange = (value) => {
        const [field, order] = value.split("_");
        const sortParam = order === "asc" ? field : `-${field}`;
        fetchResumes({ sort: sortParam });
    };

    const onPageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    return {
        dataSource,
        loading,
        total,
        currentPage,
        pageSize,
        companyFilters,
        jobFilters,
        drawerOpen,
        selectedRecord,
        statusModalOpen,
        statusRecord,
        handleUpdateStatus,
        setStatusRecord,
        handleViewDetail,
        handleSearch,
        handleRefresh,
        handleSortChange,
        onPageChange,
        setDrawerOpen,
        setStatusModalOpen
    };
};

export default useManageResume;
