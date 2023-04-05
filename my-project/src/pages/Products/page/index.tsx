import React, { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../../services/ProductApi";
import Navigation from "../../../components/layout/Navigation";
import CardProduct from "../components/CardProduct";

function ListProducts() {
  const [listProduct, setListProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts()
      .then((res) => {
        setListProduct(res.data);
        setAllProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteProduct = (productId: any) => {
    const updatedProducts = listProduct.filter(
      (product: any) => product.id !== productId
    );
    setListProduct(updatedProducts);
  };

  const filteredProducts = useMemo(() => {
    return listProduct.filter((product: any) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [listProduct, searchTerm]);

  const productList = searchTerm ? filteredProducts : listProduct;

  return (
    <Navigation onSearch={handleSearch}>
      <CardProduct data={productList} onDelete={handleDeleteProduct} />
      {(!productList || productList.length === 0) && (
        <div>No products found</div>
      )}
    </Navigation>
  );
}

export default ListProducts;
