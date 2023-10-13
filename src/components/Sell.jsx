import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../config";
import { useAuth } from "../contexts/AuthProvider";

const Sell = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());
      axios
        .post(`${API}/properties/add`, [{ ...formDataObj, sid: user.uid }])
        .then((res) => {
          if (res.status == 200) navigate("/dashboard");
          else setFailed(true);
        })
        .catch((err) => {
          console.error(err);
          setFailed(true);
        });
      console.log([formDataObj]);
    }
    setValidated(true);
  };

  return (
    <div>
      <Container className="px-4 py-4" style={{ maxWidth: "720px" }}>
        <h1 className="mb-3">Add a listing</h1>
        <Form
          encType="multipart/form-data"
          noValidate
          validated={validated}
          className="p-4 p-md-5 border rounded-3 bg-light"
          onSubmit={handleSubmit}>
          <Form.Group className="mb-3 form-floating" controlId="name">
            <Form.Control
              type="text"
              name="name"
              required
              placeholder="Enter name"
            />
            <Form.Label>Property Name</Form.Label>
            <Form.Control.Feedback type="invalid">
              Please enter a name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 form-floating" controlId="area">
            <Form.Control
              type="text"
              name="area"
              required
              placeholder="Enter area"
            />
            <Form.Label>Area</Form.Label>
            <Form.Control.Feedback type="invalid">
              Please enter an area.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <InputGroup className="mb-3">
              <InputGroup.Text id="price">₹</InputGroup.Text>
              <Form.Control
                name="price"
                type="number"
                placeholder="Price"
                aria-label="Price"
                aria-describedby="price"
                required
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter an amount.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 form-floating" controlId="file">
            <Form.Control type="text" name="image" placeholder="Enter image" />
            <Form.Label>Image URL</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3 form-floating" controlId="desc">
            <Form.Control
              as="textarea"
              type="text"
              name="desc"
              placeholder="Enter description"
              style={{ height: "100px" }}
            />
            <Form.Label>Description</Form.Label>
          </Form.Group>
          <Row className="align-items-center">
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Sell;
