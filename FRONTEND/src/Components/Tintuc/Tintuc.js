import React, { Component } from "react";
import Title from "../Title/Title";
import New from "../New/New";
import './style.scss'
import CallApi from '../../utils/apiCaller'

export default class FeaturedRooms extends Component {  
  constructor(props){
    super(props);
    this.state={
      items: []
    }
  }
  componentDidMount(){
    CallApi('api/tintucnew','GET',null).then(res =>{
      this.setState({
        items: res.data
      })
    })
  }
  

render(){
        const {items} = this.state;
        const listnew = items.map((item,index) =>{
             return <New key={index} items={item} />
        })
    return (
      <section className="tintuc-new">
        <Title title="Tin tức mới nhất" />
        <div className="featured-rooms-center">
           {listnew}
        </div>
      </section>
    );
  }
}