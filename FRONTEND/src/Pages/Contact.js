import React, { Component } from "react";
import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
import { Link } from "react-router-dom";
//import CallApi from '../utils/apiCaller';
import axios from 'axios';

class Contact extends Component{
  constructor(props){
    super(props);
    this.state ={
      email:'',
      name:'',
      subject:'',
      message:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    var {name,value}= e.target;
    this.setState({
      [name]: value
    })
  }
  handleSubmit(e){
    axios.post('http://localhost:5000/page/contact',this.state)
        .then(res => console.log(res))
        .then(error => console.log(error))



        alert('Gửi thành công :'+ this.state.subject);
        // this.setState({
        //     name: '',
        //     phone:'',
        //     email:'',
        //     startDate: new Date(),
        //     endDate: new Date()
        // })
  }
  render(){
    //const {email,name,subject,message} = this.state;
  return (
    <>
       <Hero>
          <Banner title="Liên hệ" subtitle="CHUKCHANSI GOLD">
            <Link to="/" className="btn-primary">
              về trang chủ
            </Link>
          </Banner>
       </Hero>
       <div className="contact">
       <div className="contact-left">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3>Phòng Chăm sóc khách hàng</h3>
                </div>
                <div className="panel-body">
                    <div className="margin-bottom">Bộ phận tiếp nhận và giải quyết các yêu cầu, đề nghị, ý kiến liên quan đến hoạt động chính của doanh nghiệp</div>
                    <p><em className="fa fa-phone fa-horizon margin-right"></em>Điện thoại: 
                        <span>+84-963607177   &nbsp; +84-908602598</span>
                    </p>
    				<p><em className="fa fa-envelope fa-horizon margin-right"></em>Email: 
   					    <span><a href="mailto:tdfoss@contatct.vn" className="black">nvh607177@contatct.vn</a></span>
                    </p>
                </div>
            </div>
        </div>
        <div className="contact-right">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3>Gửi phản hồi </h3>
                </div>
                <div>
                  <form onSubmit={this.handleSubmit}>
                      <div className="form-contact">
                        <input 
                            className="input-contact"
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                      </div>
                      <div className="form-contact">
                      <input 
                          className="input-contact"
                          name="email"
                          type="text"
                          placeholder="Email"
                          onChange={this.handleChange}
                          value={this.state.email}
                      />
                    </div>
                    <div className="form-contact">
                      <input 
                          className="input-contact"
                          name="subject"
                          type="text"
                          placeholder="Subject"
                          onChange={this.handleChange}
                          value={this.state.subject}
                      />
                    </div>
                    <div className="form-contact">
                      <textarea 
                          className="input-contact"
                          name="message"
                          placeholder="Message"
                          onChange={this.handleChange}
                          value={this.state.message}
                      />
                    </div>
                    <button className="btn-contact">Gửi</button>
                  </form>
                </div>
            </div>
        </div>
        </div>
    </>
  );  
}
};

export default Contact;