import React from "react";
import { Link } from "react-router-dom";
//import defaultImg from "../../images/room-5.jpeg";
import './style.scss'
//import PropTypes from "prop-types";
function Room({room}){
    const { name, _id, image, price } = room;
  return (
    <article className="room">
      <div className="img-container">
        <img src={`http://localhost:5000/upload/${image}`} alt="single room" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${_id}`} className="btn-primary room-link">
          View Room
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
};

export default Room;