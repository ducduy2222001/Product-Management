import axios from "axios";
import React from "react";
const productApi = "http://localhost:3000/products";
export async function getProducts() {
  const response = await axios.get(productApi);
  return response;
}
export async function getProductById(id: any) {
  const response = await axios.get(`${productApi}/${id}`);
  return response;
}

export async function postProducts(product: any) {
  const response = await axios.post(productApi, product);
  return response;
}

export async function deleteProduct(id: number) {
  const response = await axios.delete(`${productApi}/${id}`);
  return response;
}

export async function updateProduct(id: any, product: any) {
  const response = await axios.put(`${productApi}/${id}`, product);
  return response;
}
