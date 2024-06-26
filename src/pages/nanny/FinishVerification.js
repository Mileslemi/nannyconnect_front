import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../store/user/UserActions";

const FinishVerification = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id_front: null,
    id_back: null,
    cert: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/upload_nanny_form/`,
          {
            ...formData,
            nanny_id: user?.nanny?.id,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            //on success
            dispatch(loadUser({ isNanny: true }));
          }
        });
    } catch (_) {}
  }

  return (
    <div className="uploadForm">
      {user?.nanny?.verified ? (
        <p style={{ color: "green" }}>
          {" "}
          <b> Already Verified </b>
        </p>
      ) : user?.nanny?.docs !== null ? (
        <p style={{ color: "red" }}>Awaiting verification...</p>
      ) : (
        <></>
      )}
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            ID Front
          </Form.Label>

          <Col sm="7">
            <input
              type="file"
              name="id_front"
              required
              className="form-control"
              accept="image/jpeg,image/jpg,image/png"
              onChange={(e) =>
                setFormData({ ...formData, id_front: e.target.files[0] })
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            ID Back
          </Form.Label>

          <Col sm="7">
            <input
              type="file"
              name="id_back"
              required
              className="form-control"
              accept="image/jpeg,image/jpg,image/png"
              onChange={(e) =>
                setFormData({ ...formData, id_back: e.target.files[0] })
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Certification
          </Form.Label>
          <Col sm="7">
            <input
              type="file"
              name="cert"
              required
              className="form-control"
              accept="application/pdf,application/word"
              onChange={(e) =>
                setFormData({ ...formData, cert: e.target.files[0] })
              }
            />
          </Col>
        </Form.Group>
        <Button
          type="submit"
          variant="info"
          disabled={user?.nanny?.docs !== null || user?.nanny?.verified}
        >
          Upload
        </Button>
      </Form>
    </div>
  );
};

export default FinishVerification;
