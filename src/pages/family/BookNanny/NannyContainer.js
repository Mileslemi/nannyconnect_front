import React from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";

const NannyContainer = () => {
  return (
    <div className="row nannyContainer">
      <Col sm={2}>
        <div className="avatar"></div>
      </Col>
      <Col sm={4} className="nannydetails">
        <p>Name</p>
        <p>Location</p>
        <p>Hourly Rate : Ksh. </p>
      </Col>
      <Col sm={6} className="nannyactions">
        <Form.Control
          type="search"
          placeholder="Offer..."
          className="me-2"
          aria-label="Search"
          aria-describedby="search-1"
        />
        <InputGroup>
          <InputGroup.Text id="search-1">From</InputGroup.Text>
          <input
            type="datetime-local"
            id="fromtime"
            name="fromtime"
            className="dateInput"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="search-1">To</InputGroup.Text>
          <input
            type="datetime-local"
            id="totime"
            name="totime"
            className="dateInput"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </InputGroup>
        <Button variant="success">Request/N\A</Button>
      </Col>
    </div>
  );
};

export default NannyContainer;
