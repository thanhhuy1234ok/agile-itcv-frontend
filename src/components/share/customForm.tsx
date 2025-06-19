import { useEffect, useRef } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import type { FormProps } from 'antd';
import type { InputRef } from 'antd';

const { Title } = Typography;

type InputType = 'text' | 'password' | 'email';

export interface FieldConfig {
  name: string;
  label: string;
  type?: InputType;
  rules?: any[];
}

interface CustomFormProps<T> extends FormProps<T> {
  fields: FieldConfig[];
  title?: string;
  submitText?: string;
}

function CustomForm<T>({
  fields,
  title,
  submitText,
  onFinish,
  ...rest
}: CustomFormProps<T>) {
    const inputRef = useRef<InputRef>(null)
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>{title}</Title>
      <Form<T> layout="vertical" onFinish={onFinish} {...rest}>
        {fields.map((field, index) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules || [{ required: true, message: `Vui lòng nhập ${field.label}` }]}
          >
            {field.type === 'password' ? <Input.Password /> : <Input ref={index === 0 ? inputRef : undefined}/>}
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CustomForm;
