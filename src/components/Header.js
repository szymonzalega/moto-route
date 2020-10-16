import React from 'react'
import {Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav>
            <Link to="/" exact>Dashboard</Link>{" | "}
            <Link to="/route" >Route</Link>{" | "}
            <Link to="/user-profile" >Profile</Link>
        </nav>
    )
}
