import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const Login = () => {
  const { login } = useAuth();
  const [validated, setValidated] = useState(false);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());
      login(formDataObj)
        .then((res) => {
          console.log(res);
          if (res == 200) {
            setFailed(false);
            navigate("/", { replace: true });
          } else {
            setFailed(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setFailed(true);
        });
      //   console.log(formDataObj, res);
    }
    setValidated(true);
  };
  return (
    <Container className="px-4 py-4" style={{ maxWidth: "720px" }}>
      <h1 className="mb-3">Login</h1>
      <Form
        noValidate
        validated={validated}
        className="p-4 p-md-5 border rounded-3 bg-light"
        onSubmit={handleSubmit}>
        <Form.Group className="mb-3 form-floating" controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            autoComplete="on"
            required
            placeholder="Enter email"
          />
          <Form.Label>Email address</Form.Label>
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          className="mb-3 form-floating"
          controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            required
            placeholder="Password"
            autoComplete="current-password"
          />
          <Form.Label>Password</Form.Label>
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>
        <Row className="align-items-center">
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Col>
          <Col xs="auto">
            <Form.Text muted>
              New user? <Link to="/register">Create an account</Link>
            </Form.Text>
          </Col>
        </Row>
        {failed && (
          <div className="py-3 text-danger">
            Make sure the Email and Password are correct
          </div>
        )}
      </Form>
    </Container>
  );
};

export default Login;
