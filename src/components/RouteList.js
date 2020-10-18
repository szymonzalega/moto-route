import React from "react";
import { Link } from "react-router-dom";

export default function RouteList({ routes, onDeleteClick }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Length</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {routes.map((route) => {
          return (
            <tr key={route.id}>
              <td>
                <Link to={"/index/routes/" + route.id}>{route.name}</Link>
              </td>
              <td>{route.length}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(route)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
