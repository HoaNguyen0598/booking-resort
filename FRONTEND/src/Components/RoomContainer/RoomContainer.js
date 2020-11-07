import React from 'react'
import RoomFilter from '../RoomFilter/RoomFilter'
import RoomList from '../RoomLists/RoomList' 
import {withRoomConsumer} from '../../context'
import './style.scss'

function RoomContainer({context}) {
    const {rooms,sortedRooms} = context;
    return (
        <div className="room-container">
            <div className="left">
                <RoomFilter rooms={rooms}/>
            </div>
            <div className="right">
                <RoomList rooms={sortedRooms}/>
            </div>
        </div>
    )
}

export default withRoomConsumer(RoomContainer);
