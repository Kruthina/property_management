import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/format";

const Properties = ({ properties, seller }) => {
  const navigate = useNavigate();

  return (
    <Row className="mt-3">
      {properties.map((property) => (
        <Col key={property.P_id}>
          <div
            onClick={() => {
              if (seller) {
                navigate(`/edit/property/${property.P_id}`);
              } else navigate(`/property/${property.P_id}`);
            }}
            className="border rounded-3"
            style={{
              background: `url(${property.Image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "30vh",
              maxWidth: "280px",
              cursor: "pointer",
              width: "100%",
              overflow: "hidden",
            }}>
            <div
              className="p-3 h-100 d-flex flex-column justify-content-end text-light"
              style={{
                backgroundImage: "linear-gradient(transparent, black)",
              }}>
              <p className="lead mb-0">{property.Name}</p>
              <small className="text-muted">{property.Area}</small>
              <p className="h4 mb-0">₹ {formatPrice(property.Price)}</p>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default Properties;
