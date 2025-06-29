import React from 'react';
import CustomForm from '@/components/share/customForm';
import type { RegisterFormValues } from '@/pages/register/dto/register.dto'
import { fields } from '../data/register.data';
import { RegisterModal } from '../viewmodal/register.viewmodal';
import '@/pages/register/style/register.style.scss'

const RegisterPage: React.FC = () => { 
  const { handleSubmit } = RegisterModal()
  return (
    <div className="register-form">
      <CustomForm<RegisterFormValues>
        title="Đăng ký tài khoản"
        fields={fields}
        submitText="Đăng ký"
        onFinish={handleSubmit}
      />
    </div>
  );
};

export default RegisterPage;
