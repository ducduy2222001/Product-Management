import { useCallback, useEffect, useRef, useState } from "react";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../../services/ProductApi";
import { DeleteOutlined, FolderOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, List, Row, Space, Typography } from "antd";
import "./Card.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Divider, Radio } from "antd";
// import "antd/dist/antd.css";
const { Text } = Typography;
function CardProduct(props: any) {
  const { data } = props;
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (product: any) => (
        <Space>
          <Button onClick={() => handleDeleteProduct(product)}>Delete</Button>
          <Button onClick={() => handleUpdateProduct(product)}>Edit</Button>
        </Space>
      ),
    },
  ];

  const handleDeleteProduct = (product: any) => {
    const data = localStorage.getItem("data");
    if (data?.length) {
      const dataFake = JSON.parse(data);
      const productFilter = dataFake.filter((d: any) => {
        return d.id !== product.id;
      });
      localStorage.setItem("data", JSON.stringify(productFilter));
      props.filter([...productFilter]);
    }
  };

  const handleUpdateProduct = (product: any) => {
    navigate(`/update/${product.id}`);
  };

  const start = () => {
    localStorage.setItem("data", JSON.stringify([]));
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // delete product
  // const handleDeleteProduct = useCallback(
  //   (id: any) => {
  //     deleteProduct(id)
  //       .then(() => {
  //         const newProducts = products.filter(
  //           (product: any) => product.id !== id
  //         );
  //         setProducts(newProducts);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   },
  //   [products]
  // );
  //update
  // const handleUpdateProduct = useCallback((id: any) => {
  //   getProductById(id)
  //     .then((res) => {
  //       console.log(res);
  //       navigate(`/update/${id}`);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      <Button
        type="primary"
        onClick={start}
        disabled={!hasSelected}
        loading={loading}
      >
        Delete All
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="key"
        rowSelection={rowSelection}
      />
    </>
  );
}

export default CardProduct;
