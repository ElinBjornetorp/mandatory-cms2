import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css';
import { Product } from './Product.js';
import { useDebounce } from 'use-debounce';

let COCKPIT_ROOT = 'http://192.168.99.100:8081';
let token = 'e98ee50b67ff8c50b6d91f951f5398';

function MainPage() {
  let [products, updateProducts] = useState([]);
  let [filter, updateFilter] = useState('');
  //let [debouncedFilter] = useDebounce(filter, 1000);
  let [pageNr, updatePageNr] = useState(1);
  let itemsPerPage = 5;
  let [total, updateTotal] = useState(undefined);
  let finalPage = undefined;
  let [inStockFilter, updateInStockFilter] = useState(false);

  useEffect(function(){
    //Make request to API with Axios
    axios.post(`${COCKPIT_ROOT}/api/collections/get/Products`, {
      fields: {name: 1, price: 1, images: 1, amount_in_stock: 1},
      skip: itemsPerPage * (pageNr - 1),
      limit: itemsPerPage,
      filter: {
        amount_in_stock: inStockFilter ? true : undefined
      },
    })
    .then(function (response) {
      let productData = response.data.entries;
      let total = response.data.total;
      updateProducts(productData);
      updateTotal(total);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [pageNr, inStockFilter]);

  function onChangeFilter(event) {
    let searchInput = event.target.value;

    //Updating state:filter
    updateFilter(searchInput);

    //Make request to API with Axios
    axios.post(`${COCKPIT_ROOT}/api/collections/get/Products`, {
      filter: {name: { "$regex": searchInput }}, //Adding this to the url: ?filter[name][$regex=searchInput]
    })
    .then(function (response) {
      let productData = response.data.entries;
      console.log(productData);
      updateProducts(productData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function onClickGoForward(event) {
    updatePageNr(pageNr + 1);
  }

  function onClickGoBack(event) {
    updatePageNr(pageNr - 1);
  }

  function onChangeCheck(event) {
    updateInStockFilter(!inStockFilter);
  }

  //Creating product components
  let productComponents = products.map(product => {
    return <Product id={product._id} key={product._id} name={product.name} imageUrl={COCKPIT_ROOT + product.images[0].path} price={product.price} stock={product.amount_in_stock}/>;
  });

  //Calculating when to stop forward-pagination
  if(total) {
    finalPage = Math.ceil(total / itemsPerPage);
  }

  return(
    <main className="MainPage">
      <div className="MainPage-search-area">
        Sök: <input type="text" name="searchfield" value={filter} onChange={onChangeFilter}/> <br/>
        <input type="checkbox" name="in-store-only" value={inStockFilter} onChange={onChangeCheck}/>Visa endast varor som finns i lager.
      </div>
      <div className="MainPage-products">
        {productComponents}
      </div>
      { pageNr === 1 ? <button disabled>Föregående</button> : <button type="button" onClick={onClickGoBack}>Föregående</button>}
      { pageNr === finalPage ? <button disabled>Nästa</button>: <button type="button" onClick={onClickGoForward}>Nästa</button>}
    </main>
  );
}

export { MainPage, COCKPIT_ROOT, token };
