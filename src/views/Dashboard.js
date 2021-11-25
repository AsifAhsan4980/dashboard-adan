import React from "react";
// react-bootstrap components
import {
  Card,
  Container,
} from "react-bootstrap";

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Card>
          <Card.Body>
            <h2 className="text-center mt-lg-5">
              Welcome To Dashboard
            </h2>

          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Dashboard;
