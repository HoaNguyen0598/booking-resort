import React, { Component } from 'react'
import CallApi from '../../utils/apiCaller';
import News from '../New/New'
import './style.scss'
export default class NewList extends Component {
    constructor(props){
        super(props);
        this.state={
          news:[]
        }
    }
    componentDidMount(){
        CallApi('api/news','GET',null).then(res =>{
          this.setState({
            news: res.data,
          })
        })
      }
    render() {
      const {news} = this.state;
        return (
            <div>
                <section className="newlist">
                  <div className="newlist-center">
                    {
                      news.map((item,index) =>{
                        return <News key={index} items={item} /> 
                      })
                    }
                  </div>
                </section>
            </div>
        )
    }
}
