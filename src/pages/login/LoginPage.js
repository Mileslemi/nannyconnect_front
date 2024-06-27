import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { loginUser } from "../../store/user/UserActions";

const LoginPage = () => {
  const [formValidated, setFormValidated] = useState(false);

  const [isNanny, setAsNanny] = useState(false);

  const dispatch = useDispatch();

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFormValidated(true);
    } else {
      setFormValidated(false);
      dispatch(loginUser({ username, password, isNanny }));
    }
  }

  if (isAuthenticated) {
    if (user["is_staff"]) {
      return <Navigate to={"/dashboard_admin"} />;
    } else {
      //   depending on if user is nanny or family redirect appopriately
      if (JSON.parse(localStorage.getItem("isNanny"))) {
        return <Navigate to={"/dashboard_nanny"} />;
      } else {
        return <Navigate to={"/dashboard"} />;
      }
    }
  }

  return (
    <div className="authpage">
      <Container>
        <Row>
          <Col sm={4} className="authform">
            {error && (
              <Alert variant="danger" autoFocus={true}>
                {error}
              </Alert>
            )}
            <h3>Login</h3>

            <p>
              Don't have an account? <a href="/signup">SignUp</a>{" "}
            </p>
            <Form
              noValidate
              validated={formValidated}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Form.Check
                inline
                label="Family"
                name="group1"
                type="radio"
                checked={!isNanny}
                onChange={(e) => setAsNanny(!e.target.checked)}
                id={`inline-radio-2`}
              />
              <Form.Check
                inline
                label="Nanny"
                checked={isNanny}
                name="group1"
                type="radio"
                onChange={(e) => setAsNanny(e.target.checked)}
                id={`inline-radio-1`}
              />
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
                    Please Enter Email Address.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Password{" "}
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Your Password.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Button
                className="form-submit-btn"
                variant="primary"
                type="submit"
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </Form>
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

export default LoginPage;
