import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { getProductById, updateProduct } from "../../../services/ProductApi";
import { useNavigate, useParams } from "react-router-dom";
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

const FormUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageData, setImageData] = useState<string>("");

  const onFinish = (values: ProductAdd) => {
    const products = JSON.parse(localStorage.getItem("data") || "[]");
    let newProduct = { ...values, id: Number(id) };
    const index = products.findIndex((product: any) => {
      return product.id == newProduct.id;
    });
    var currentDate = new Date();
    // Get the current hours, minutes, and seconds from the Date object
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Add 1 to the month, as it's zero-based
    var year = currentDate.getFullYear();
    // Format the time as a string
    var timeString =
      `${day}/${month}/${year} ` + hours + ":" + minutes + ":" + seconds;
    newProduct.time = timeString;
    newProduct.image = imageData;
    products[index] = newProduct;
    localStorage.setItem("data", JSON.stringify(products));
    navigate("/");
  };
  const show = (value: any) =>
    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    // Create a FileReader object to read the file data
    const reader = new FileReader();

    // Set the onload event handler to update the state with the image data
    reader.onload = (event: any) => {
      setImageData(event?.target.result);
    };
    // Read the file data as a Data URL
    reader.readAsDataURL(file);
  };

  const product = localStorage.getItem("data");
  const datas = product ? JSON.parse(product) : [];
  const check = datas.filter((data: any) => {
    return data.id == id;
  });
  const { title, origin, price } = check[0] || {};

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
      <Form.Item name={"title"} label="Title" rules={[{ required: true }]}>
        <Input defaultValue={title} />
      </Form.Item>
      <Form.Item name={"origin"} label="Origin" rules={[{ required: true }]}>
        <Input defaultValue={origin} />
      </Form.Item>
      <Form.Item
        name={"price"}
        label="Price"
        rules={[{ type: "number", min: 10000, max: 99999999 }]}
      >
        <InputNumber formatter={show} defaultValue={price} />
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

export default FormUpdate;
