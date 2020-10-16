import React from 'react'
import {Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav>
            <Link to="/dashboard" exact>Dashboard</Link>{" | "}
            <Link to="/dashboard/route" >Route</Link>{" | "}
        </nav>
    )
}
