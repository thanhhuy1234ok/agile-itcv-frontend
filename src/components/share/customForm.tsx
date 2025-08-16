import { useEffect, useRef } from "react";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import type { FormProps } from "antd";
import type { InputRef } from "antd";
import "@/styles/style.scss";

const { Title } = Typography;

type InputType = "text" | "password" | "email" | "checkbox";

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
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      {title && (
        <Title level={3} className="custom-form-title">
          {title}
        </Title>
      )}
      <Form<T> layout="vertical" onFinish={onFinish} {...rest}>
        {fields.map((field, index) => (
          <Form.Item
            key={field.name}
            name={field.name as any}
            label={field.type === "checkbox" ? undefined : field.label}
            valuePropName={field.type === "checkbox" ? "checked" : undefined}
            rules={field.rules}
          >
            {field.type === "password" ? (
              <Input.Password />
            ) : field.type === "checkbox" ? (
              <Checkbox>{field.label}</Checkbox>
            ) : (
              <Input ref={index === 0 ? inputRef : undefined} />
            )}
          </Form.Item>
        ))}

        {submitText && (
          <Form.Item>
            <Button htmlType="submit" block className="custom-button">
              {submitText}
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  );
}

export default CustomForm;
