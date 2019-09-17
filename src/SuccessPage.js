import React from 'react';
//import { Link } from 'react-router-dom';
import './SuccessPage.css';
import { orderId$ } from './store.js';

function SuccessPage() {
  console.log('local storage: ', window.localStorage);

  return(
    <main>
      <h1>Tack för ditt köp!</h1>
      <p>Din order har gått igenom.</p>
      <p>Vi skickar din vara/varor så fort vi kan men senast om fyra dagar.</p>
      <p>Du kommer få en faktura på ditt köp som ska betalas inom 14 dagar.</p>
      <p>Ditt ordernummer är {orderId$.value}.</p>
    </main>
  );
}

export { SuccessPage };
