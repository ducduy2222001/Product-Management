import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Table, Checkbox } from "antd";
import "./style.css";
function TableList(props: any) {
  const { data, handleCheckboxChangeToDelete } = props;
  const navigate = useNavigate();
  const handleCheckboxChange = (record: any) => {
    handleCheckboxChangeToDelete(record);
  };
  const columns = [
    {
      title: "Select",
      dataIndex: "Select",
      key: "Select",
      render: (text: any, record: any) => {
        return (
          <Checkbox
            checked={record.selected}
            onChange={() => handleCheckboxChange(record)}
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: any) => (
        <img src={image} alt="Avatar" style={{ maxWidth: "70px" }} />
      ),
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
      props.filters([...productFilter]);
    }

    const newData = localStorage.getItem("dataNew");
    if (newData?.length) {
      const dataFake = JSON.parse(newData);
      const productFilter1 = dataFake.filter((d: any) => {
        return d.id !== product.id;
      });
      localStorage.setItem("dataNew", JSON.stringify(productFilter1));
      if (newData?.length == 0) {
        props.filters([]);
      }
      props.filters([...productFilter1]);
    }
  };

  const handleUpdateProduct = (product: any) => {
    navigate(`/update/${product.id}`);
  };

  return <Table dataSource={data} columns={columns} rowKey="key" />;
}

export default TableList;
