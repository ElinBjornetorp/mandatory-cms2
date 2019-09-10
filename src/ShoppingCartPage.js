import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingCartPage.css';
import { ConfirmButton } from './ConfirmButton.js';

function ShoppingCartPage() {
  return(
    <main>
      <h1>Kundvagn</h1>
      <p>Tabell</p>
      <ConfirmButton text="Till kassan" path="./beställ"/>
    </main>
  );
}

export { ShoppingCartPage };
