import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../../assets/images/defaultprofilelady.jpg";
import star from "../../../assets/icons/star.svg";
import starFill from "../../../assets/icons/star-fill.svg";

const nannyModel = {
  id: null,
  availabity: true,
  hourly_rate: null,
  bio: null,
  verified: false,
  user: null,
  reviews: [],
};

const NannyPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [nannyDetail, setNannyDetail] = useState(nannyModel);

  const userId = useSelector((state) => state.user?.user?.id);

  const [availability, setAvailability] = useState(
    nannyDetail.availabity ?? false
  );

  const [rating, setRating] = useState(4.7);

  const [ratingCount, setRatingCount] = useState(0);

  const [checking, setChecking] = useState(false);

  const [counterOffer, setCounterOffer] = useState(null);

  const [startTime, setStartTime] = useState(null);

  const [endTime, setEndTime] = useState(null);

  const [otherDetails, setOtherDetails] = useState(null);

  async function fetchNannyDetail() {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/nanny/${id}/`)
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            setNannyDetail(response.data);
          }
        });
    } catch (_) {}
  }

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
            negotiated_hourly_rate: counterOffer ?? nannyDetail.hourly_rate,
          })
          .catch((_) => {
            setAvailability(nannyDetail.availabity ?? false);
          })
          .then((response) => {
            if (response && response.status === 200) {
              navigate("/dashboard/bookings");
            } else {
              setAvailability(nannyDetail.availabity ?? false);
            }
          });
      } catch (_) {
        setAvailability(nannyDetail.availabity ?? false);
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

  useEffect(() => {
    let rateCount = 0;
    let ratingSum = 0.0;

    for (const review of nannyDetail.reviews) {
      rateCount++;
      ratingSum += review.rating;
    }

    if (rateCount > 0) {
      setRating(ratingSum / rateCount);
      setRatingCount(rateCount);
    }
  }, [nannyDetail]);

  useEffect(() => {
    fetchNannyDetail();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Container className="nannyPage">
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <div className="nanny_detail_image">
            {nannyDetail?.user?.image ? (
              <img
                src={`${process.env.REACT_APP_API_URL}${nannyDetail?.user?.image}`}
                name="current-image"
                alt=""
              />
            ) : (
              <img src={defaultImage} name="current-image" alt="" />
            )}
          </div>
          <div className="nameAndRate">
            <span>
              <b>
                {nannyDetail?.user?.first_name +
                  " " +
                  nannyDetail?.user?.last_name}
              </b>
            </span>
            <span>
              <b> Ksh. {nannyDetail.hourly_rate}</b>/hr
            </span>
          </div>
          <p>
            {nannyDetail?.user?.location?.address +
              ", " +
              nannyDetail?.user?.location?.town +
              ", " +
              nannyDetail?.user?.location?.county}
          </p>

          <div className="nanny_detail_ratings">
            {rating}{" "}
            {[1, 2, 3, 4, 5].map((e, i) => (
              <span key={i} className="star-rating">
                <img
                  src={i + 1 <= rating ? starFill : star}
                  alt="bootstrap"
                  width="25"
                  height="25"
                />{" "}
              </span>
            ))}
            <p>{ratingCount} rating(s)</p>
          </div>

          <div className="nanny_detail_bio">
            <h4>Meet {nannyDetail?.user?.first_name}</h4>
            <p> {nannyDetail.bio} </p>
          </div>
          <Button
            variant="outline-primary"
            disabled={
              !nannyDetail.availabity ||
              !nannyDetail.verified ||
              nannyDetail.user?.suspended
            }
          >
            Message {nannyDetail?.user?.first_name}{" "}
          </Button>

          <div className="nannyactions">
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
                disabled={
                  !availability ||
                  checking ||
                  !nannyDetail.verified ||
                  nannyDetail.user?.suspended
                }
              >
                {nannyDetail.availabity &&
                nannyDetail.verified &&
                !nannyDetail.user?.suspended
                  ? checking
                    ? "Checking..."
                    : "Request"
                  : "N/A"}
              </Button>
            </Form>
          </div>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default NannyPage;
