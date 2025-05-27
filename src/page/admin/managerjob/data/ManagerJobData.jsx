import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, CodeOutlined } from "@ant-design/icons";
import { Input, Select, Tag, Avatar, Button, DatePicker, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";
import TextArea from 'antd/es/input/TextArea';
import { ProFormSelect } from '@ant-design/pro-components';
import dayjs from 'dayjs';

export const getJobFormFields = (companies, isEdit = false) => [
    {
        name: "name",
        label: "Tên công việc",
        rules: [{ required: true, message: "Vui lòng nhập tên người dùng" }],
        render: () => <Input prefix={<UserOutlined />} placeholder="Nhập tên người dùng" size="large" />,
    },
    {
        name: "skill",
        label: "Kỹ năng",
        rules: [{ required: true, message: "Vui lòng chọn ít nhất một kỹ năng" }],
        render: () => (
            <Select
                mode="multiple"
                allowClear
                size="large"
                placeholder="Chọn kỹ năng"
                prefix={<CodeOutlined />} 
                options={[
                    { label: "React", value: "react" },
                    { label: "Node.js", value: "nodejs" },
                    { label: "Python", value: "python" },
                    { label: "Java", value: "java" },
                    { label: "C++", value: "cpp" },
                    { label: "SQL", value: "sql" },
                ]}
            />
        ),
    },
    {
        name: "startDate",
        label: "Ngày bắt đầu",
        rules: [{ required: true, message: "Vui lòng chọn ngày bắt đầu" }],
        render: () => (
            <DatePicker
                placeholder="Chọn ngày bắt đầu"
                style={{ width: "100%" }}
                size="large"
                format="YYYY-MM-DD"
                disabledDate={(current) => current && current < dayjs().startOf("day")}
            />
        ),
        initialValue: dayjs(), // hôm nay
    },
    {
        name: "endDate",
        label: "Ngày kết thúc",
        dependencies: ["startDate"],
        rules: [
            { required: true, message: "Vui lòng chọn ngày kết thúc" },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    const startDate = getFieldValue("startDate");
                    if (!value || !startDate || value.isAfter(startDate)) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error("Ngày kết thúc phải sau ngày bắt đầu"));
                },
            }),
        ],
        render: () => (
            <DatePicker
                placeholder="Chọn ngày kết thúc"
                style={{ width: "100%" }}
                size="large"
                format="YYYY-MM-DD"
            />
        ),
        initialValue: dayjs().add(1, 'day'), // ngày mai
    },
    {
        name:"location",
        label: "Địa điểm",
        rules: [{ required: true, message: "Vui lòng nhập địa điểm" }],
        render: () => <Input prefix={<UserOutlined />} placeholder="Nhập địa điểm" size="large" />,
    },
    {
        name: "salary",
        label: "Mức lương",
        rules: [{ required: true, message: "Vui lòng nhập mức lương" }],
        render: () => (
            <InputNumber
                size="large"
                placeholder="Nhập mức lương"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                addonAfter={"VNĐ"}
          />
        ),
    },
    {
        name: "companyId",
        label: "Công ty",
        rules: [{ required: true, message: "Vui lòng chọn công ty" }],
        render: () => (
            <Select placeholder="Chọn công ty" size="large">
                {companies.map((role) => (
                    <Select.Option key={role._id} value={role._id}>
                        {role.name}
                    </Select.Option>
                ))}
            </Select>
        ),
    },
    {
        name: "quantity",
        label: "Số lượng vị trí",
        rules: [{ required: true, message: "Vui lòng nhập số lượng vị trí" }],
        render: () => <Input prefix={<UserOutlined />} placeholder="Nhập số lượng vị trí" size="large" />,
    },
    {
        name: "level",
        label: "Cấp độ",
        rules: [{ required: true, message: "Vui lòng chọn cấp độ" }],
        render: () => (
            <Select placeholder="Chọn cấp độ" size="large">
                <Select.Option value="INTERN">INTERN</Select.Option>
                <Select.Option value="FRESHER">FRESHER</Select.Option>
                <Select.Option value="JUNIOR">JUNIOR</Select.Option>
                <Select.Option value="MIDDLE">MIDDLE</Select.Option>
                <Select.Option value="SENIOR">SENIOR</Select.Option>
            </Select>
        )
    },
    {
        name: "description",
        label: "Mô tả",
        rules: [{ required: true, message: "Vui lòng nhập mô tả" }],
        render: () => (
            <>
                <TextArea rows={4} style={{
                    height: 150,
                }} />
            </>
        ),
    },
];

export const getColumns = (currentPage, pageSize, setEditJob, setVisible, form) => [
    {
        title: "ID",
        key: "id",
        render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
        title: "Tên",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Công ty",
        dataIndex: "companyId",
        key: "companyId",
        render: (company) => <Tag color="blue">{company?.name}</Tag>,
    },
    {
        title: "Ngày bắt đầu",
        dataIndex: "startDate",
        key: "startDate",
        render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
        title: "Ngày kết thúc",
        dataIndex: "endDate",
        key: "endDate",
        render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
            <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                    setEditJob(record);
                    setVisible(true);
                    form.setFieldsValue({
                        ...record,
                        companyId: record.companyId?._id,
                        startDate: dayjs(record.startDate),
                        endDate: dayjs(record.endDate),
                        skills: record.skills?.map((skill) => skill.name),
                    });
                }}
            />
        ),
    },
];
