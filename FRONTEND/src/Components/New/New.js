import React from 'react'
import {Link} from 'react-router-dom'
import './style.scss'

export default function New({items}){
    console.log(items);
    const {title,_id,description,image} = items;
    return (
        <div>
            <article className="card-new">
                <div className="new-container">
                   <Link to={`/tintuc/${_id}`}>
                       <img src={`http://localhost:5000/upload/${image}`} alt="image_new" className="card-img-top" />
                   </Link>
                </div>
                <div className="title">
                    <h3>{title}</h3>
                </div>
                <div className="content">
                    <p>{description}</p>
                </div>
            </article>
        </div>
    )
}
