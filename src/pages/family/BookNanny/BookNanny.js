import React, { useEffect, useState } from "react";
import { Alert, Form, InputGroup } from "react-bootstrap";
import NannyContainer from "./NannyContainer";
import axios from "axios";

const BookNanny = () => {
  const [name, setSearchName] = useState("");

  const [location, setSearchLocation] = useState("");

  const [startTime, setStartTime] = useState(null);

  const [endTime, setEndTime] = useState(null);

  const [nannies, setNannies] = useState([]);

  const [fetcthing, setFetching] = useState(false);

  const [showError, setShowError] = useState(false);

  async function fetchNannies() {
    setFetching(true);
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/filter_nannies/`, {
          location: location,
          name: name,
          start_time: startTime,
          end_time: endTime,
        })
        .catch((_) => {
          setShowError(true);
        })
        .then((response) => {
          console.log(response);
          if (response && response.status === 200) {
            setNannies(response.data);
          } else {
            setShowError(true);
          }
        });
    } catch (_) {}
    setFetching(false);
  }

  useEffect(() => {
    fetchNannies();
    // eslint-disable-next-line
  }, [name, location, startTime, endTime]);

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
                setStartTime(new Date(e.target.value).toISOString());
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
                setEndTime(new Date(e.target.value).toISOString());
              }}
            />
          </InputGroup>
        </div>
      </div>
      <div className="listNannies">
        <h3>Nannies</h3>
        {showError && (
          <Alert
            variant="danger"
            onClose={() => {
              setShowError(false);
            }}
            dismissible
          >
            <Alert.Heading>Error Fetching Nannies.</Alert.Heading>
          </Alert>
        )}
        {fetcthing ? (
          <>Fetching...</>
        ) : (
          nannies.map((e, i) => {
            return <NannyContainer key={i} nanny={e} />;
          })
        )}
      </div>
    </div>
  );
};

export default BookNanny;
