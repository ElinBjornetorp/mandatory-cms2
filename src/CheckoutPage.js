import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './CheckoutPage.css';
import { ConfirmButton } from './ConfirmButton.js';

function CheckoutPage() {
  let [name, updateName] = useState('');
  let [address, updateAddress] = useState('');
  let [redirect, updateRedirect] = useState(false);

  function onChangeUpdateName(event) {
    updateName(event.target.value);
  }

  function onChangeUpdateAddress(event) {
    updateAddress(event.target.value);
  }

  function onSubmitCheckout(event) {
    event.preventDefault();
    window.localStorage.removeItem('shopping-cart');
    updateRedirect(true);
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
