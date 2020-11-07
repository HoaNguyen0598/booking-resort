import React, { Component } from 'react'
import {RoomContext} from '../context';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CallApi from '../utils/apiCaller';
import axios from 'axios';
import moment from 'moment'
import styled from 'styled-components';
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
//import 'animate.css/animate.compat.css'

    function countDay(a,b){
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(b);
        const secondDate = new Date(a);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        return diffDays;
    }
    const errorIni = '';
export default class BookingRoom extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state ={
           item:[],
            name: '',
            roomname: '',
            phone:'',
            email:'',
            startDate: new Date(),
            endDate: new Date(),
            countDay: 0,
            modalOpen:false,
            error: errorIni

          }
          this.handleChange = this.handleChange.bind(this)
          this.handleSubmit = this.handleSubmit.bind(this)
          this.openModel = this.openModel.bind(this)
          this.closeModel = this.closeModel.bind(this)
        
    }

    static contextType = RoomContext;

    
    componentDidMount(){
        const id = this.props.match.params.id;
        CallApi(`api/room/${id}/bookingroom`,'GET',null).then(res =>{
            this.setState({
              item: res.data,
            })
        })
    }

    handleChange(e){
        var {name,value} = e.target;
        this.setState({
            [name]:value  
        })

    }
    validate = () =>{
        let erroror = '';
        if((!this.state.name) || (!this.state.email) || (!this.state.phone)){
            erroror = 'lỗi rồi em ơii' ;
        }
        if(erroror){
            this.setState({error:erroror})
            return true;
        }
        return false;
    }
    handleNotification(){
        store.addNotification({
            title: "Lỗi",
            message: "Thông tin đặt phòng chưa chính xác",
            type: "warning",
            container: "top-right",
            insert: "top",
            dismiss: {
                duration: 2000,
                onScreen: true
              }
            })
    }
    handleSuccessfully(){
        store.addNotification({
            title: "Successfully",
            message: "Đặt phòng thành công",
            type: "success",
            container: "top-right",
            insert: "top",
            dismiss: {
                duration: 2000,
                onScreen: true
              }
            })
    }

    openModel(e){
        e.preventDefault();
        const isValidate = this.validate();
        
        if(isValidate){
            console.log(this.state);
            this.handleNotification();
            this.setState({
                error:errorIni
            })
        }else{
            console.log('adasdasdas')
            this.setState({
                modalOpen: true
            })
        }
        // console.log('adasdasdas')
        // this.setState({
        //     modalOpen: true
        // })
      
    }
    closeModel(e){
        e.preventDefault();
        this.setState({
            modalOpen: false
        })
    }

    handleSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:5000/page/booking',this.state)
        .then(res => console.log(res))
        .then(error => console.log(error))
        this.handleSuccessfully();
       this.setState({
            name: '',
            phone:'',
            email:'',
            startDate: new  Date(),
            endDate: new Date(),
            modalOpen: false
        })
        this.props.history.push('/');
    }
   

    render() {
        // const {getRoom} = this.context;
        // const room = getRoom(this.state.id);
        // console.log(room);
       
        // const {_id,name,price,image} = room;
        const {item} = this.state;
        const {price} = this.state.item;
        const {startDate,endDate} = this.state;
        // const local = [
        //     name,price
        // ]
        const  count = countDay(endDate,startDate);
        const total = count * price;
        const km = function giatien(count){
            var discount = 0;
            if(count<10){
                discount = total * 0.9;
            
            }else if((10<=count) && (count<20)){
                discount = total * 0.8;
        
            }else if((count>=20)){ 
                discount = total * 0.7;
          
            }
            return discount;
        };
        console.log(km(count));
        const khuyenmai = total - km(count);
        
        return (
            <>
            <div className="content-booking">
                <div className="content-right">
                    <div className="form-book">
                    <form action="" className="form">
                        <h1 className="h1-title">Thông tin đặt phòng</h1>
                        <div className="line-title">
                            <span>Thông tin người đặt</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullname">Họ và tên : </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="fullname" 
                                name="name" 
                                value= {this.state.name}
                                onChange={this.handleChange}
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại : </label>
                            <input 
                                type="text" 
                                className="form-control"
                                id="phone" 
                                name="phone" 
                                value={this.state.phone}
                                onChange={this.handleChange}
                                required="Nhập số điện thoại"
                                />
                        </div>
                        {/* <input 
                            type="hidden" 
                            name="roomname" 
                            value={this.state.item.name}
                            onChange={this.handleChange}
                            required
                            /> */}
                        <div className="form-group">
                            <label htmlFor="email">Email : </label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.handleChange}
                                required="Nhập địa chỉ email"
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Ngày nhận phòng: </label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={(newDate) => this.setState({ startDate: newDate })}
                                minDate = {new Date()}
                                isClearable
                                value={this.state.startDate}
                                dateFormat="dd/MM/yyyy"
                                required="Nhập ngày nhận phòng"
                            />
                            <label htmlFor="email">Ngày trả phòng: </label>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={(newDate) => this.setState({ endDate: newDate })}
                                minDate = {this.state.startDate}
                                value={this.state.endDate}
                                isClearable
                                dateFormat="dd/MM/yyyy"
                                required="Nhập ngày trả phòng"
                            />
                        </div>
                                            
                        <div className="modal fade" id="thanks" style={{display: this.state.modalOpen ? 'block' : 'none' }}>
                            <ModalContainer>
                                <div className="modal-content" id="model-book">
                                    <div className="modal-body p-4">
                                        <h3>Đặt Phòng</h3>
                                        <h4 className="name-room">{item.name}</h4>
                                        <div className="model-room">
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Diện tích</h4></div>
                                                <div className="form-price-right"><span style={{color:"#48b4f4"}}>{item.acreage}  m²</span></div>
                                            </div>
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Giá thuê</h4></div>
                                                <div className="form-price-right"><span style={{color:"#dc2d24"}}>{item.price}/ngày</span></div>
                                            </div>
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Phù hợp cho</h4></div>
                                                <div className="form-price-right"><span style={{color:"#48b4f4"}}>{item.people} người</span></div>
                                            </div>
                                        </div>
                                        
                                        <div className="form-border-booking"></div>
                                        <div className="model-customer">
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Ngày đặt</h4></div>
                                                <div className="form-price-right"><span style={{color:"#db3aef"}}>{moment(new Date()).format('DD-MM-YYYY')}</span></div>
                                            </div>
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Ngày đến</h4></div>
                                                <div className="form-price-right"><span style={{color:"#db3aef"}}>{moment(startDate).format('DD-MM-YYYY')}</span></div>
                                            </div>
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Ngày trả</h4></div>
                                                <div className="form-price-right"><span style={{color:"#db3aef"}}>{moment(endDate).format('DD-MM-YYYY')}</span></div>
                                            </div>
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Bạn sẽ ở trong</h4></div>
                                                <div className="form-price-right"><span style={{color:"#48b4f4"}}>{count} đêm</span></div>
                                            </div>
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Thành tiền</h4></div>
                                                <div className="form-price-right"><span style={{color:"#dc2d24"}}>${km(count)}</span></div>
                                            </div>
                                        </div>
                                        <div className="model-date-price">
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Tên</h4></div>
                                                <div className="form-price-right"><span style={{color:"#48b4f4"}}>{this.state.name}</span></div>
                                            </div>
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Số điện thoại</h4></div>
                                                <div className="form-price-right"><span style={{color:"#48b4f4"}}>{this.state.phone}</span></div>
                                            </div>
                                            <div className="form-room-booking">
                                                <div className="form-price-left"><h4>Email</h4></div>
                                                <div className="form-price-right"><span style={{color:"#48b4f4"}}>{this.state.email}</span></div>
                                            </div>
                                        </div>
                                        <div className="footer-book">
                                            <button className="btn-book" onClick={this.closeModel}>
                                                    Trở lại
                                            </button>
                                            <button type="button" className="btn-book" data-dismiss="modal" onClick={this.handleSubmit}>
                                                {/* <Link to="/" className="btn btn-dark">Thanh toán</Link> */}Thanh toán
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        </ModalContainer>
                         </div>
                    </form>
                    <div className="btn-bkr">
                            <button 
                                className="btn-booking"
                                onClick={this.openModel}
                                >Đặt phòng
                            </button>
                        </div>
                </div>
            </div>
            <div>
                <div className="form-room">
                    <div>
                        <h2 className="line-title">Thông tin phòng</h2>
                    </div>
                    <div>
                        <div className="form-img">
                            <img  src={`http://localhost:5000/upload/${item.image}`}  alt="ttRoom"/>
                        </div>
                        <div>
                            <h3>{item.name}</h3>
                        </div>
                    </div>
                    <div className="form-room-booking">
                        <div className="form-room-left"><h4>Ngày nhận phòng</h4></div>
                        <div className="form-room-right">{moment(startDate).format('DD-MM-YYYY')}</div>
                    </div>
                    <div className="form-room-booking">
                        <div className="form-room-left"><h4>Ngày Trả phòng</h4></div>  
                        <div className="form-room-right">{moment(endDate).format('DD-MM-YYYY')}</div>
                    </div>
                    <div className="form-border-booking"></div>
                    <div className="form-room-booking">
                        <div className="form-price-left"><h4>Tổng số đêm</h4></div>
                        <div className="form-price-right"><span style={{color:"#231010"}}>{count}</span></div>
                    </div>
                    <div className="form-room-booking">
                            <div className="form-price-left"><h4>Giá phòng</h4></div>
                            <div className="form-price-right">$<span>{item.price}/ngày</span></div>                     
                    </div>
                    <div className="form-room-booking">
                            <div className="form-price-left"><h4>Khuyến mãi</h4></div>
                            <div className="form-price-right"><span style={{color:"rgb(43 197 4)"}}>-{khuyenmai}$</span></div>                     
                    </div>

                    <div className="form-border-booking"></div>

                    <div  className="form-room-booking">
                            <div className="form-price-left"><h4>Tổng tiền</h4></div>
                            <div className="form-price-right">$<span>{km(count)}</span></div>
                        </div>
                </div>
            </div>
            </div>
            
        </>  
        )
                        
    }
}

const ModalContainer = styled.div`
    
    position: fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;
    text-text-align:capitalize;
    background: rgba(0,0,0,0.3);
    display:flex;
    justify-content: center;
    align-items: center;

    #model-book{
        background: white;
        width:50%;
        padding: 10px 35px;
        border: 1px solid #ded3d3;
        border-radius: 5px;
    }
    h3{
        text-align: center;
        border-bottom: 1px solid var(--primaryColor);
        padding: 10px;
    }
    .name-room{
        color: rgb(72, 180, 244);
        text-align: center;
        padding-top: 10px;
    }
    .btn-book{
        border: none;
        color: white;
        padding: 10px 20px;
        background-color: #48b4f4;
        border-radius: 5px;
        margin-right: 20px;
        cursor: pointer;
    }
    .btn-book a{
        text-decoration: none;
        color: white;
    }
    .btn-book:hover {
        background-color: white;
        color: #48b4f4;
        border: 1px solid #48b4f4;
    }
    .btn-book:hover a{  
        color: #48b4f4;
    }
    .footer-book{
        text-align: center;
    }
    @media screen and (min-width: 1024px) {
        #model-book{
        width:50%;
       
    }
    @media screen and (min-width: 996px) {
        #model-book{
        width:30%;
       
    }
    @media screen and (max-width: 776px) {
        #model-book{
        width:50%;
       
    }
   
  }
`