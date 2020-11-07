import React, { Component } from 'react'
// import Hero from "../Components/Hero/Hero";
// import Banner from "../Components/Banner/Banner";
// import { Link } from "react-router-dom";
// import NewList from '../Components/NewList/NewList'
 import CallApi from '../utils/apiCaller';
export default class NewsDetail extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            items: []
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        CallApi(`api/news/${id}`,'GET',null).then(res =>{
            this.setState({
              items: res.data,
            })
          })
    }
    render() {
        const {items} = this.state;
        return (
            <div>
                <>  
                    {/* <Hero hero="new">
                    <Banner title="Tin tức" >
                    
                        <Link to="/" className="btn-primary">
                        return home
                        </Link>
                    </Banner>
                    </Hero> */}
                    <div className="content-detail">
                        <div className="title-content">
                            <h2>{items.title}</h2>
                        </div>
                        <div className="desc-news">
                            <p>{items.descripion}</p>
                        </div>
                        <div className="content-newss">
                            <p>{items.content}</p>
                        </div>
                        <div className="img-news">
                            <img src={`http://localhost:5000/upload/${items.image}`} alt="img-newDetail"/>
                        </div>
                        <div className="content-newss">
                            <p>{items.content}</p>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
