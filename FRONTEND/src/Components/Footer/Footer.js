import React, { Component } from "react";
import {FaFacebookF,FaGooglePlusG,FaTwitter} from "react-icons/fa";


import './style.scss'
export default class Services extends Component {
  state = {
    services: [
      {
        title: "Chi nhánh A",
        info:
          `HCM: Lầu 2, Tòa nhà eTown 2, Cộng Hòa,quận Tân Bình, Tp. Hồ chí Minh
            `
      },
      {
        title: "Chi nhánh B",
        info:
          `HN: Tầng 5, 70 Cầu giấy, Quận Hoàn kiếm, Hà Nội
            `
      },
      {
        title: "Liên hệ",
        info:
          "CSKH: 1900 2509"
      },
    ]
  };
  render() {
    return (
      <section className="footer-content">
        <div className="footer-center">
          {this.state.services.map(item => {
            return (
              <article key={`item-${item.title}`} className="foote">
                <h2>{item.title}</h2>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
        <div>
        <div className="social-media">
          <div>
            <a href="https://www.facebook.com/hoa.pk.1" target="blank"><FaFacebookF  className="icon-contact icon-fb"/></a>
            <a href="https://www.google.com/+nukeviet" target="blank"><FaGooglePlusG  className="icon-contact icon-gg"/></a>
            <a href="https://twitter.com/BarackObama" target="blank"><FaTwitter className="icon-contact icon-tw"/></a>
            </div>
        </div>
        <p className="footer-sign">©2020 BookingResort. All Rights Reserved</p>
        </div>
      </section>
    );
  }
}