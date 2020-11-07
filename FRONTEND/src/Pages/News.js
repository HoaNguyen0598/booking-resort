import React from "react";
import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
import { Link } from "react-router-dom";
import NewList from '../Components/NewList/NewList'

const News = () => {
  return (
  <>  
    <Hero hero="new">
      <Banner title="Tin tức" >
       
        <Link to="/" className="btn-primary">
            về trang chủ
        </Link>
      </Banner>
    </Hero>
    <NewList />
  </>
  );
};

export default News;