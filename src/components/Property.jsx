import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config";
import { useAuth } from "../contexts/AuthProvider";
import { formatPrice } from "../utils/format";

const Property = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [seller, setSeller] = useState(null);
  const [approved, setApproved] = useState(false);
  const [approvedState, setApprovedState] = useState("Pending");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/properties/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);
        axios.get(`${API}/user/${res.data[0].Seller_id}`).then((res2) => {
          setSeller(res2.data[0]);
          getReg(id, user.uid);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const getReg = (pid, cid) => {
    axios
      .get(`${API}/registrations/reg/${pid}/${cid}`)
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        if (data.length > 0) {
          setApproved(true);
          setApprovedState(data[0].Approval);
        }
      })
      .catch((err) => console.error(err));
  };

  const request = () => {
    axios
      .post(`${API}/registrations/add`, [
        {
          pid: id,
          dor: new Date().toISOString().slice(0, 10),
          cid: user.uid,
          approval: "Pending",
        },
      ])
      .then((res) => {
        if (res.status === 200) setApproved(true);
      });
  };
  return (
    data &&
    seller && (
      <Row className="p-3 px-5 m-0">
        <Col>
          <div
            className="border rounded-3 mb-3"
            style={{
              background: `url(${data.Image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "30vh",
              cursor: "pointer",
              width: "100%",
            }}></div>

          <h1>{data.Name}</h1>
          <small className="text-muted">{data.Area}</small>
          <p className="h4 mb-5">₹ {formatPrice(data.Price)}</p>
          <small className="text-muted">Description</small>
          <p>{data.Description || "No description available"}</p>
        </Col>
        <Col
          xs={6}
          md={4}
          style={{ width: "280px", height: "fit-content" }}
          className="p-3 border rounded-3 bg-light">
          <p>Listing by:</p>
          <b className="fs-5">{seller.Name}</b>
          <p className="text-muted">{seller.Email}</p>
          <hr />

          {!user ? (
            <p>Login to take action</p>
          ) : user.uid === data.Seller_id ? (
            <Button
              className="w-100"
              onClick={() => {
                navigate(`/edit/property/${data.P_id}`);
              }}>
              Edit listing
            </Button>
          ) : (
            <Button
              className="w-100"
              disabled={user.uid === data.Buyer_id || approved}
              onClick={request}>
              {approved
                ? `Approval ${approvedState.toLowerCase()}`
                : "Request to buy"}
            </Button>
          )}
        </Col>
      </Row>
    )
  );
};

export default Property;
