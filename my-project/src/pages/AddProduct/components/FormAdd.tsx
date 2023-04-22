import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber } from "antd";
import { ProductAdd, ProductType } from "../../../types";
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
  const [imageData, setImageData] = useState<string>(""); // Display the current time
  const onFinish = (values: ProductAdd) => {
    const listPro = JSON.parse(localStorage.getItem("data") || "[]");
    const maxId = listPro.reduce((add: number, product: ProductType) => {
      return product.id > add ? product.id : add;
    }, 0);
    const newValue = { ...values, id: maxId + 1, selected: false };
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Add 1 to the month, as it's zero-based
    var year = currentDate.getFullYear();
    var timeString =
      `${day}/${month}/${year} ` + hours + ":" + minutes + ":" + seconds;
    newValue.time = timeString;
    newValue.image = imageData;
    listPro.unshift(newValue);
    localStorage.setItem("data", JSON.stringify(listPro));
    // navigate("/");
  };
  const show = (value?: number) =>
    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      setImageData(event?.target.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item name={"title"} label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={"origin"} label="Origin" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={"price"}
        label="Price"
        rules={[{ type: "number", min: 100000, max: 9999999 }]}
      >
        <InputNumber formatter={show} />
      </Form.Item>
      <Form.Item
        name={["image"]}
        label="Link Image"
        rules={[{ required: true }]}
      >
        <input type="file" onChange={handleFileChange} />
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
