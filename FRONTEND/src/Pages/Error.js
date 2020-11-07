import React from "react";
import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Hero>
      <Banner title="404" subtitle="page not found">
        <Link to="/" className="btn-primary">
          về trang chủ
        </Link>
      </Banner>
    </Hero>
  );
};

export default Error;