import { useState, useEffect } from "react";
import {
  getCompanyFormFields,
  getEditStatusCompanyFormFields,
  getColumns,
} from "../data/ManageCompanyData";
import {
  createCompany,
  getAllCompanies,
  updateCompany,
  getJobsByCompanyId,
} from "@/services/api";
import { notification, Form } from "antd";

const useManageCompany = () => {
  const [company, setCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [jobModalVisible, setJobModalVisible] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);

  const [form] = Form.useForm();

  const fetchCompanies = async (queryParams = {}) => {
    setLoading(true);
    try {
      const params = { current: currentPage, pageSize, ...queryParams };
      const response = await getAllCompanies(params);
      const companyData = response.data.result.data;

      setCompany(companyData);
      setTotal(response.data.result.meta.total);
    } catch (error) {
      console.error("Error fetching companies:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể tải danh sách công ty.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, pageSize]);

  const handleSearch = (value, field) => {
    fetchCompanies({ [field]: value });
  };

  const handleRefresh = () => {
    if (currentPage === 1) {
      fetchCompanies();
    } else {
      setCurrentPage(1);
    }
  };

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split("_");
    const sortParam = order === "asc" ? field : `-${field}`;
    fetchCompanies({ sort: sortParam });
  };

  const handleAddCompany = async (values) => {
    const { logo, ...rest } = values;
    const logoUrl = logo?.[0]?.url || "";

    const payload = {
      ...rest,
      logo: logoUrl,
    };

    try {
      await createCompany(payload);
      notification.success({
        message: "Thành công",
        description: "Thêm công ty thành công!",
      });
      fetchCompanies();
      setVisible(false);
    } catch (error) {
      console.error("Lỗi khi thêm công ty:", error);
      notification.error({
        message: "Thất bại",
        description: "Không thể thêm công ty. Vui lòng thử lại!",
      });
    }
  };

  const handleUpdate = async (values) => {
    const { logo, ...rest } = values;
    const logoUrl = Array.isArray(logo) ? logo?.[0]?.url || "" : logo;

    const payload = {
      ...rest,
      logo: logoUrl,
    };

    try {
      await updateCompany(selectedCompany._id, payload);
      notification.success({
        message: "Thành công",
        description: "Cập nhật công ty thành công!",
      });
      fetchCompanies();
      setVisible(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      notification.error({
        message: "Thất bại",
        description: "Không thể cập nhật công ty. Vui lòng thử lại!",
      });
    }
  };

  const getFormFields = () => {
    if (modalType === "changestatus") return getEditStatusCompanyFormFields();
    return getCompanyFormFields();
  };

  const handleModalClose = () => {
    setVisible(false);
    setModalType(null);
    setSelectedCompany(null);
    if (modalType !== "viewdetail") {
      form.resetFields();
    }
  };

  const handleSubmit = (values) => {
    if (modalType === "add") {
      handleAddCompany(values);
    } else {
      handleUpdate({ ...selectedCompany, ...values });
    }
    handleModalClose();
  };

  const fetchJobsByCompany = async () => {
    if (!selectedCompany?._id) return;

    setJobsLoading(true);
    try {
      const queryParams = {
        "companyId._id": selectedCompany._id,
        sort: "-createdAt",
      };
      const res = await getJobsByCompanyId(queryParams);
      setJobs(res.data.result.data);
      setJobModalVisible(true);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách công việc:", error);
      setJobs([]);
    } finally {
      setJobsLoading(false);
    }
  };

  return {
    company,
    loading,
    total,
    currentPage,
    pageSize,
    visible,
    modalType,
    form,
    selectedCompany,
    jobModalVisible,
    jobs,
    jobsLoading,
    fetchJobsByCompany,
    setJobModalVisible,
    getColumns,
    setModalType,
    setSelectedCompany,
    setVisible,
    handleSearch,
    handleRefresh,
    onPageChange,
    handleSortChange,
    getFormFields,
    handleModalClose,
    handleSubmit,
  };
};

export default useManageCompany;
