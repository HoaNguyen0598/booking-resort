import React from "react";
import { Link } from "react-router-dom";
import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
import Services from "../Components/Services/Services";
import Featured from "../Components/Featured/Featured";
import Tintuc from '../Components/Tintuc/Tintuc';

const home = () => {
  return (
    <>
      <Hero>
        <Banner
          title="Trải nghiệm kỳ nghỉ tuyệt vời"
          subtitle="Combo khách sạn - vé máy bay"
        >
          <Link to="/rooms" className="btn-primary">
            tìm phòng
          </Link>
        </Banner>
      </Hero>
      <Featured />
      <Tintuc />
      <Services />
    </>
  );
};

export default home;