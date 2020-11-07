import React, {Component} from 'react'
import Room from '../Room/Room'
import './style.scss'
import {RoomContext} from '../../context';

export default class RoomList extends Component{
    constructor(props){
        super(props);
        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0
        }
        this.getData = this.getData.bind(this);
    }

    static contextType = RoomContext;

    componentDidMount(){
        this.getData();
    }

    getData(){
        const  {sortedRooms} = this.context;
        //var {rooms} = this.props;
        var slice = sortedRooms.slice(this.state.offset, this.state.offset + this.state.perPage)
    
        this.setState({
            pageCount: Math.ceil(sortedRooms.length / this.state.perPage),
            orgtableData : sortedRooms,
            tableData:slice
        })
    };
    

    render(){
        const {rooms} = this.props;
        console.log(rooms);
       
        const  {sortedRooms} = this.context;
        console.log(sortedRooms);
       
        return (
            <div>
                <section className="roomslist">
                    <div className="roomlist-center">
                        {
                            rooms.map((item,index) =>{
                                return <Room key={index} room={item} />;
                            })
                        }
                    </div>
                </section>
                {/* <pagination count={10} /> */}
            </div>
        )
    }
}
