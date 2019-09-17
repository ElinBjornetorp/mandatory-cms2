import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingCartPage.css';
import { ConfirmButton } from './ConfirmButton.js';

function ShoppingCartPage() {
  let [chosenProducts, updateChosenProducts] = useState(JSON.parse(window.localStorage.getItem('shopping-cart')));

  console.log('chosenProducts: ', chosenProducts);

  let rows = [];
  let name;
  let price;
  let amount;
  let parsedPrice;
  let parsedAmount;
  let sum = 0;
  for(let key in chosenProducts) {
    //Defining variables. Also parsing price and amount.
    name = chosenProducts[key].name;
    price = chosenProducts[key].price;
    amount = chosenProducts[key].amount;
    parsedPrice = parseFloat(price);
    parsedAmount = parseInt(amount);

    //Creating a row
    let row = <tr key={key}><td>{amount} st</td><td>{name}</td><td>{price} kr</td><td><button className="ShoppingCartPage-remove-button" id={key} onClick={onClickRemove}>Ta bort</button></td></tr>;

    //Adding row to 'rows'
    rows.push(row);

    //Adding price to sum
    sum = sum + parsedPrice * parsedAmount;
  }

  function onClickRemove(event) {
    let id = event.target.id;
    console.log(id);
    let updatedProducts;

    console.log('chosenProducts: ', chosenProducts);

    //Copying chosenProducts to updatedProducts
    updatedProducts = {...chosenProducts};

    //Removing selected product from updatedProducts
    delete updatedProducts[id];

    console.log('updatedProducts: ', updatedProducts);

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

  return(
    <main>
      <h1 className="ShoppingCartPage-header">Kundvagn</h1>
      <div className="ShoppingCartPage-table-area">
        <table className="ShoppingCartPage-table">
          <tbody>
            {rows}
          </tbody>
        </table>
        { sum ? <p>Summa: {sum} kr</p> : <p className="ShoppingCartPage-message" >Kundvagnen är tom</p>}
      </div>
      { sum ? <ConfirmButton text="Till kassan" path="./bestall"/> : null}
      { sum ? <button className="ShoppingCartPage-clear-button" type="button" onClick={onClickEmptyShoppingCart}>Töm kundvagnen</button> : null}
    </main>
  );
}

export { ShoppingCartPage };
