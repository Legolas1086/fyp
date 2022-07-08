import React, { useState } from "react";
import { Card } from "react-bootstrap";
 
function DonorHomePage() {
  const [modalShow, setModalShow] = useState(false);
  return (
      <div className="d-flex justify-content-around">
        <Card style={{ width: "20rem", height: "16rem" }}>
          <Card.Body>
            <Card.Img variant="top" src="Ngo.jpg" />
            <Card.Title>NGOs</Card.Title>
          </Card.Body>
          <Card.Footer>
            <Card.Link href="/avlngo">Click here</Card.Link>
          </Card.Footer>
        </Card>
      </div>
  );
}
export default DonorHomePage;
