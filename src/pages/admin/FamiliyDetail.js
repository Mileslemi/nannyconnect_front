import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import defaultImage from "../../assets/images/defaultprofilelady.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";

const familyModel = {
  id: null,
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  location: {
    id: null,
    address: "",
    town: "",
    county: "",
  },
  image: null,
  suspended: false,
};

const FamiliyDetail = () => {
  const [formData, setFormData] = useState(familyModel);

  const { username } = useParams();

  async function fetchFamilyDetails() {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/get_family/${username}/`)
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            setFormData(response.data);
          }
        });
    } catch (_) {}
  }

  async function onSuspendAction() {
    console.log("cl");
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/suspend_action/`, {
          user_id: formData.id,
          suspend: !formData.suspended,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            setFormData(response.data);
          }
        });
    } catch (_) {}
  }

  useEffect(() => {
    fetchFamilyDetails();
    // eslint-disable-next-line
  }, [username]);

  return (
    <div className="profile">
      <Form>
        <div className="avatar">
          {formData.image ? (
            <img
              src={`${process.env.REACT_APP_API_URL}${formData.image}`}
              name="current-image"
              alt=""
            />
          ) : (
            <img src={defaultImage} name="current-image" alt="" />
          )}
        </div>

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
              value={formData.first_name}
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
              value={formData.last_name}
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
              value={formData.email}
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
              value={formData.phone_number}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter A Valid Phone Number.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Username
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="username"
              disabled
              maxLength={64}
              value={formData.username}
            />

            <Form.Control.Feedback type="invalid">
              Please Enter Username.
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
              value={formData.location.address}
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
              value={formData.location.town}
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
              value={formData.location.county}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your County.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button
          className="form-submit-btn"
          variant="primary"
          onClick={() => onSuspendAction()}
        >
          {formData.suspended ? "Un-Suspend" : "Suspend"}
        </Button>
      </Form>
    </div>
  );
};

export default FamiliyDetail;
