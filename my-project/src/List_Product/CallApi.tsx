import React from "react";

const productApi = "http://localhost:3000/ListProduct";

export async function getProducts() {
  return await fetch(productApi);
}
