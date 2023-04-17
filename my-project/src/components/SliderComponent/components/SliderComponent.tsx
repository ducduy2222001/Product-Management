import { Slider } from "antd";
import React from "react";
import "./style.css";

interface Props {
  onSlider: (e: number[] | [number, number]) => void;
}

function SliderComponent({ onSlider }: Props) {
  const handleChange = (e: number[] | [number, number]) => {
    onSlider(e);
  };
  return (
    <Slider
      range
      step={500000}
      onChange={handleChange}
      max={9999999}
      min={100000}
    />
  );
}

export default SliderComponent;
