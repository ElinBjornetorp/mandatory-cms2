import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css';
import { Product } from './Product.js';

let COCKPIT_ROOT = 'http://192.168.99.100:8081';
let token = 'e98ee50b67ff8c50b6d91f951f5398';

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
    return <Product id={product._id} key={product._id} name={product.name} imageUrl={COCKPIT_ROOT + product.images[0].path} price={product.price} stock={product.amount_in_stock}/>;
  });

  return(
    <main className="MainPage">
      {productComponents}
    </main>
  );
}

export { MainPage, COCKPIT_ROOT, token };
