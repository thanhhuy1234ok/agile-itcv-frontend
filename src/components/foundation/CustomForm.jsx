import React from 'react';
import { Form, Input, Button } from 'antd';
import '@/styles/CustomFormStyle.scss'

const CustomForm = ({ fields, onFinish, initialValues, buttonText = 'Gửi' }) => {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      className="custom-form"
    >
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          label={field.label}
          name={field.name}
          rules={field.rules}
        >
          {field.render ? field.render() : <Input />}
        </Form.Item>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {buttonText} 
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
