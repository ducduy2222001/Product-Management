import { Select } from "antd";
import React, { useState, useEffect } from "react";

interface Props {
  onSelect: (e: any) => void;
}

function SelectComponent({ onSelect }: Props) {
  const storageKey = "data";
  const [item, setItem] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      const data: [] = JSON.parse(storedData);
      setItem([...data]);
    }
  }, []);

  const handleChange = (e: any) => {
    onSelect(e.value);
  };

  const origins = item.map((e: any) => {
    return e.origin;
  });

  const uniqueOrigins = origins.filter((origin, index) => {
    return origins.indexOf(origin) === index;
  });

  return (
    <Select
      labelInValue
      defaultValue={{ value: "...", label: "..." }}
      style={{ width: 120 }}
      onChange={handleChange}
      options={uniqueOrigins.map((origin) => ({
        value: origin,
        label: origin,
      }))}
    />
  );
}

export default SelectComponent;
