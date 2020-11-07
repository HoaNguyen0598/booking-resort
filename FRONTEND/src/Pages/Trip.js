import React from "react";
import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
const Trip = () => {
  return (
    <Hero hero="Trip">
      <Banner title="Đặt vé máy bay quốc nội & quốc tế" subtitle="Giá vé tốt nhất">
        <a className="link-trip" href="https://vietnamairslines.com/?gclid=CjwKCAjwm_P5BRAhEiwAwRzSO058dCAz6W6m-93942S7rYuH6F_YEI0vRLC1PHnrpxGhZHMAcIVpThoCgPYQAvD_BwE">Đặt vé</a>
        {/* <Link to="/" className="btn-primary">
          return home
        </Link> */}
      </Banner>
    </Hero>
  );
};

export default Trip;