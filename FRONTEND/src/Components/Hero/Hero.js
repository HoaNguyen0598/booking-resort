import React from "react";
import './style.scss'

const Hero = ({ children, hero }) => {
  return <header className={hero}>{children}</header>;
};

export default Hero;

Hero.defaultProps = {
  hero: "defaultHero"
};