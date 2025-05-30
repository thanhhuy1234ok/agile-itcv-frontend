import { createJob, getAllCompanies, getAllJobs, updateJob } from '@/services/api';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

const useManageJob = () => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [visible, setVisible] = useState(false)
    const [editJob, setEditJob] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [description, setDescription] = useState ("");

    const fetchJob = async (queryParams = {}) => {
        setLoading(true);
        try {
            const params = { current: currentPage, pageSize: pageSize, ...queryParams }
            const response = await getAllJobs(params);
  
            const jobData = response.data.result.data;
            setJob(jobData);
            setTotal(response.data.result.meta.total);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const onPageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleRefresh = () => {
        if (currentPage === 1) {
            fetchJob();
        } else {
            setCurrentPage(1);
        }
      };

        const fetchCompany = async (queryParams = {}) => {
          try {
            const params = { current: currentPage, pageSize: pageSize, ...queryParams };
            const response = await getAllCompanies(params);
              setCompanies(response.data.result.data); 
          } catch (error) {
            console.error("Lỗi khi lấy vai trò:", error);
          }
        };

    useEffect(() => {
        fetchJob();
    }, [currentPage, pageSize]);
    useEffect(() => {
        fetchCompany();
    }, []);
    const handleSearch = (value, field) => {
        fetchJob({ [field]: value });
    };
    const handleSortChange = (value) => {
        const [field, order] = value.split("_");
        const sortParam = order === "asc" ? field : `-${field}`;
        fetchJob({ sort: sortParam });
    };

    const handleEditJob = async (values,id) => {
        try {

            await updateJob(id, values);
            notification.success({
                message: "Thành công",
                description: "Chỉnh sửa công việc thành công!",
            });
            fetchJob();
            setVisible(false);
        } catch (error) {
            console.error("Lỗi khi chỉnh sửa công việc:", error);
            notification.error({
                message: "Thất bại",
                description: "Không thể chỉnh sửa công việc. Vui lòng thử lại!",
            });
        }
    };

    const handleAddJob = async (values) => {
        try {
            await createJob(values); 
            notification.success({
                message: "Thành công",
                description: "Thêm công việc thành công!",
            });
            fetchJob();
            setVisible(false);
        } catch (error) {
            console.error("Lỗi khi tạo công việc:", error);
            notification.error({
                message: "Thất bại",
                description: "Không thể tạo công việc. Vui lòng thử lại!",
            });
        }
    };

    return {
        job,
        loading,
        error,
        total,
        currentPage,
        pageSize,
        visible,
        editJob,
        companies,
        description,
        setDescription,
        setVisible,
        setJob,
        fetchJob,
        onPageChange,
        handleSearch,
        handleSortChange,
        handleAddJob,
        handleRefresh,
        handleEditJob,
        setEditJob,
        fetchCompany,
        setCompanies,
    };
}

export default useManageJob;