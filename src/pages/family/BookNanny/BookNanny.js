import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import NannyContainer from "./NannyContainer";

const BookNanny = () => {
  const [name, setSearchName] = useState("");

  const [location, setSearchLocation] = useState("");

  const [startTime, setStartTime] = useState(null);

  const [endTime, setEndTime] = useState(null);

  return (
    <div>
      <div className="filter">
        <div className="searchDiv">
          <InputGroup>
            <InputGroup.Text id="search-1">Names</InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Filter By Name..."
              className="me-2"
              aria-label="Search"
              aria-describedby="search-1"
              onChange={(e) => setSearchName(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Text id="search-1">Location</InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Filter By Location..."
              className="me-2"
              aria-label="Search"
              aria-describedby="search-1"
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="dateDiv">
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
        </div>
      </div>
      <div className="listNannies">
        <h3>Nannies</h3>
        {<NannyContainer />}
        {<NannyContainer />}
        {<NannyContainer />}
        {<NannyContainer />}
        {<NannyContainer />}
        {<NannyContainer />}
      </div>
    </div>
  );
};

export default BookNanny;
