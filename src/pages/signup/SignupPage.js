import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create_address, sign_up } from "../../store/user/UserActions";

const SignupPage = () => {
  const [formValidated, setFormValidated] = useState(false);

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: {
      address: "",
      town: "",
      county: "",
    },
  });

  const {
    username,
    email,
    password,
    re_password,
    first_name,
    last_name,
    phone_number,
    address,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFormValidated(true);
      window.scrollTo(0, 0);
    } else {
      if (password === re_password) {
        setFormValidated(false);

        dispatch(create_address(address)).then((response) => {
          if (response.payload) {
            const locale = response.payload;
            dispatch(
              sign_up({
                first_name: first_name,
                last_name: last_name,
                username: username,
                phone_number: phone_number,
                email: email,
                password: password,
                re_password: re_password,
                location: locale["id"],
                user_type: "family",
              })
            ).then((response) => {
              window.scrollTo(0, 0);

              if (response.payload) {
                navigate("/");
              }
            });
          }
        });
      } else {
        window.scrollTo(0, 150);
      }
    }
  }
  return (
    <div className="authpage">
      <Container>
        <Row>
          <Col sm={4} className="authform signupForm">
            {error && (
              <Alert variant="danger" autoFocus={true}>
                <Alert.Heading>{error}</Alert.Heading>
              </Alert>
            )}
            <h3>Sign Up</h3>
            <p>
              Nannies, use our{" "}
              <a href="/signup_nanny">Nanny Registration Form</a>
            </p>
            <Form
              noValidate
              validated={formValidated}
              onSubmit={(e) => handleSubmit(e)}
            >
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
                  Password
                </Form.Label>

                <Col sm="7">
                  <Form.Control
                    type="password"
                    name="password"
                    minLength={6}
                    required
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {password.length < 1
                      ? "Please Enter A Password."
                      : "Pasword Not less that Six Characters"}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Re-Password
                </Form.Label>

                <Col sm="7">
                  <Form.Control
                    type="password"
                    name="re_password"
                    isInvalid={password !== re_password}
                    className={
                      password.length > 0
                        ? password === re_password
                          ? "custom-validate-class-valid"
                          : "me-2  custom-validate-class-invalid"
                        : ""
                    }
                    required
                    value={re_password}
                    onChange={(e) => onChange(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {re_password.length < 1
                      ? "Please Confirm Password."
                      : "Password Should Match"}
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
              <Button
                className="form-submit-btn"
                variant="primary"
                type="submit"
              >
                {loading ? "Signing Up...." : "Sign Up"}
              </Button>
            </Form>
            <p>
              Already Have An Account? <a href="/">LogIn</a>{" "}
            </p>
          </Col>
          <Col sm={8} className="auth-Image">
            <div className="overlay">
              <h4>
                Revolutionizing the way families access childcare services.
              </h4>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;
