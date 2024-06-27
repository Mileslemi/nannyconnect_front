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

const BookingDetail = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  if (!(isAuthenticated ?? false)) {
    navigate("/");
  }

  const [bookingDetail, setBookingDetail] = useState(bookingModel);

  const [loading, setLoading] = useState(false);

  const [complaint, setComplaint] = useState(null);

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

  async function acceptJob() {
    setLoading(true);
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/bookings/${id}/`, {
          ...bookingDetail,
          status: "confirmed",
          user: bookingDetail.user?.id,
          nanny: bookingDetail.nanny?.id,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            navigate("/dashboard_nanny");
          }
        });
    } catch (_) {}
    setLoading(false);
  }

  async function rejectJob() {
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/bookings/${id}/`, {
          ...bookingDetail,
          status: "rejected",
          user: bookingDetail.user?.id,
          nanny: bookingDetail.nanny?.id,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            navigate("/dashboard_nanny");
          }
        });
    } catch (_) {}
  }

  async function makeComplaint() {
    setLoading(true);
    try {
      if (complaint && complaint.length > 25) {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/complaints/`, {
            booking: bookingDetail?.id,
            complaint: complaint,
          })
          .catch((_) => {})
          .then((response) => {
            if (response && response.status === 200) {
              navigate("/dashboard_nanny/bookings");
            }
          });
      }
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
          {bookingDetail.user?.image ? (
            <img
              src={`${process.env.REACT_APP_API_URL}${bookingDetail.user.image}`}
              name="current-image"
              alt=""
            />
          ) : (
            <img src={defaultImage} name="current-image" alt="" />
          )}
        </div>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Status
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="status"
              disabled
              maxLength={64}
              value={bookingDetail.status}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Family
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="first_name"
              disabled
              maxLength={64}
              value={
                bookingDetail.user?.first_name +
                " " +
                bookingDetail.user?.last_name
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
              value={bookingDetail.user?.location?.address}
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
              value={bookingDetail.user?.location?.town}
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
              value={bookingDetail.user?.location?.county}
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
            Offered Hourly Rate
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
        {loading || bookingDetail.status !== "pending" ? (
          <></>
        ) : (
          <div className="bookingDetailsButtons">
            <Button
              className="form-submit-btn"
              variant="primary"
              disabled={loading || bookingDetail.status !== "pending"}
              onClick={() => acceptJob()}
            >
              {loading ? "Wait ..." : "Accept"}
            </Button>
            <Button
              className="form-submit-btn"
              variant="warning"
              disabled={bookingDetail.status !== "pending"}
              onClick={() => rejectJob()}
            >
              Reject
            </Button>
          </div>
        )}
        {loading ||
        bookingDetail.status === "confirmed" ||
        bookingDetail.status === "done" ? (
          <div className="complaints_div">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Complaint
              </Form.Label>

              <Col sm="7">
                <textarea
                  placeholder="Write your complaint in no less than 25 words. Please don't raise issue more than once on same booking...."
                  name="complaint"
                  className="form-control"
                  value={complaint}
                  rows={4}
                  onChange={(e) => {
                    setComplaint(e.target.value);
                  }}
                ></textarea>
              </Col>
            </Form.Group>
            <Button
              className="form-submit-btn"
              variant="warning"
              onClick={() => makeComplaint()}
            >
              Raise Issue
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
};

export default BookingDetail;
