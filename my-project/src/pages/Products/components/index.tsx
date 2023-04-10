import React, { useEffect, useState } from "react";
import { getProducts } from "../../../services/ProductApi";
import Navigation from "../../../components/layout/Navigation";
import CardProduct from "./CardProduct";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "antd";

function ListProducts() {
  const storageKey = "data";
  const [listProduct, setListProduct] = useState<any[]>([]);
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      const data: [] = JSON.parse(storedData);
      setListProduct([...data]);
      setList([...data]);
    }
  }, []);
  const handleFiltersChange = (e: any) => {
    const value: string = e.target ? e.target.value : text;
    setText(value);
    if (value) {
      const filteredProducts = list.filter((product: any) => {
        return product.title.toLowerCase().includes(value.toLowerCase());
      });
      setListProduct([...filteredProducts]);
    } else {
      setListProduct([...listProduct]);
    }
  };
  const filter = (productList: any) => {
    setListProduct([...productList]);
  };
  return (
    <Navigation onSearch={handleFiltersChange}>
      <Row>
        <Col span={12} style={{ padding: "20px" }}>
          <Link to="/add">
            <Button type="primary">Add</Button>
          </Link>
        </Col>
      </Row>
      <CardProduct data={listProduct} filter={filter} />
    </Navigation>
  );
}

export default ListProducts;
