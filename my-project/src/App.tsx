import React, { Fragment } from "react";
import ListProducts from "./pages/Products/page";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct/page";
import UpdateProduct from "./pages/UpdateProduct/page";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<ListProducts />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
      </Routes>
    </Fragment>
  );
}

export default App;
