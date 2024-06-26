import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../assets/images/defaultprofilelady.jpg";
import { Button, Col, Form, Row } from "react-bootstrap";
import star from "../../assets/icons/star.svg";
import starFill from "../../assets/icons/star-fill.svg";

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

  const [payment, setPayment] = useState("mpesa");

  const [formData, setFormData] = useState({
    review: "N/A",
    rating: 4.7,
  });

  const { review, rating } = formData;

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

  async function payJob() {
    setLoading(true);

    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/bookings/${id}/`, {
          ...bookingDetail,
          status: "done",
          user: bookingDetail.user?.id,
          nanny: bookingDetail.nanny?.id,
        })
        .catch((_) => {})
        .then(async (response) => {
          if (response && response.status === 200) {
            // if successfully paid, add review.
            await axios
              .post(`${process.env.REACT_APP_API_URL}/add_review/`, {
                ...formData,
                reviewer: bookingDetail.user?.id,
                nanny_id: bookingDetail.nanny?.id,
              })
              .catch((_) => {});
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
        {/* <Form.Group as={Row} className="mb-3">
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
        </Form.Group> */}

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
        {bookingDetail.status === "confirmed" ? (
          <>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Rating
              </Form.Label>
              <Col sm="7" style={{ display: "flex" }}>
                {[1, 2, 3, 4, 5].map((e, i) => (
                  <Button
                    className="star-rating"
                    onClick={() => setFormData({ ...formData, rating: e })}
                  >
                    <img
                      src={i + 1 <= rating ? starFill : star}
                      alt="bootstrap"
                      width="25"
                      height="25"
                    />
                  </Button>
                ))}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Comments
              </Form.Label>

              <Col sm="7">
                <textarea
                  placeholder="Give you comments on the nanny's job..."
                  name="comment"
                  className="form-control"
                  value={review}
                  rows={4}
                  onChange={(e) =>
                    setFormData({ ...formData, review: e.target.value })
                  }
                ></textarea>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Payment Option
              </Form.Label>
              <Col sm="7" style={{ display: "flex", justifyContent: "center" }}>
                <Form.Check
                  inline
                  label="M-Pesa"
                  name="group1"
                  type="radio"
                  checked={payment === "mpesa"}
                  onChange={(e) => setPayment("mpesa")}
                  id={`inline-radio-2`}
                />
                <Form.Check
                  inline
                  label="PayPal"
                  checked={payment === "paypal"}
                  name="group1"
                  type="radio"
                  onChange={(e) => setPayment("paypal")}
                  id={`inline-radio-1`}
                />
              </Col>
            </Form.Group>
          </>
        ) : (
          <></>
        )}
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
        ) : bookingDetail.status === "confirmed" ? (
          <div className="bookingDetailsButtons">
            <Button
              className="form-submit-btn"
              variant="primary"
              disabled={loading}
              onClick={() => payJob()}
            >
              {loading ? "Wait ..." : "Pay"}
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
