import { Input, Form, Button } from "antd";
import React from "react";

const Notification = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function FormInfo() {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div
      style={{
        width: "300px",
      }}
    >
      <h3>Form Info</h3>
      <Form onFinish={onFinish} {...layout} validateMessages={Notification}>
        <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Age" name={"age"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name={"email"} rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name={"phone"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Desc" name={["desc"]} rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormInfo;
