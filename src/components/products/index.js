import React, {useContext} from "react";
import Medailon from "./medailon";
import {ProductsContext} from "../../pages";

const Products = () => {
    const products = useContext(ProductsContext).products;
  return (
      <div className="container mt-5">
          <div className="row m-auto justify-content-around">
              {products && products.map((product,index) => (
                  <div key={index} className="col-12 col-md-5 ">
                      <Medailon
                          image={product.image}
                          price={product.price}
                          name={product.name}
                          description={product.description}
                          id={product._id}
                      />
                  </div>
              ))}
          </div>
      </div>

  );
};

export default Products;
