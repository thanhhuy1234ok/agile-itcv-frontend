import React, { useState } from 'react';
import { Avatar, Upload, Button, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import CustomForm from '../../components/foundation/CustomForm';
import moment from 'moment';
import {Input, Select, DatePicker } from 'antd';



const { Title } = Typography;

const getBase64 = (file, cb) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => cb(reader.result);
};

const Profile = () => {
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || '');

  const initialValues = {
    name: 'Duẫn Nguyễn',
    title: '',
    email: 'duanlovetuong@gmail.com',
    phone: '',
    dob: null,
    gender: '',
    city: '',
    address: '',
    link: '',
  };

  const fields = [
    {
      name: 'name',
      label: 'Full name',
      rules: [{ required: true, message: 'Please enter your full name' }],
    },
    {
      name: 'title',
      label: 'Title',
      rules: [{ required: true, message: 'Please enter your title' }],
    },
    {
        name: 'email',
        label: 'Email',
        render: () => <Input disabled placeholder="Email đã đăng ký" />,
      },      
    {
      name: 'phone',
      label: 'Phone number',
      rules: [{ required: true, message: 'Please enter your phone number' }],
    },
    {
        name: 'dob',
        label: 'Date of Birth',
        rules: [{ required: true, message: 'Please select your birth date' }],
        render: () => <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="Chọn ngày sinh" />,
      },      
      {
        name: 'gender',
        label: 'Gender',
        rules: [{ required: true, message: 'Please select gender' }],
        render: () => (
          <Select placeholder="Chọn giới tính">
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
            <Option value="Giới tính khác">Giới tính khác</Option>
          </Select>
        ),
      },      
    {
      name: 'city',
      label: 'Current province/city',
      rules: [{ required: true, message: 'Please enter your city' }],
    },
    {
      name: 'address',
      label: 'Address (Street, district,...)',
      rules: [{ required: true, message: 'Please enter your address' }],
    },
    {
      name: 'link',
      label: 'Personal link (LinkedIn, Portfolio...)',
      rules: [{ type: 'url', message: 'Invalid URL (must start with http/https)' }],
    },
  ];

  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      dob: values.dob ? moment(values.dob).format('DD/MM/YYYY') : '',
      avatar,
    };

    console.log('✅ Profile data:', formattedValues);
    localStorage.setItem('userAvatar', avatar);
    message.success('Thông tin đã được lưu!');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <Title level={4}>Thông tin người dùng</Title>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <Avatar size={64} src={avatar}>D</Avatar>
        <div style={{ display: 'flex', gap: 12 }}>
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            customRequest={({ file }) =>
              getBase64(file, (base64) => {
                setAvatar(base64);
                localStorage.setItem('userAvatar', base64);
                message.success('Tải ảnh thành công!');
              })
            }
          >
            <Button icon={<EditOutlined />} type="link">Edit</Button>
          </Upload>
          <Button icon={<DeleteOutlined />} type="link" danger onClick={() => setAvatar('')}>
            Delete
          </Button>
        </div>
      </div>

      <CustomForm
        fields={fields}
        initialValues={initialValues}
        onFinish={handleSubmit}
        buttonText="Save"
      />
    </div>
  );
};

export default Profile;


