import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config";
import { useAuth } from "../contexts/AuthProvider";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { user, logout } = useAuth();
  const [userAdd, setUserAdd] = useState([]);
  const [userPhone, setUserPhone] = useState([]);
  const [phoneNo, setPhone] = useState("");
  const [address, setAdd] = useState("");

  useEffect(() => {
    axios.get(`${API}/user/${id}`).then((res) => {
      if (res.data.length > 0) {
        setUserData(res.data[0]);
        axios.get(`${API}/user/${id}/phone`).then((res) => {
          console.log(res.data);
          setUserPhone(res.data);
        });
        axios.get(`${API}/user/${id}/address`).then((res) => {
          setUserAdd(res.data);
        });
      } else navigate("/", { replace: true });
    });
  }, []);

  const addPhone = (number) => {
    axios
      .post(`${API}/user/add-phone`, [
        {
          uid: user.uid,
          mobile: number,
        },
      ])
      .then(() => {
        setUserPhone((prev) => [...prev, { U_id: user.uid, U_Mobile: number }]);
        setPhone("");
      });
  };
  const addAddress = (add) => {
    axios
      .post(`${API}/user/add-address`, [
        {
          uid: user.uid,
          address: add,
        },
      ])
      .then(() => {
        setUserAdd((prev) => [...prev, { U_id: user.uid, U_Add: add }]);
        setAdd("");
      });
  };
  const deleteAdd = (id) => {
    axios.delete(`${API}/user/delete-add/${id}`).then(() => {
      setUserAdd((prev) => prev.filter((add) => add.Id !== id));
    });
  };
  const deletePhone = (id) => {
    axios.delete(`${API}/user/delete-phone/${id}`).then(() => {
      setUserPhone((prev) => prev.filter((add) => add.Id !== id));
    });
  };

  return (
    userData && (
      <Container className="py-5">
        <Row>
          <Col>
            <h1>{userData.Name}</h1>
            <p>{userData.Email}</p>
            <hr />
            <Button
              variant="outline-danger"
              onClick={() => {
                logout();
                navigate("/", { replace: true });
              }}>
              Logout
            </Button>
          </Col>
          <Col>
            <p className="small text-muted">Mobile number/s</p>
            {userPhone.length > 0 ? (
              userPhone.map((phone) => (
                <p key={phone.Id}>
                  {phone.U_Mobile}
                  {user.uid === userData.U_id && (
                    <Button
                      variant="link"
                      size="sm"
                      className="mx-3"
                      onClick={() => {
                        deletePhone(phone.Id);
                      }}>
                      Remove
                    </Button>
                  )}
                </p>
              ))
            ) : (
              <p>Not available</p>
            )}
            {user.uid === userData.U_id && (
              <InputGroup className="mt-3">
                <FormControl
                  placeholder="Add a number"
                  type="number"
                  aria-label="number"
                  aria-describedby="number"
                  value={phoneNo}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  id="number"
                  disabled={!phoneNo}
                  onClick={() => {
                    addPhone(phoneNo);
                  }}>
                  Add
                </Button>
              </InputGroup>
            )}
            <hr />
            <p className="small text-muted">Address</p>
            {userAdd.length > 0 ? (
              userAdd.map((phone) => (
                <p key={phone.Id} className="p-3 bg-light border rounded-3">
                  {phone.U_Add}
                  {user.uid === userData.U_id && (
                    <Button
                      variant="link"
                      size="sm"
                      className="mx-3"
                      onClick={() => {
                        deleteAdd(phone.Id);
                      }}>
                      Remove
                    </Button>
                  )}
                </p>
              ))
            ) : (
              <p>Not available</p>
            )}
            {user.uid === userData.U_id && (
              <InputGroup className="mt-3">
                <FormControl
                  placeholder="Add an address"
                  type="text"
                  as="textarea"
                  aria-label="address"
                  value={address}
                  aria-describedby="address"
                  onChange={(e) => setAdd(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  id="address"
                  disabled={!address}
                  onClick={() => {
                    addAddress(address);
                  }}>
                  Add
                </Button>
              </InputGroup>
            )}
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Profile;
