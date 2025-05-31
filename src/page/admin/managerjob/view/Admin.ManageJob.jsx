import CustomTable from '@/components/foundation/CustomTable';
import { Button, Card, Form } from 'antd';
import useManageJob from '../viewmodal/AdminManagerJobModal';
import { getColumns, getJobFormFields } from '../data/ManagerJobData';
import CustomForm from '@/components/foundation/CustomForm';
import CustomModal from '@/components/foundation/CustomModal'
import CustomTableToolbar from "@/components/foundation/CustomTableToolbar";

const ManageJobPage = () => {
    const {
        job,
        loading,
        total,
        currentPage,
        pageSize,
        visible,
        editJob,
        companies,
        description,
        setDescription,
        setVisible,
        handleSortChange,
        handleRefresh,
        handleSearch,
        handleAddJob,
        onPageChange,
        setEditJob,
        handleEditJob
    } = useManageJob();
    const [form] = Form.useForm();
    const columns = getColumns(currentPage, pageSize, setEditJob, setVisible, form);
    return (
        <>
            <Card>
                <CustomTableToolbar
                    onSearch={handleSearch}
                    onRefresh={handleRefresh}
                    fields={['name', 'companyId', 'phone']}
                    buttons={[
                        <Button
                            type="primary"
                            key="add"
                            onClick={() => {
                                setEditJob(null);
                                form.resetFields();
                                setVisible(true);
                            }}
                        >Thêm Công việc</Button>,
                    ]}
                />
                <CustomTable
                    title="Danh sách người dùng"
                    columns={columns}
                    data={job}
                    loading={loading}
                    total={total}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    sortFields={{ name: "Tên", companyId: 'Công ty', createdAt: 'Ngày tạo' }}
                    onSortChange={handleSortChange}
                />

                <CustomModal
                    visible={visible}
                    title={editJob ? "Chỉnh sửa công việc" : "Thêm công việc"}
                    onCancel={() => setVisible(false)}
                    onOk={() => form.submit()}
                    okText={editJob ? "Cập nhật" : "Xác nhận"}
                    footer={null}
                >
                    <CustomForm
                        form={form}
                        fields={getJobFormFields(companies, !!editJob, description, setDescription)}
                        onFinish={(values) => {
                            if (editJob) {
                                handleEditJob(values, editJob._id);
                            } else {
                                handleAddJob(values);
                            }
                            form.resetFields();
                        }}
                        buttonText={editJob ? "Cập nhật" : "Thêm công việc"}
                    />
                </CustomModal>
            
            </Card>
        </>
    );
}
export default ManageJobPage;