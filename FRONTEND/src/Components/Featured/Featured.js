import React, { Component } from "react";
import Title from "../Title/Title";
import Room from "../Room/Room";
import './style.scss'
import Item from './Item'
import CallApi from '../../utils/apiCaller'
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];
export default class FeaturedRooms extends Component {  
  constructor(props){
    super(props);
    this.state={
      room: []
    }
  }
  componentDidMount(){
    CallApi('api/rooms/featured','GET',null).then(res =>{
      this.setState({
        room: res.data
      })
    })
  }
  

render(){
  const {room} = this.state;
  const rooms = room.map((room,index) =>{
    return (
      <Item key={index}>
        <Room key={index} room={room} />
      </Item>
    )
  })
    return (
      <section className="featured-rooms">
        <Title title="Phòng được yêu thích" />
        <div className="featured-rooms-center">
        <Carousel breakPoints={breakPoints} >
          
            {rooms}
          
        </Carousel>
        </div>
      </section>
    );
  }
}