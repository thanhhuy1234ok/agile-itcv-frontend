import { Form, Input, Button } from "antd";
import "@/styles/CustomFormStyle.scss";

const CustomForm = ({
  fields,
  onFinish,
  initialValues,
  form,
  buttonText,
  loading = false,
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      className="custom-form"
      requiredMark={false}>
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          label={field.label}
          name={field.name}
          rules={field.rules}
          tooltip={field.tooltip}
          className={field.className}>
          {field.render ? field.render(form) : <Input />}
        </Form.Item>
      ))}

      {buttonText && (
        <Form.Item className="form-submit-item">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="submit-button">
            {buttonText}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default CustomForm;
