import React from 'react';
import './Comment.css';

function Comment(props) {
  return(
    <div className="Comment">
      <h3>{props.title}</h3>
      <p>{props.body}</p>
      <p>Betyg: {props.rating}</p>
    </div>
  );
}

export { Comment };
