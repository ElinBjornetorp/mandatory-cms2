import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './ShoppingCartPage.css';
//import { ConfirmButton } from './ConfirmButton.js';
import { totalPrice$, newTotalPrice } from './store.js';

function ShoppingCartPage() {
  let [chosenProducts, updateChosenProducts] = useState(JSON.parse(window.localStorage.getItem('shopping-cart')));
  let [redirect, updateRedirect] = useState(false);
  let [totalPrice, updateTotalPrice] = useState(totalPrice$.value);
  //let [sum, updateSum] = useState(0);

  //console.log('totalPrice: ', totalPrice);

  useEffect(function(){
    //Listening to total price observable
    const subscription = totalPrice$.subscribe(function() {
      updateTotalPrice(totalPrice);
    });
  }, []);

  //Stop listening to observable - ???

  let rows = [];
  let name;
  let price;
  let amount;
  let parsedPrice;
  let parsedAmount;
  let pricePerProduct;
  let sum = 0;
  for(let key in chosenProducts) {
    //Defining variables. Also parsing price and amount.
    name = chosenProducts[key].name;
    price = chosenProducts[key].price;
    amount = chosenProducts[key].amount;
    parsedPrice = parseFloat(price);
    parsedAmount = parseInt(amount);
    pricePerProduct = parsedPrice * parsedAmount;

    //Creating a row
    let row = <tr key={key}><td>{amount} st</td><td>{name}</td><td>{pricePerProduct} kr</td><td><button className="ShoppingCartPage-remove-button" id={key} onClick={onClickRemove}>Ta bort</button></td></tr>;

    //Adding row to 'rows'
    rows.push(row);

    //Adding price to sum
    sum = sum + parsedPrice * parsedAmount;
  }

  function onClickRemove(event) {
    let id = event.target.id;
    let updatedProducts;

    //Copying chosenProducts to updatedProducts
    updatedProducts = {...chosenProducts};

    //Removing selected product
    delete updatedProducts[id];

    //Updating state:chosenProducts
    updateChosenProducts(updatedProducts);

    //Updating local storage
    let jsonString = JSON.stringify(updatedProducts);
    window.localStorage.setItem('shopping-cart', jsonString);
  }

  function onClickEmptyShoppingCart(event) {
    window.localStorage.removeItem('shopping-cart');
    updateChosenProducts({});
  }

  function onClickGoToCheckoutPage(event) {
    newTotalPrice(sum);
    updateRedirect(true);
  }

  return(
    <main>
      { redirect ? <Redirect to="/bestall"/> : null}
      <h1 className="ShoppingCartPage-header">Kundvagn</h1>
      <div className="ShoppingCartPage-table-area">
        <table className="ShoppingCartPage-table">
          <tbody>
            {rows}
          </tbody>
        </table>
        { sum ? <p>Summa: {sum} kr</p> : <p className="ShoppingCartPage-message" >Kundvagnen är tom</p>}
      </div>
      { sum ? <button className="ShoppingCartPage-go-forward-button" type="button" onClick={onClickGoToCheckoutPage}>Till kassan</button> : null}
      { sum ? <button className="ShoppingCartPage-clear-button" type="button" onClick={onClickEmptyShoppingCart}>Töm kundvagnen</button> : null}
    </main>
  );
}

export { ShoppingCartPage };
