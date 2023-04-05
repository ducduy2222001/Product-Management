import React, { useState } from "react";
import { Button, Form, Input, InputNumber, UploadFile } from "antd";
import { postProducts } from "../../../services/ProductApi";
import { useNavigate } from "react-router-dom";
import UploadImage from "./UploadImage";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const FormData: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const onFinish = (values: any) => {
    setFormData(values);
    console.log(formData);

    postProducts(formData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
      <Form.Item name={["title"]} label="Title" rules={[{ required: true }]}>
        <Input
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item name={["origin"]} label="Origin" rules={[{ required: true }]}>
        <Input
          onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        name={["price"]}
        label="Price"
        rules={[{ type: "number", min: 10000, max: 99999999 }]}
      >
        <InputNumber
          formatter={(value) =>
            ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          onChange={(value) => setFormData({ ...formData, price: value })}
        />
      </Form.Item>
      {/* <Form.Item name={["image"]} label="Image">
        <UploadImage onImageData={handleImageData} />
      </Form.Item> */}
      <Form.Item
        name={["image"]}
        label="Link Image"
        rules={[{ required: true }]}
      >
        <Input
          onChange={(value) => setFormData({ ...formData, image: value })}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormData;
