import React, { Component } from 'react'
import CallApi from './utils/apiCaller';

const RoomContext = React.createContext();
//const items = CallApi('room','GET',null).then(res => res.data);
class RoomProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: [],
            sortedRooms: [],
            people:1,
            price: 0,
            minPrice: 0,
            maxPrice: 0,
            breakfast: 0,
            pets: 0

        }
    }

    componentDidMount(){
        // CallApi('api/room','GET',null).then(res =>{
        //   this.setState({
        //     rooms: res.data,
        //   })
        // })
        CallApi('api/room','GET',null)
        .then(res => res.data)
        // .then( res => { 
        //     let maxPrice = Math.max(...res.map(item => item.price)) 
        //     return maxPrice
        // })
        .then(result =>{
            this.setState({
                rooms: result,
                sortedRooms: result,
                price: Math.max(...result.map(item => item.price)) ,
                maxPrice: Math.max(...result.map(item => item.price))
            })
        })
      }
    // items = CallApi('room','GET',null).then(res => res.data);
    // formatData(items){
    //     console.log(items)
    //     let tempItem = items.map(item =>{
    //         let id = item.id_room;
    //         let images = item.image;
            
    //         let room = {...item,images,id};
    //         return room;
    //     })
    //     return tempItem;
    // }
    getRoom = id =>{
        const tempRooms = [...this.state.rooms];
        console.log(tempRooms);
        const room = tempRooms.find(item => item._id === id );
        console.log(room);
        return room;
        
    }
    handleChange = e =>{
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name] : value
        },this.filterRooms)
    }

    filterRooms = () =>{
        let {rooms,price,breakfast,pets,people} = this.state;
        let tempRooms = [...rooms];
        price = parseInt(price);
        people = parseInt(people);
        //filter price
        tempRooms = tempRooms.filter(room => room.price <= price);
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
          }
        //filter people
        if(people !== 1){
            tempRooms = tempRooms.filter(room => room.people >= people);
        }
          //filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
          }
        this.setState({
            sortedRooms: tempRooms
        })
        console.log('hello Hoa')
    }



    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange
              
            }}>
                {this.props.children}
            </RoomContext.Provider> 
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomContext, RoomConsumer };

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return (
            <RoomConsumer>
                {value => <Component {...props} context={value} />}
            </RoomConsumer>
        )
    }
}