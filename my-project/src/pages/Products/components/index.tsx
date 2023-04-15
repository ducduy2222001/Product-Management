import React, { useEffect, useState } from "react";
import Navigation from "../../../components/layout/Navigation";
import TableList from "./TableList";
import { Link } from "react-router-dom";
import { Button, Col, Row, Space } from "antd";
import SearchComponent from "../../../components/SearchComponent";
import SelectComponent from "../../../components/SelectComponent";
import SliderComponent from "../../../components/SliderComponent/components/SliderComponent";
import { SearchOutlined } from "@ant-design/icons";
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
  const storageKey = "data";
  const [listProduct, setListProduct] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [idList, setIdList] = useState<number[]>([]);
  const [selectList, setSelectList] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      const data: [] = JSON.parse(storedData);
      setListProduct([...data]);
      setList([...data]);
    }
  }, []);

  const handleFiltersChange = (e: any) => {
    const value: string = e.target.value;
    setText(value);
    if (value) {
      const filteredProducts = list.filter((product: any) => {
        return product.title.toLowerCase().includes(value.toLowerCase());
      });
      setListProduct([...filteredProducts]);
      localStorage.setItem("dataNew", JSON.stringify([...filteredProducts]));
    } else {
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        const data: [] = JSON.parse(storedData);
        setListProduct([...data]);
      }
    }
  };

  const filters = (productList: any) => {
    setListProduct([...productList]);
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      const data: [] = JSON.parse(storedData);
      setList([...data]);
    }
  };

  const handleFiltersSelect = (products: any) => {
    const storedDataNew = localStorage.getItem("dataNew");
    const storedData = localStorage.getItem("data");
    if (storedDataNew && text !== "") {
      const data: [] = JSON.parse(storedDataNew);
      const filterSelect = data.filter((e: any) => {
        return e.origin.toLowerCase().includes(products.toLowerCase());
      });
      localStorage.setItem("dataNew", JSON.stringify([...filterSelect]));
      setListProduct([...filterSelect]);
      localStorage.setItem("dataNew", JSON.stringify([...filterSelect]));
    } else {
      if (storedData) {
        const data: [] = JSON.parse(storedData);
        const filterSelect = data.filter((e: any) => {
          return e.origin.toLowerCase().includes(products.toLowerCase());
        });
        localStorage.setItem("dataNew", JSON.stringify([...filterSelect]));
        setListProduct(filterSelect);
      }
    }
  };

  const handleFilterSlider = (products: any) => {
    const storedDataNew = localStorage.getItem("dataNew");
    const storedData = localStorage.getItem("data");

    if (storedDataNew && text !== "") {
      const data: [] = JSON.parse(storedDataNew);
      const filteredProducts = data.filter((product: any) => {
        return product.price >= products[0] && product.price <= products[1];
      });
      setListProduct([...filteredProducts]);
    } else {
      if (storedData) {
        const data: [] = JSON.parse(storedData);
        const filteredProducts = data.filter((product: any) => {
          return product.price >= products[0] && product.price <= products[1];
        });
        setListProduct(filteredProducts);
      }
    }
  };

  const handleCheckboxChangeToDelete = (record: any) => {
    const productID = listProduct.findIndex((product: any) => {
      return product.id === record.id;
    });
    const temp = [...listProduct];
    temp[productID].selected = !record.selected;
    setSelectList(temp);
  };

  const handleDeleteSelect = () => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const data: [] = JSON.parse(storedData);
      const filteredProducts = selectList.filter((product: any) => {
        return !product.selected;
      });
      localStorage.setItem("data", JSON.stringify([...filteredProducts]));
      setListProduct([...filteredProducts]);
    }
  };
  return (
    <Navigation>
      <Row style={{ padding: "20px" }}>
        <Col span={15}>
          <Row style={styleRowLeft} gutter={16}>
            <Col span={6} style={{ textAlign: "center" }}>
              <SearchComponent onSearch={handleFiltersChange} />
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <Space>
                Origin:
                <SelectComponent onSelect={handleFiltersSelect} />
              </Space>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <Space style={{ width: "100%" }}>
                Price:
                <div style={{ width: "100%" }}>
                  <SliderComponent onSlider={handleFilterSlider} />
                </div>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={9}>
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
              {/* <Button type="primary">Delete Selected</Button> */}
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
