import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../assets/images/defaultprofilelady.jpg";
import axios from "axios";
import { loadUser } from "../../store/user/UserActions";

const nannyModel = {
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
  nanny: {
    id: null,
    availabity: false,
    hourly_rate: 0.0,
  },
  image: null,
};

const Profile = () => {
  const [formValidated, setFormValidated] = useState(false);

  const { user } = useSelector((state) => state.user);

  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState(nannyModel);

  const [newImage, setNewImage] = useState(null);

  const dispatch = useDispatch();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  function handleFileChange(e) {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
      setNewImage(e.target.files[0]);
    }
  }

  async function handleSubmit(e) {
    setUpdating(true);
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFormValidated(true);
      window.scrollTo(0, 0);
    } else {
      // update location

      await axios.put(
        `${process.env.REACT_APP_API_URL}/address/${formData.location.id}/`,
        { ...formData.location }
      );
      // update nanny
      await axios.put(
        `${process.env.REACT_APP_API_URL}/nanny/${formData.nanny.id}/`,
        { ...formData.nanny }
      );
      // update user

      if (newImage != null) {
        setFormData({ ...formData, image: newImage });
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}/${formData.username}/`,
        { ...formData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(loadUser({ isNanny: true }));
    }
    setUpdating(false);
  }

  useEffect(() => {
    if ((user !== null ? user["user_type"] : "") === "nanny") {
      setFormData({ ...nannyModel, ...user });
    }
  }, [user]);

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
            <img src={`${formData.image}`} name="current-image" alt="" />
          ) : (
            <img src={defaultImage} name="current-image" alt="" />
          )}
        </div>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Available"
          checked={formData.nanny.availabity}
          onChange={(e) =>
            setFormData({
              ...formData,
              nanny: { ...formData.nanny, availabity: e.target.checked },
            })
          }
        />
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
              value={formData.first_name}
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
              value={formData.last_name}
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
              value={formData.email}
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
              value={formData.phone_number}
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
              value={formData.username}
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
              value={formData.location.address}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, address: e.target.value },
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
              value={formData.location.town}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, town: e.target.value },
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
              value={formData.location.county}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, county: e.target.value },
                })
              }
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
              maxLength={4}
              value={formData.nanny.hourly_rate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nanny: { ...formData.nanny, hourly_rate: e.target.value },
                })
              }
            />
          </Col>
        </Form.Group>

        <Button
          disabled={updating}
          className="form-submit-btn"
          variant="primary"
          type="submit"
        >
          {updating ? "Updating...." : "Update"}
        </Button>
      </Form>
    </div>
  );
};

export default Profile;
