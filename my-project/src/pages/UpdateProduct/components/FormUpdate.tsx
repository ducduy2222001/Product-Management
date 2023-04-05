import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { getProductById, updateProduct } from "../../../services/ProductApi";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams<{ id: string }>(); // lay id tu URL
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        console.log(res);
        setProduct(res.data); // gan thong tin san pham vao state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onFinish = (values: any) => {
    updateProduct(id, values)
      .then((res) => {
        console.log(res);
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(values);
  };
  {
    // console.log(product);
  }

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      initialValues={{
        title: product?.title || "",
        origin: product?.origin || "",
        price: product?.price || "",
        image: product?.image || "",
      }}
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
        rules={[{ type: "number", min: 10000, max: 99999999 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={"image"} label="Image" rules={[{ required: true }]}>
        <Input />
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
