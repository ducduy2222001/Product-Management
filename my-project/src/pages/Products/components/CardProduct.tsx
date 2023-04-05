import { useCallback, useEffect, useState } from "react";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../../services/ProductApi";
import { DeleteOutlined, FolderOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, List, Row, Space, Typography } from "antd";
import "../style/Card.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const { Text } = Typography;

function CardProduct(props: any) {
  const { data } = props;
  const navigate = useNavigate();
  const [products, setProducts] = useState(data);
  useEffect(() => {
    setProducts(data);
  }, [data]);

  const handleDeleteProduct = useCallback(
    (id: any) => {
      deleteProduct(id)
        .then(() => {
          const newProducts = products.filter(
            (product: any) => product.id !== id
          );
          setProducts(newProducts);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [products]
  );
  //update
  const handleUpdateProduct = useCallback((id: any) => {
    getProductById(id)
      .then((res) => {
        console.log(res);
        navigate(`/update/${id}`); // chuyen huong den FormUpdate va truyen id qua URL
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Row justify={"center"}>
      <Col span={12}>
        <List
          bordered
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={products}
          renderItem={(product: any) => (
            <List.Item
              key={product.title}
              extra={<img width={250} alt="logo product" src={product.image} />}
            >
              <Row justify={"start"}>
                <Col span={12}>
                  <List.Item.Meta
                    title={<h1>{product.title}</h1>}
                    description={
                      <Typography.Title type="danger" level={4}>
                        {product.price} vnđ
                      </Typography.Title>
                    }
                  />
                  <Text> {product.origin}</Text>
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col span={6}>
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    icon={<FolderOutlined />}
                    onClick={() => handleUpdateProduct(product.id)}
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}

export default CardProduct;
