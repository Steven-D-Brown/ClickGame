import React from "react";
import "./style.css";

function FriendCard(props) {
  return (
    <img alt={props.name} src={props.image} onClick={() => props.friendClicked(props.id)} />
  );
}
export default FriendCard;
