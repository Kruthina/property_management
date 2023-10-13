import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());
      axios
        .post(`${API}/user/add`, formDataObj)
        .then((res) => {
          if (res.status == 200) navigate("/login");
          else setFailed(true);
        })
        .catch((err) => {
          console.error(err);
          setFailed(true);
        });
      console.log(formDataObj);
    }
    setValidated(true);
  };
  return (
    <Container className="px-4 py-4" style={{ maxWidth: "720px" }}>
      <h1 className="mb-3">Register</h1>
      <Form
        noValidate
        validated={validated}
        className="p-4 p-md-5 border rounded-3 bg-light"
        onSubmit={handleSubmit}>
        <Form.Group className="mb-3 form-floating" controlId="formBasicName">
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Name"
            required
          />
          <Form.Label>Name</Form.Label>
          <Form.Control.Feedback type="invalid">
            Please enter a name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 form-floating" controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
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
            placeholder="Password"
            required
          />
          <Form.Label>Password</Form.Label>
          <Form.Control.Feedback type="invalid">
            Please choose a password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 form-floating" controlId="formBasicDOB">
          <Form.Control type="date" name="dob" placeholder="Date of Birth" />
          <Form.Label>Date of Birth</Form.Label>
        </Form.Group>
        <Row className="align-items-center">
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Col>
          <Col xs="auto">
            <Form.Text muted>
              Already a member? <Link to="/login">Sign in</Link>
            </Form.Text>
          </Col>
        </Row>
        {failed && <div className="py-3 text-danger">User already exists</div>}
      </Form>
    </Container>
  );
};

export default Register;
