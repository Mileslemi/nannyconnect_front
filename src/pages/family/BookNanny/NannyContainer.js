import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import defaultImage from "../../../assets/images/defaultprofilelady.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NannyContainer = ({ nanny }) => {
  const { id, availabity, hourly_rate, user } = nanny;

  const userId = useSelector((state) => state.user?.user?.id);

  const [availability, setAvailability] = useState(availabity ?? false);

  const [checking, setChecking] = useState(false);

  const [counterOffer, setCounterOffer] = useState(null);

  const [startTime, setStartTime] = useState(null);

  const [endTime, setEndTime] = useState(null);

  const [otherDetails, setOtherDetails] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setAvailability(false);
    if (startTime && endTime) {
      // off to booking
      //   userId, nannyId, startTime, endTime, negotiated hourly rate
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/bookings/`, {
            user: userId,
            nanny: id,
            start_time: startTime,
            end_time: endTime,
            details: otherDetails,
            negotiated_hourly_rate: counterOffer ?? hourly_rate,
          })
          .catch((_) => {
            setAvailability(availabity ?? false);
          })
          .then((response) => {
            if (response && response.status === 200) {
              navigate("/dashboard/bookings");
            } else {
              setAvailability(availabity ?? false);
            }
          });
      } catch (_) {
        setAvailability(availabity ?? false);
      }
    }
  }

  async function checkAvailability() {
    setChecking(true);
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/check_booking/`, {
          nanny: id,
          start_time: startTime,
          end_time: endTime,
        })
        .catch((_) => {})
        .then((response) => {
          console.log(response);
          if (response && response.status === 200) {
            setAvailability(response.data);
          }
        });
    } catch (_) {}
    setChecking(false);
  }

  useEffect(() => {
    if (startTime && endTime) {
      checkAvailability();
    }

    // eslint-disable-next-line
  }, [startTime, endTime]);
  return (
    <div className="row nannyContainer">
      <Col sm={2}>
        <div className="avatar">
          {user.image ? (
            <img
              src={`${process.env.REACT_APP_API_URL}${user.image}`}
              name="current-image"
              alt=""
            />
          ) : (
            <img src={defaultImage} name="current-image" alt="" />
          )}
        </div>
      </Col>
      <Col sm={4} className="nannydetails">
        <p>Name : {user.first_name + " " + user.last_name}</p>
        <p>
          Location :{" "}
          {user.location.address +
            ", " +
            user.location.town +
            ", " +
            user.location.county}{" "}
        </p>
        <p>Hourly Rate : Ksh. {hourly_rate} </p>
      </Col>
      <Col sm={6} className="nannyactions">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Control
            type="number"
            placeholder="Counter offer..."
            className="me-2"
            aria-label="Search"
            aria-describedby="search-1"
            value={counterOffer}
            onChange={(e) => {
              setCounterOffer(e.target.value);
            }}
          />
          <InputGroup>
            <InputGroup.Text id="search-1">From</InputGroup.Text>
            <input
              type="datetime-local"
              id="fromtime"
              name="fromtime"
              className="dateInput"
              required
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
              required
              className="dateInput"
              onChange={(e) => {
                setEndTime(new Date(e.target.value).toISOString());
              }}
            />
          </InputGroup>
          <textarea
            placeholder="More details ..."
            name="description"
            className="form-control"
            maxLength={100}
            value={otherDetails}
            rows={2}
            onChange={(e) => setOtherDetails(e.target.value.trimStart())}
          ></textarea>
          <Button
            type="submit"
            variant="success"
            disabled={!availability || checking}
          >
            {availabity ? (checking ? "Checking..." : "Request") : "N/A"}
          </Button>
        </Form>
      </Col>
    </div>
  );
};

export default NannyContainer;
