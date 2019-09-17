import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

function Product(props) {
  return(
    <div className="Product">
      <Link className="Product-header" to={`/detaljer/${props.id}`} >{props.name}</Link>
      <img className="Product-image" src={props.imageUrl} alt={props.name}/>
      <p className="Product-price">{props.price} kr</p>
      <p className="Product-stock">{props.stock} i lager</p>
    </div>
  );
}

export { Product };
