import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
      setTimeout(() => {
        history.push("/auth/login");
      }, 2000);
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div className="view">
      <div className="animate view__content">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Remind password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Reset password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/auth/login">Log in</Link>
            </div>
            <div className="w-100 text-center mt-4">
              Do you need an account? <Link to="/auth/signup">Sign up</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
