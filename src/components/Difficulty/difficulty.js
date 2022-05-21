import React from "react";
import Star from "./star";
const difficulty = (props) => {
  let stars = 0;
  switch (props.type) {
    case 'easy':
      stars = 1;
      break;
    case 'medium':
      stars = 2;
      break;
    case 'hard':
      stars = 3;
      break;
    default:
  }

  return <div>{Array(stars).fill(true).map((_, i) => <Star key={i} />)}</div>;
}

export default difficulty;