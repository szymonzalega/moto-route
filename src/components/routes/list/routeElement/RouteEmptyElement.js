import React from 'react'

export default function RouteEmptyElement({message}) {
    return (
        <div className="route__emptyInfo">
            <span>{message}</span>
        </div>
    )
}
