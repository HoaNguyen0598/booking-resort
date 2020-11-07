import React from "react";
import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
import RoomsContainer from '../Components/RoomContainer/RoomContainer'

import { Link } from "react-router-dom";

const Rooms = () => {
  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="Phòng của chúng tôi">
          <Link to="/" className="btn-primary">
            về trang chủ
          </Link>
        </Banner>
      </Hero>
      <RoomsContainer />
    </>
  );
};

export default Rooms;