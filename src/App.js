import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { MainPage } from './MainPage.js';
import { DetailsPage } from './DetailsPage.js';
import { ShoppingCartPage } from './ShoppingCartPage.js';
import { CheckoutPage } from './CheckoutPage.js';
import { SuccessPage } from './SuccessPage.js';
import { ConfirmButton } from './ConfirmButton.js';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1 className="logo">DressedForSuccess</h1>
          <ConfirmButton text="Kundvagn" path="./kundvagn"/>
        </header>
        <Route exact path='/' component={MainPage} />
        <Route path="/detaljer/:id" component={DetailsPage} />
        <Route path="/kundvagn" component={ShoppingCartPage} />
        <Route path="/beställ" component={CheckoutPage} />
        <Route path="/order-klar" component={SuccessPage} />
        <footer className="App-footer">
          <div className="left-div">
            <h3>Kundservice</h3>
            <p>Tfn 040-707070</p>
            <p>E-mail kundservice@dressedforsuccess.se</p>
          </div>
          <div className="central-div">
            <p>Vi levererar endast till svenska adresser. Lägsta ordervärde 70 kr. Expeditionsavgift 39 kr. 14 dagars ångerrätt. Betalsätt: endast faktura.</p>
          </div>
          <div className="right-div">
            <p>DressedForSuccess AB</p>
            <p>OrgNr: 123456-1111</p>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
