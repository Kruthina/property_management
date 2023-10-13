import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { API } from "../config";
import { useAuth } from "../contexts/AuthProvider";
import Properties from "./Properties";

const Dashboard = () => {
  const [active, setActive] = useState(0);

  const list = ["Purchased", "Listings"];
  return (
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
      {active == 0 ? <Purchased /> : <Listings />}
    </Row>
  );
};

const Purchased = () => {
  const [purchased, setPurchased] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get(`${API}/properties/all/buyer/${user.uid}`)
      .then((res) => {
        console.log(res.data);
        setPurchased(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Col className="p-3">
      <h1>Properties purchased</h1>
      <hr />
      {purchased.length > 0 ? (
        <Properties properties={purchased} />
      ) : (
        "No property purchased"
      )}
    </Col>
  );
};
const Listings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/properties/all/seller/${user.uid}`)
      .then((res) => {
        console.log(res.data);
        setListings(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Col className="p-3">
      <h1>Properties Listed</h1>
      <hr />
      {listings.length > 0 ? (
        <Properties properties={listings} seller={true} />
      ) : (
        "No properties listed"
      )}
    </Col>
  );
};

export default Dashboard;
