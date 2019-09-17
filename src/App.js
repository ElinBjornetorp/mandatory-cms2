import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { MainPage } from './MainPage.js';
import { DetailsPage } from './DetailsPage.js';
import { ShoppingCartPage } from './ShoppingCartPage.js';
import { CheckoutPage } from './CheckoutPage.js';
import { SuccessPage } from './SuccessPage.js';
import { ConfirmButton } from './ConfirmButton.js';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Link className="App-logo" to="/" >DressedForSuccess</Link>
          <ConfirmButton text="Kundvagn" path="/kundvagn"/>
        </header>
        <Route exact path='/' component={MainPage} />
        <Route path="/detaljer/:id" component={DetailsPage} />
        <Route path="/kundvagn" component={ShoppingCartPage} />
        <Route path="/bestall" component={CheckoutPage} />
        <Route path="/order-klar" component={SuccessPage} />
        <footer className="App-footer">
          <div className="App-footer__left">
            <h3>Kundservice</h3>
            <p>Tfn 040-707070</p>
            <p>E-mail kundservice@dressedforsuccess.se</p>
          </div>
          <div className="App-footer__central">
            <p>Vi levererar endast till svenska adresser. Lägsta ordervärde 70 kr. Expeditionsavgift 39 kr. 14 dagars ångerrätt.</p>
          </div>
          <div className="App-footer__right">
            <p>DressedForSuccess AB</p>
            <p>OrgNr: 123456-1111</p>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
