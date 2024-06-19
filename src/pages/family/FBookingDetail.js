import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../assets/images/defaultprofilelady.jpg";
import { Button, Col, Form, Row } from "react-bootstrap";

const bookingModel = {
  id: null,
  nanny: {},
  user: {},
  start_time: null,
  end_time: null,
  negotiated_hourly_rate: null,
  status: "",
  details: "",
};

const FBookingDetail = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  if (!(isAuthenticated ?? false)) {
    navigate("/");
  }

  const [bookingDetail, setBookingDetail] = useState(bookingModel);

  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  async function fetchBookingDetail() {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/bookings/${id}/`)
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            setBookingDetail(response.data);
          }
        });
    } catch (_) {}
  }

  async function cancelJob() {
    setLoading(true);
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/bookings/${id}/`, {
          ...bookingDetail,
          status: "cancelled",
          user: bookingDetail.user?.id,
          nanny: bookingDetail.nanny?.id,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            navigate("/dashboard");
          }
        });
    } catch (_) {}
    setLoading(false);
  }

  useEffect(() => {
    fetchBookingDetail();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="profile">
      <Form>
        <div className="avatar">
          {bookingDetail.nanny?.user?.image ? (
            <img
              src={`${process.env.REACT_APP_API_URL}${bookingDetail.nanny.user.image}`}
              name="current-image"
              alt=""
            />
          ) : (
            <img src={defaultImage} name="current-image" alt="" />
          )}
        </div>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nanny
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="first_name"
              disabled
              maxLength={64}
              value={
                bookingDetail.nanny?.user?.first_name +
                " " +
                bookingDetail.nanny?.user?.last_name
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Zip
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="address"
              maxLength={120}
              value={bookingDetail.nanny?.user?.location?.address}
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nearest Town
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="town"
              maxLength={32}
              value={bookingDetail.nanny?.user?.location?.town}
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            County
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="county"
              maxLength={32}
              value={bookingDetail.nanny?.user?.location?.county}
              disabled
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Start Time
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="county"
              maxLength={32}
              value={new Date(bookingDetail.start_time).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  weekday: "long",
                  hour: "2-digit",
                  hour12: false,
                  minute: "2-digit",
                  second: "2-digit",
                }
              )}
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Endtime
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="county"
              maxLength={32}
              value={new Date(bookingDetail.end_time).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  weekday: "long",
                  hour: "2-digit",
                  hour12: false,
                  minute: "2-digit",
                  second: "2-digit",
                }
              )}
              disabled
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Hourly Rate Offer
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="number"
              name="hourly_rate"
              disabled
              maxLength={4}
              value={bookingDetail.negotiated_hourly_rate}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Details
          </Form.Label>

          <Col sm="7">
            <textarea
              placeholder="...."
              name="description"
              className="form-control"
              value={bookingDetail.details}
              rows={4}
              disabled
            ></textarea>
          </Col>
        </Form.Group>
        {bookingDetail.status === "pending" ? (
          <div className="bookingDetailsButtons">
            <Button
              className="form-submit-btn"
              variant="primary"
              disabled={loading}
              onClick={() => cancelJob()}
            >
              {loading ? "Wait ..." : "Cancel"}
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
};

export default FBookingDetail;
