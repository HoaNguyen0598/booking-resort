import React, { Component } from "react";
import defaultBgr from "../images/rooms.jpg";
import StyledHero from '../Components/StyledHero/StyleHero';
import {RoomContext} from '../context';
import Banner from "../Components/Banner/Banner";
import Room1 from '../images/room-5.jpeg';
import Room2 from '../images/room-6.jpeg';
import Room3 from '../images/room-7.jpeg';
import '../App.css'
import {Link} from 'react-router-dom'
import CallApi from '../utils/apiCaller';


export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    
    console.log(props);
    this.state ={
      defaultBgr: defaultBgr,
      room:[]

    }
  }

  static contextType = RoomContext;

  componentDidMount(){
    const id = this.props.match.params.id;
    CallApi(`api/room/${id}`,'GET',null).then(res =>{
        this.setState({
          room: res.data,
        })
      })
  }
  render() {
       
    //  const {_id,name,price,description,image,extras,pets,breakfast} = room;
    const {room} = this.state;
    return (
      <>
        
        <StyledHero className="abcxxx" img={`http://localhost:5000/upload/${room.image}`}>
          <Banner title={`${room.name}`}>
            <Link to="/rooms" className="btn-primary">
              trở lại phòng
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            
              <img src={Room1} alt="img"/>
              <img src={Room2}  alt="img"/>
              <img src={Room3}  alt="img"/>
            
           
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h2>Mô tả</h2>
              <p>{room.description}</p>
            </article>
            <article className="info">
              <h2>Chi tiết</h2>
              <h4>Giá : ${room.price}</h4>
              <h4>Diện tích : {room.acreage} m²</h4>
              <h4>
                Số người : {room.people}
               
              </h4>
              <h4>{room.pets === 1 ? "Cho phép đem thú cưng" : "Thú cưng không được phép"}</h4>
              <h4>{room.breakfast === 1 ? "Bao gồm ăn sáng" : "Không bao gồm ăn sáng"}</h4>
              <button className="btn-booking">
                <Link to={`/rooms/bookingroom/${room._id}`} className="abtn-booking">
                  Đặt ngay
                </Link>
              </button>
              <button className="btn-booking">
                <Link to='/rooms' className="abtn-booking">
                  Trở lại
                </Link>
              </button>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h2>Dịch vụ bổ sung </h2>
          <ul className="extras">
            <li>với sự đầu tư kĩ lưỡng, được chăm chút đến từng chi tiết nhỏ, Resort mang đến một phong cách mới</li>
            <li>với sự đầu tư kĩ lưỡng, được chăm chút đến từng chi tiết nhỏ, Resort mang đến một phong cách mới</li>
            <li>với sự đầu tư kĩ lưỡng, được chăm chút đến từng chi tiết nhỏ, Resort mang đến một phong cách mới</li>
          </ul>
        </section>
        
      </>
    );
  }
}
