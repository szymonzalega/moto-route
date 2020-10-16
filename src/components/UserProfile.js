import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const { currentUser } = useAuth();

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        <strong>Email: </strong>
        {currentUser.email}
        <Link
          to="/index/user-profile/update-profile"
          className="btn btn-primary w-100 mt-3"
        >
          Update Profile
        </Link>
      </Card.Body>
    </Card>
  );
}
