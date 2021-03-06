import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MDReactComponent from 'markdown-react-js';
import './DetailsPage.css';
import { COCKPIT_ROOT } from './MainPage.js';
import { Comment } from './Comment.js';

function DetailsPage(props) {
  let [product, updateProduct] = useState({});
  let [comments, updateComments] = useState([]);
  let [amount, updateAmount] = useState('1');
  let productId = props.match.params.id;

  useEffect(function(){
    //Make request to get product data
    axios.post(`${COCKPIT_ROOT}/api/collections/get/Products`, {
      filter: {_id:productId},
    })
    .then(function (response) {
      let productData = response.data.entries[0];
      updateProduct(productData);
    })
    .catch(function (error) {
      console.log(error);
    });

    //Make request to get comments data
    // ---- **Problems with unauthorized? Add: ?token=${token}&
    axios.post(`${COCKPIT_ROOT}/api/collections/get/reviews?filter[product._id]=${productId}`)
    .then(function (response) {
      let commentData = response.data.entries;
      updateComments(commentData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  function onChangeUpdateAmount(event) {
    updateAmount(event.target.value);
  }

  function onSubmitAddToShoppingCart(event) {
    //Preventing form being sent
    event.preventDefault();

    //Creating a new object
    let orderInfo = {
      name: product.name,
      price: product.price,
      amount: amount,
    }

    //If there is no shopping cart in local storage, create one
    //...else, add a new object
    let shoppingCart;
    let localStorage = window.localStorage.getItem('shopping-cart');
    if(localStorage === null) {
      shoppingCart = {};
    }
    else {
      shoppingCart = JSON.parse(localStorage);
    }

    //Add new key, convert to JSON and save in local storage
    shoppingCart[productId] = orderInfo;
    let jsonString = JSON.stringify(shoppingCart);
    window.localStorage.setItem('shopping-cart', jsonString);
    //localStorage = window.localStorage.getItem('shopping-cart');
    //console.log('localStorage: ', localStorage);

    //Clear input field
    updateAmount('');
  }

  let images = [];
  if(product.images) {
    images = product.images.map(image => {
      return <img className="DetailsPage-gallery_image" src={COCKPIT_ROOT + image.path} alt={product.name} key={image.path}/>;
    });
  }

  let commentComponents = comments.map(comment => {
    return <Comment title={comment.title} body={comment.body} rating={comment.rating} key={comment._id}/>;
  });

  return(
    <>
      <main>
        <h2>{product.name}</h2>
        <p>{product.price} kr</p>
        <p>{product.amount_in_stock} i lager</p>
        <div className="DetailsPage-gallery">
          {images}
        </div>
        { product.description ? <MDReactComponent className="DetailsPage-description" text={product.description}/> : null}
        <form className="DetailsPage-add" onSubmit={onSubmitAddToShoppingCart}>
          <button type="submit">Lägg till i kundvagn</button>
          <input type="number" name="amount" value={amount} min="1" onChange={onChangeUpdateAmount}/> st
        </form>
      </main>
      <div className="DetailsPage-comments">
        { comments.length > 0 ? <h3>Kommentarer</h3> : null }
        {commentComponents}
      </div>
    </>
  );
}

export { DetailsPage };
