import { Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState, useEffect } from "react";
import { ProductType } from "../types";

interface Props {
  onSelect: (e: string) => void;
}

function SelectComponent({ onSelect }: Props) {
  const [items, setItems] = useState<ProductType[]>([]);
  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const data: [] = JSON.parse(storedData);
      setItems([...data]);
    }
  }, []);
  const handleChange = (e: string) => {
    onSelect(e);
  };
  const duplicateTypeOrigins = Array.from(
    new Set(
      items.map((item: ProductType) => {
        return item.origin;
      })
    )
  );

  return (
    <Select style={{ width: 120 }} onChange={handleChange}>
      {duplicateTypeOrigins.map((origin: string) => {
        return <Option value={origin}>{origin}</Option>;
      })}
    </Select>
  );
}

export default SelectComponent;
