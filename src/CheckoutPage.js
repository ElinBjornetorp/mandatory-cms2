import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './CheckoutPage.css';
//import { ConfirmButton } from './ConfirmButton.js';
import { COCKPIT_ROOT } from './MainPage.js';
import { totalPrice$, newTotalPrice, orderId$, newOrderId } from './store.js';

function CheckoutPage() {
  let [name, updateName] = useState('');
  let [address, updateAddress] = useState('');
  let [redirect, updateRedirect] = useState(false);
  let [orderId, updateOrderId] = useState(orderId$.value);

  //console.log('totalPrice$.value: ', totalPrice$.value);

  useEffect(function(){
    const subscription = orderId$.subscribe(function() {
      updateOrderId(orderId);
    });
  }, [orderId]);

  //End subscription?

  function onChangeUpdateName(event) {
    updateName(event.target.value);
  }

  function onChangeUpdateAddress(event) {
    updateAddress(event.target.value);
  }

  function onSubmitCheckout(event) {

    //Preventing form being sent
    event.preventDefault();

    //Fetching shopping cart from local storage and parsing JSON
    let shoppingCart = JSON.parse(window.localStorage.getItem('shopping-cart'));
    //let total_price = window.localStorage.getItem('total-price');

    //Creating an array out of the shoppingCart object
    // (to append to the post to Cockpit)
    let productsArray = [];
    let product;
    let object;
    for(let key in shoppingCart) {
      product = shoppingCart[key]; //Product is an object holding product information
      object = {
        "value": {
          "name": product.name,
          "price": product.price,
          "amount": product.amount,
        }
      }
      productsArray.push(object);
    }

    //Posting order to cockpit
    axios.post(`${COCKPIT_ROOT}/api/collections/save/orders`, {
      "data": {
        "name": name,
        "address": address,
        "total_price": totalPrice$.value,
        "products": productsArray,
      }
    })
    .then(function (response) {
      console.log(response);

      //Emptying shopping cart
      window.localStorage.removeItem('shopping-cart');

      //Clearing total price
      newTotalPrice(null);

      //Storing orderId
      let id = response.data._id;
      newOrderId(id);

      //Redirecting to "success page"
      updateRedirect(true);
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.message);
    });
  }

  return(
    <main className="CheckoutPage">
      { redirect ? <Redirect to="/order-klar"/> : null}
      <h2>Kassa</h2>
      <form className="CheckoutPage-form" onSubmit={onSubmitCheckout}>
        <div>
          <label htmlFor="name">Namn: </label> <br/>
          <input type="text" name="name" id="name" required onChange={onChangeUpdateName}/>
        </div>
        <div>
          <label htmlFor="address">Adress: </label> <br/>
          <textarea name="address" id="address" required onChange={onChangeUpdateAddress}/> <br/>
        </div>
        <button className="ConfirmButton" type="submit">Slutför köp</button>
      </form>
    </main>
  );
}

export { CheckoutPage };
