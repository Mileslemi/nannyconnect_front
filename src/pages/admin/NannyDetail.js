import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import defaultImage from "../../assets/images/defaultprofilelady.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import star from "../../assets/icons/star.svg";
import starFill from "../../assets/icons/star-fill.svg";

const nannyModel = {
  id: null,
  availabity: false,
  hourly_rate: null,
  bio: null,
  verified: false,
  user: null,
  docs: null,
  reviews: [],
};

const NannyDetail = () => {
  const [formData, setFormData] = useState(nannyModel);

  const { id } = useParams();

  async function fetchNannyDetails() {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/nanny/${id}/`)
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            setFormData(response.data);
          }
        });
    } catch (_) {}
  }

  async function onSuspendAction() {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/suspend_action/`, {
          user_id: formData.user?.id,
          suspend: !formData.user?.suspended,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            setFormData({
              ...formData,
              user: { ...formData.user, suspended: !formData.user?.suspended },
            });
          }
        });
    } catch (_) {}
  }

  async function verifyNanny() {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/verify_nanny/`, {
          nanny_id: formData.id,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            setFormData({
              ...formData,
              verified: true,
            });
          }
        });
    } catch (_) {}
  }

  useEffect(() => {
    fetchNannyDetails();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="nanny_detail_container profile">
      <Form>
        <div className="avatar">
          {formData.user?.image ? (
            <img
              src={`${process.env.REACT_APP_API_URL}${formData.user?.image}`}
              name="current-image"
              alt=""
            />
          ) : (
            <img src={defaultImage} name="current-image" alt="" />
          )}
        </div>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Available"
          checked={formData.availabity}
          disabled
        />

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            First Name
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="first_name"
              disabled
              maxLength={64}
              value={formData.user?.first_name}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter First Name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Last Name
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="last_name"
              disabled
              maxLength={64}
              value={formData.user?.last_name}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Last Name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Email
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="email"
              disabled
              maxLength={64}
              value={formData.user?.email}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a Valid Email Address
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Phone Number
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="phone_number"
              disabled
              maxLength={15}
              value={formData.user?.phone_number}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter A Valid Phone Number.
            </Form.Control.Feedback>
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
              value={formData.user?.location?.address}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              Please Specify Your Location.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Town
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="town"
              maxLength={32}
              value={formData.user?.location?.town}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Nearest Town.
            </Form.Control.Feedback>
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
              value={formData.user?.location?.county}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your County.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Hourly Rate
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="number"
              name="hourly_rate"
              disabled
              maxLength={4}
              value={formData.hourly_rate}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Bio
          </Form.Label>

          <Col sm="7">
            <textarea
              placeholder="Bio ..."
              disabled
              name="bio"
              className="form-control"
              rows={5}
              value={formData.bio}
            ></textarea>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            ID Front
          </Form.Label>

          <Col sm="7">{formData.docs?.id_front}</Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            ID Back
          </Form.Label>

          <Col sm="7">{formData.docs?.id_back}</Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Certification
          </Form.Label>
          <Col sm="7">{formData.docs?.cert}</Col>
        </Form.Group>

        <Row>
          <Col sm="4">Reviews</Col>
          <Col sm="7">
            <div className="nanny_detail_reviews">
              {formData.reviews.map((review, index) => {
                return (
                  <div key={index} className="nanny_detail_review">
                    <div> {review.review} </div>
                    <div className="nanny_detail_review_rating">
                      {[1, 2, 3, 4, 5].map((e, i) => (
                        <span key={i} className="star-rating">
                          <img
                            src={i + 1 <= review.rating ? starFill : star}
                            alt="bootstrap"
                            width="25"
                            height="25"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>

        <div className="nanny_detail_actions">
          <Button
            className="form-submit-btn"
            variant="primary"
            disabled={formData.verified}
            onClick={() => verifyNanny()}
          >
            Verify
          </Button>
          <Button
            className="form-submit-btn"
            variant="warning"
            onClick={() => onSuspendAction()}
          >
            {formData.user?.suspended ? "Un-Suspend" : "Suspend"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NannyDetail;
