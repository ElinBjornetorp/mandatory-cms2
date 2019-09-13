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
    <main>
      { redirect ? <Redirect to="/order-klar"/> : null}
      <h1>Kassa</h1>
      <form onSubmit={onSubmitCheckout}>
        Namn: <input type="text" name="name" required onChange={onChangeUpdateName}/> <br/>
        Adress: <textarea name="address" required onChange={onChangeUpdateAddress}/> <br/>
        <button className="ConfirmButton" type="submit">Slutför köp</button>
      </form>
    </main>
  );
}

export { CheckoutPage };
