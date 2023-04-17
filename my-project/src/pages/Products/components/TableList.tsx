import { useNavigate } from "react-router-dom";
import { Table, Checkbox } from "antd";
import { Button, Space } from "antd";
import "./style.css";
import { ProductType } from "../../../types";

function TableList(props: any) {
  const { data, handleCheckboxChangeToDelete } = props;
  const navigate = useNavigate();
  const handleCheckboxChange = (item: any) => {
    handleCheckboxChangeToDelete(item);
  };

  const handleFilters = (key: string) => {
    const duplicateType = Array.from(
      new Set(
        data.map((item: any) => {
          return item[key];
        })
      )
    );
    const result = duplicateType.map((value) => {
      return { text: value, value: value };
    });
    return result;
  };
  const handleOnFilter = (value: string, record: any, key: string) =>
    record[key].startsWith(value);

  const columns: any = [
    {
      title: "Select",
      dataIndex: "Select",
      key: "Select",
      render: (text: any, item: ProductType) => {
        return (
          <Checkbox
            checked={item.selected}
            onChange={() => handleCheckboxChange(item)}
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filters: handleFilters("title"),
      onFilter: (value: string, record: ProductType) =>
        handleOnFilter(value, record, "title"),
      sorter: (a: string, b: string) => {
        return 1;
      },
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
      filters: handleFilters("origin"),
      onFilter: (value: string, record: ProductType) =>
        handleOnFilter(value, record, "origin"),
      sorter: (a: string, b: string) => {
        return 1;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: number, b: number) => {
        return 1;
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="Avatar" style={{ maxWidth: "70px" }} />
      ),
    },
    {
      title: "time",
      dataIndex: "time",
      key: "time",
      sorter: (a: string, b: string) => {
        return 1;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (product: ProductType) => (
        <Space>
          <Button onClick={() => handleDeleteProduct(product)}>Delete</Button>
          <Button onClick={() => handleUpdateProduct(product)}>Edit</Button>
        </Space>
      ),
    },
  ];

  const handleDeleteProduct = (item: ProductType) => {
    const storedData = localStorage.getItem("data");
    if (storedData?.length) {
      const data = JSON.parse(storedData);
      const products = data.filter((product: ProductType) => {
        return product.id !== item.id;
      });
      localStorage.setItem("data", JSON.stringify(products));
      props.filters([...products]);
    }
  };

  const handleUpdateProduct = (product: ProductType) => {
    navigate(`/update/${product.id}`);
  };

  return <Table dataSource={data} columns={columns} rowKey="key" />;
}

export default TableList;
