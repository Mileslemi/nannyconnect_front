import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import defaultImage from "../../assets/images/defaultprofilelady.jpg";

const FamilyProfile = () => {
  const [formValidated, setFormValidated] = useState(false);

  const { loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: {
      address: "",
      town: "",
      county: "",
    },
    image: null,
  });

  const {
    username,
    email,
    first_name,
    last_name,
    phone_number,
    address,
    image,
  } = formData;

  const [newImage, setNewImage] = useState(null);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  function handleFileChange(e) {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
      setNewImage(e.target.files[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFormValidated(true);
      window.scrollTo(0, 0);
    } else {
    }
  }
  return (
    <div className="profile">
      <Form
        noValidate
        validated={formValidated}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="avatar">
          {newImage ? (
            <img
              src={URL.createObjectURL(newImage)}
              name="current-image"
              alt=""
            />
          ) : formData.image ? (
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
            Edit Image
          </Form.Label>

          <Col sm="7">
            <input
              type="file"
              name="svg-image"
              className="form-control"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            First Name
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="first_name"
              required
              maxLength={64}
              value={first_name}
              onChange={(e) => onChange(e)}
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
              required
              maxLength={64}
              value={last_name}
              onChange={(e) => onChange(e)}
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
              required
              disabled
              maxLength={64}
              value={email}
              onChange={(e) => onChange(e)}
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
              required
              maxLength={15}
              value={phone_number}
              onChange={(e) => onChange(e)}
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
              required
              disabled
              maxLength={64}
              value={username}
              onChange={(e) => onChange(e)}
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
              value={address.address}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...address, address: e.target.value },
                })
              }
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
              value={address.town}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...address, town: e.target.value },
                })
              }
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
              value={address.county}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...address, county: e.target.value },
                })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your County.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button className="form-submit-btn" variant="primary" type="submit">
          {loading ? "Updating...." : "Update"}
        </Button>
      </Form>
    </div>
  );
};

export default FamilyProfile;
