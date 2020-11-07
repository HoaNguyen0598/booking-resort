import React from 'react'
import Title from '../Title/Title'
import {useContext} from 'react'
import {RoomContext} from '../../context'
import './style.scss'
//import axios from 'axios';

// lấy tất cả giá trị 
const getUnique = (items, value) =>{
    return [...new Set(items.map(item => item[value]))]
}

// async function makeGetRequest() {

//     let res = await axios.get('http://localhost:5000/api/roomtype');
  
//     let data = res.data;
//      console.log(data);
//   }
export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext);
    console.log(context);

    const {handleChange,price,minPrice,maxPrice,breakfast,pets,people} = context;
    let selectPeople = getUnique(rooms, 'people');
    console.log(selectPeople);
    selectPeople = selectPeople.map((item, index) =>(
        <option key={index} value={item}>
            {item}
        </option>
    ));
    // async function makeGetRequest() {

    //     let res = await axios.get('http://localhost:5000/api/roomtype');
      
    //     let data = res.data;
    //     let selectRoomType = getUnique(data, 'name');
       

    //     selectRoomType = selectRoomType.map((item, index) =>(
    //         <option key={index} value={item}>
    //             {item}
    //         </option>
    //     ));
    //     console.log(selectRoomType);
    //     return selectRoomType;
    //   }
   
    
    return (
        <div>
           <section className="filter-container">
                <Title className="title" title="Tìm kiếm phòng"/>
                <form className="filter-form">
                    <div className="form-group">
                        <label htmlFor="type">Loại Phòng </label>
                        <select
                            name="type"
                            id="type"
                            value=""
                            onChange={handleChange}
                        >
                            <option>Tất Cả</option>
                            <option>Tầng trệt</option>
                            <option>Lầu 1</option>
                            <option>Lầu 2</option>
                            <option>Lầu 3</option>
                            <option>Lầu 4</option>
                            
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Số người</label>
                        <select
                            name="people"
                            id="people"
                            value={people}
                            onChange={handleChange}
                        >
                            {selectPeople}
                           
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Giá phòng từ ${price}</label>
                        <input
                            type="range"
                            name="price"
                            min={minPrice}
                            max={maxPrice}
                            id="price"
                            value={price}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group form-abc">
                    <label htmlFor="type">Tiện nghi phòng </label>
                        <div className="single-extra">
                            <input
                            type="checkbox"
                            name="breakfast"
                            id="breakfast"
                            checked={breakfast}
                            onChange={handleChange}
                            className="ckb-form"
                            />
                            <label htmlFor="breakfast">Bữa sáng</label>
                        </div>
                        <div className="single-extra">
                            <input
                            type="checkbox"
                            name="pets"
                            id="pets"
                            checked={pets}
                            onChange={handleChange}
                            className="ckb-form"
                            />
                            <label htmlFor="pets">Thú cưng</label>
                        </div>
                    </div>
                </form>
           </section>
        </div>
    )
}
