import React, { useEffect, useState } from "react";
import Navigation from "../../../components/layout/Navigation";
import { Button, Col, Row, Space } from "antd";
import { Link } from "react-router-dom";
import SliderComponent from "../../../components/SliderComponent/components/SliderComponent";
import SearchComponent from "../../../components/SearchComponent";
import SelectComponent from "../../../components/SelectComponent";
import { ProductType } from "../../../types";
import TableList from "./TableList";

const styleRowLeft = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "left ",
};

const styleRowRigth = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "right ",
};

function ListProducts() {
  const [listProduct, setListProduct] = useState<ProductType[]>([]);
  const [text, setText] = useState<string>("");
  const [selectList, setSelectList] = useState<any[]>([]);
  const [origin, setOrigin] = useState<string>("");
  const [price, setPrice] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const data: [] = JSON.parse(storedData);
      setListProduct([...data]);
    }
  }, []);

  const handleFiltersChange = (e: any) => {
    const text = e.target.value;
    setText(text);
    handleFilter(text, origin, price);
  };
  const handleFilter = (text: string, origin: string, price: any) => {
    let data = localStorage.getItem("data") as any;
    if (data) {
      data = JSON.parse(data);
      var products;
      if (price.length < 1) {
        products = data.filter((product: ProductType) => {
          return (
            product.title.toLowerCase().includes(text.toLowerCase()) &&
            product.origin.toLowerCase().includes(origin.toLowerCase())
          );
        });
      } else {
        products = data.filter((product: any) => {
          return (
            product.title.toLowerCase().includes(text.toLowerCase()) &&
            product.origin.toLowerCase().includes(origin.toLowerCase()) &&
            parseFloat(product.price) > parseFloat(price[0]) &&
            parseFloat(product.price) < parseFloat(price[1])
          );
        });
      }

      setListProduct([...products]);
    }
  };
  const handleFiltersSelect = (nameOrigin: string) => {
    setOrigin(nameOrigin);
    handleFilter(text, nameOrigin, price);
  };

  const filters = (productList: any) => {
    setListProduct([...productList]);
    handleFilter(text, origin, price);
  };

  const handleFilterSlider = (price: number[] | [number, number]) => {
    console.log(price);

    setPrice([...price]);
    handleFilter(text, origin, price);
  };

  const handleCheckboxChangeToDelete = (record: ProductType) => {
    const productID = listProduct.findIndex((product: ProductType) => {
      return product.id === record.id;
    });
    const temp = [...listProduct];
    temp[productID].selected = !record.selected;
    setSelectList(temp);
  };

  const handleDeleteSelect = () => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const filteredProducts = selectList.filter((product: ProductType) => {
        return !product.selected;
      });
      setListProduct([...filteredProducts]);
      localStorage.setItem("data", JSON.stringify(filteredProducts));
    }
  };
  return (
    <Navigation>
      <Row style={{ padding: "20px", width: "100%" }}>
        <Col xs={24} sm={15}>
          <Row style={styleRowLeft} gutter={16}>
            <Col span={6} style={{ textAlign: "center", position: "relative" }}>
              <SearchComponent onSearch={handleFiltersChange} />
            </Col>
            <Col span={6} style={{ textAlign: "center", position: "relative" }}>
              <Space>
                Origin:
                <SelectComponent onSelect={handleFiltersSelect} />
              </Space>
            </Col>
            <Col span={6} style={{ textAlign: "center", position: "relative" }}>
              <Space style={{ width: "100%" }}>
                Price:
                <div style={{ width: "100%" }}>
                  <SliderComponent onSlider={handleFilterSlider} />
                </div>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={9} className="duy">
          <Row style={styleRowRigth}>
            <Col span={5}>
              <Link to="/add">
                <Button type="primary">Add</Button>
              </Link>
            </Col>
            <Col span={5}>
              <Button onClick={handleDeleteSelect} type="primary">
                Delete Selected
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <TableList
        handleCheckboxChangeToDelete={handleCheckboxChangeToDelete}
        data={listProduct}
        filters={filters}
      />
    </Navigation>
  );
}

export default ListProducts;
