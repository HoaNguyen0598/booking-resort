import React from 'react'
import './style.scss'

export default function HeaderTop() {
    return (
        <div className="header-top">
            <div className="auto-container">
                <div className="top-right">
                    <ul>
                        <li>
                            <a href="">Login</a>
                        </li>
                        <li>
                            <a href="">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
