import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  ListGroup,
  Table,
} from "react-bootstrap";
import { API } from "../config";
import { useAuth } from "../contexts/AuthProvider";

const EditProperty = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const list = ["Edit listing", "Registrations"];

  useEffect(() => {
    axios
      .get(`${API}/properties/${id}`)
      .then((res) => {
        if (res.data[0].Seller_id !== user.uid) {
          navigate("/", { replace: true });
        } else setData(res.data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  return data ? (
    <Row
      className="p-0 m-0"
      style={{
        minHeight: "calc( 100vh - 56px )",
        height: "100%",
      }}>
      <Col xs={6} md={4} className="bg-light p-0" style={{ width: 280 }}>
        <ListGroup as="ul" className="bg-light p-0" variant="flush">
          {list.map((val, index) => (
            <ListGroup.Item
              as="li"
              key={index}
              onClick={() => {
                setActive(index);
              }}
              className={`${!(active == index) ? "bg-light" : ""}`}
              style={{ cursor: "pointer" }}
              active={active == index}>
              {val}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col>
        {active == 0 ? (
          data ? (
            <Edit data={data} setData={setData} />
          ) : (
            "Wrong address"
          )
        ) : (
          <Registraions pid={data.P_id} />
        )}
      </Col>
    </Row>
  ) : (
    "No property with ID: " + id
  );
};

const Edit = ({ data, setData }) => {
  const [validated, setValidated] = useState(false);
  const [updated, setUpdate] = useState(false);
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
        .put(`${API}/properties/update`, { ...formDataObj, pid: data.P_id })
        .then((res) => {
          console.log(res);
          if (res.status == 200) setUpdate(true);
          //   else
          //    setFailed(true);
        })
        .catch((err) => {
          console.error(err);
        });
      console.log([formDataObj]);
    }
    setValidated(true);
  };

  const deleteP = () => {
    axios
      .delete(`${API}/properties/delete/${data.P_id}`)
      .then((res) => {
        if (res.status === 200) {
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <div>
        <Container className="px-4 py-4" style={{ maxWidth: "720px" }}>
          <h1 className="mb-3">Edit listing</h1>
          {updated && <p className="text-success">Listing updated</p>}
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
                defaultValue={data.Name}
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
                defaultValue={data.Area}
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
                  defaultValue={data.Price}
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
              <Form.Control
                type="text"
                name="image"
                defaultValue={data.Image}
                placeholder="Enter image"
              />
              <Form.Label>Image URL</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3 form-floating" controlId="desc">
              <Form.Control
                as="textarea"
                type="text"
                name="desc"
                defaultValue={data.Description}
                placeholder="Enter description"
                style={{ height: "100px" }}
              />
              <Form.Label>Description</Form.Label>
            </Form.Group>
            <Row className="align-items-center">
              <Col xs="auto">
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Col>
              <Col>
                <Button variant="danger" onClick={deleteP}>
                  Delete
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};

const Registraions = ({ pid }) => {
  const [regs, setRegs] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/registrations/all/${pid}`)
      .then((res) => {
        setRegs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Container className="px-0 py-3">
        <h1 className="mb-3">Registraions</h1>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Property ID</th>
              <th>Candidate ID</th>
              <th>Date of Reg.</th>
              <th>Date of Exp.</th>
              <th>Approval</th>
            </tr>
          </thead>
          {regs.map((reg) => {
            const approval = (action) => {
              Date.prototype.addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
              };

              const date = new Date(reg.Date_of_Reg);

              axios
                .put(`${API}/registrations/update`, {
                  doe: date.addDays(3650).toISOString().slice(0, 10),
                  approval: action,
                  rid: reg.R_id,
                })
                .then((res) => {
                  if (res.status === 200) {
                    setRegs((prev) =>
                      prev.map((p) =>
                        p.R_id === reg.R_id ? { ...p, ["Approval"]: action } : p
                      )
                    );
                    if (action === "Approved") {
                      axios
                        .put(`${API}/properties/update-buyer`, {
                          bid: reg.Candidate_id,
                          pid: reg.P_id,
                        })
                        .then((res) => {
                          if (res.status === 200) {
                            axios
                              .put(`${API}/registrations/reject-all`, {
                                sid: reg.Seller_id,
                              })
                              .then((res) => {
                                setRegs((prev) =>
                                  prev.map((p) =>
                                    p.R_id !== reg.R_id
                                      ? { ...p, ["Approval"]: "Rejected" }
                                      : p
                                  )
                                );
                              });
                          }
                        });
                    }
                  }
                });
            };

            return (
              <tbody>
                <tr>
                  <td>{reg.R_id}</td>
                  <td>{reg.P_id}</td>
                  <td>
                    <Button
                      variant="link"
                      size="sm"
                      as={Link}
                      to={`/profile/${reg.Candidate_id}`}>
                      {reg.Candidate_id}
                    </Button>
                  </td>
                  <td>{new Date(reg.Date_of_Reg).toDateString()}</td>
                  <td>
                    {reg.Date_of_Exp
                      ? new Date(reg.Date_of_Exp).toDateString()
                      : "-"}
                  </td>
                  <td>
                    {reg.Approval === "Pending" ? (
                      <div>
                        <Button
                          variant="danger"
                          className="mx-3"
                          onClick={() => {
                            approval("Rejected");
                          }}>
                          🗙
                        </Button>
                        <Button
                          onClick={() => {
                            approval("Approved");
                          }}>
                          ✓
                        </Button>
                      </div>
                    ) : (
                      reg.Approval
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </Container>
    </div>
  );
};

export default EditProperty;
