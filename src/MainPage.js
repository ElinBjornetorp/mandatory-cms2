import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css';

let COCKPIT_ROOT = 'http://192.168.99.100:8081';

function MainPage() {
  let [products, updateProducts] = useState([]);

  useEffect(function(){
    //Make request to API with Axios
    axios.post(`${COCKPIT_ROOT}/api/collections/get/Products`, {
      fields: {name: 1, price: 1, images: 1, amount_in_stock: 1},
    })
    .then(function (response) {
      let productData = response.data.entries;
      console.log(productData);
      updateProducts(productData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  let productComponents = products.map(product => {
    return(
      <div className="productDiv" key={product._id}>
        <Link className="productDiv_header" to={`/detaljer/${product._id}`} >{product.name}</Link>
        <img className="productDiv_image" src={COCKPIT_ROOT + product.images[0].path} alt={`Picture of ${product.name}`}/>
        <p className="productDiv_price">{product.price} kr</p>
        <p className="productDiv_stock">{product.amount_in_stock} i lager</p>
      </div>
    );
  });

  return(
    <main className="MainPage">
      {productComponents}
    </main>
  );
}

export { MainPage, COCKPIT_ROOT };
