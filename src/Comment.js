import React from 'react';
import './Comment.css';

function Comment(props) {
  return(
    <div className="Comment">
      <h4>{props.title}</h4>
      <p>{props.body}</p>
      <p>Betyg: {props.rating}</p>
    </div>
  );
}

export { Comment };
