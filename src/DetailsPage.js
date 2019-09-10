import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DetailsPage.css';
import axios from 'axios';
import { COCKPIT_ROOT } from './MainPage.js';
import MDReactComponent from 'markdown-react-js';

function DetailsPage(props) {
  let [product, updateProduct] = useState({});

  useEffect(function(){
    let productId = props.match.params.id;

    //Make request to API with Axios
    axios.post(`${COCKPIT_ROOT}/api/collections/get/Products`, {
      filter: {_id:productId},
    })
    .then(function (response) {
      let productData = response.data.entries[0];
      console.log(productData);
      updateProduct(productData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  console.log(product.images);

  let images = []
  if(product.images) {
    images = product.images.map(image => {
      return <img className="gallery_image" src={COCKPIT_ROOT + image.path} alt={`Image of ${product.name}`} />;
    });
  }

  return(
    <main>
      <h2>{product.name}</h2>
      <p>{product.price} kr</p>
      <p>{product.amount_in_stock} i lager</p>
      <div className="gallery">
        {images}
      </div>
      { product.description ? <MDReactComponent className="description" text={product.description}/> : null}
    </main>
  );
}

export { DetailsPage };
