import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutPage.css';
import { ConfirmButton } from './ConfirmButton.js';

function CheckoutPage() {
  return(
    <main>
      <h1>Kassa</h1>
      <p>Formulär</p>
      <ConfirmButton text="Slutför köp" path="/order-klar" />
    </main>
  );
}

export { CheckoutPage };
