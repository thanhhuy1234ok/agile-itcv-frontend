import React, { useEffect, useState } from "react";
import CustomTable from "@/components/foundation/CustomTable";
import { getAllResumes } from "@/services/api"; 
import { getColumns } from "../data/ManageResumeData"
import CustomTableToolbar from "@/components/foundation/CustomTableToolbar"
import { Card, Drawer } from "antd";

const ManageResume = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);  
  const [pageSize, setPageSize] = useState(10); 
  const [companyFilters, setCompanyFilters] = useState([]);
  const [jobFilters, setJobFilters] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);


  const fetchResumes = async (queryParams = {}) => {
  setLoading(true);
  try {
    const params = {
      current: currentPage,
      pageSize: pageSize,
      populate: 'companyId,jobId',
      sort: '-score',
      ...queryParams,
    };
    const res = await getAllResumes(params);
    const resumes = res?.data?.result?.data || [];
    setDataSource(resumes);
    setTotal(res?.data?.result?.meta?.total || 0);

    // ----- Company Filters -----
    const companyIds = resumes.map(item => item.companyId).filter(Boolean);
    const uniqueCompanies = Array.from(new Set(companyIds.map(id => JSON.stringify(id))))
      .map(idStr => JSON.parse(idStr))
      .map(company => ({
        text: company?.name || company,
        value: company?._id || company,
      }));
    setCompanyFilters(uniqueCompanies);

    // ----- Job Filters -----
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

const handleViewDetail = (record) => {
    setDrawerOpen(true);
    setSelectedRecord(record)
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

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    fetchResumes();
  }, [currentPage, pageSize]);

  const columns = getColumns(currentPage, pageSize, companyFilters, jobFilters, handleViewDetail)

  return (
    <Card>

    <CustomTableToolbar
      onSearch={handleSearch}
      onRefresh={handleRefresh}
      fields={["email", "status"]}
    />

    <CustomTable
        title="Danh sách hồ sơ"
        columns={columns}
        data={dataSource}
        loading={loading}
        total={total}
        pageSize={pageSize}                   
        currentPage={currentPage}             
        onPageChange={onPageChange} 
        sortFields={{ email: 'Email', createdAt: 'Ngày tạo' }}
        onSortChange={handleSortChange}  
    />
    <Drawer
        title="Chi tiết ứng viên"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {selectedRecord && (
          <div>
            <p><b>Email:</b> {selectedRecord.email}</p>
            <p><b>Company:</b> {selectedRecord.companyId?.name}</p>
            <p><b>Job:</b> {selectedRecord.jobId?.name}</p>
            <p><b>Trạng thái:</b> {selectedRecord.status}</p>
            {/* thêm thông tin khác tùy ý */}
          </div>
        )}
      </Drawer>
    </Card>
  );
};

export default ManageResume;
