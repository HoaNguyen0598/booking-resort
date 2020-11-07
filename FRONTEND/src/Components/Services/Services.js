import React, { Component } from "react";
import { FaCocktail, FaSwimmer, FaShuttleVan, FaCookieBite, FaPrayingHands,FaSteam,FaCouch,FaHotTub } from "react-icons/fa";
import Title from "../Title/Title";
import './style.scss'
export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "Club bar",
        info:
          "Các câu lạc bộ vui chơi và giải trí trong nhà và ngoài trời"
      },
      {
        icon: <FaSwimmer/>,
        title: "Hồ bơi",
        info:
          "Resort có hồ bơi riêng công cộng ở trung tâm "
      },
      {
        icon: <FaShuttleVan />,
        title: "Xe đưa đón",
        info:
          "Xe đưa đón đi về resort miễn phí và chổ đậu xe miễn phí"
      },
      {
        icon: <FaCookieBite />,
        title: "Bữa ăn",
        info:
          "BỮa ăn sáng free, phục vụ đặc sản địa phương và quốc tế "
      },
      {
        icon: <FaPrayingHands />,
        title: "Phòng gia đình",
        info:
          "Phòng dành cho gia đình, đầy đủ tiện nghi cho sinh hoạt "
      },
      {
        icon: <FaHotTub/>,
        title: "Massage",
        info:
          "Dịch vụ massage và xông hơi thư giãn cho khách hàng"
      },
      {
        icon: <FaCouch/>,
        title: "Bàn ăn riêng",
        info:
          "Dịch vụ ăn uống có bàn ăn riêng tư cho mọi người "
      },
      {
        icon: <FaSteam/>,
        title: "Phòng tập Gym",
        info:
          "Phòng tập gym và yoga để rèn luyên sức khỏe"
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="Dịch vụ của chúng tôi" />
        <div className="services-center">
          {this.state.services.map(item => {
            return (
              <article key={`item-${item.title}`} className="service">
                <span>{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}