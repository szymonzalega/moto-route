import React from 'react'
import {Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav>
            <Link to="/index">Dashboard</Link>{" | "}
            <Link to="/index/routes" >Routes</Link>{" | "}
            <Link to="/index/user-profile" >Profile</Link>
        </nav>
    )
}
