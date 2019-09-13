import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SuccessPage.css';

function SuccessPage() {
  return(
    <main>
      <h1>Din order har gått igenom!</h1>
      <p>Vi skickar din vara/varor så fort vi kan och du kommer få en faktura på ditt köp.</p>
    </main>
  );
}

export { SuccessPage };
