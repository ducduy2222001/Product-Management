import React, { useEffect, useState } from "react";
import { getProducts } from "./CallApi";
import "./style/Cart.css";
import { ShoppingCartOutlined } from "@ant-design/icons";

function ListProduct() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getProducts()
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      {data.map((product: any) => {
        return (
          <div key={product.id} className="card">
            <img
              src={product.image}
              alt=""
              style={{ width: "100%", height: "240px" }}
            />
            <div className="card-details">
              <p className="text-title">{product.title}</p>
              <p className="text-body">
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {product.price}
                </p>
                <p>{product.origin}</p>
              </p>
            </div>
            <button className="card-button">
              <ShoppingCartOutlined
                style={{ fontSize: "20px", paddingRight: "10px" }}
              />
              MUA NGAY
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ListProduct;
