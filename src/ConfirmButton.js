import React from 'react';
import { Link } from 'react-router-dom';
import './ConfirmButton.css';

function ConfirmButton(props) {
  let text = props.text;
  let path = props.path;
  return(
    <button className="ConfirmButton">
      <Link to={path}>{text}</Link>
    </button>
  );
}

export { ConfirmButton };
