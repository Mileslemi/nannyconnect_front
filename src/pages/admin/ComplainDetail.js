import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const complaintModel = {
  id: null,
  complaint: null,
  date_created_gmt: null,
  sorted: false,
  booking: null,
};

const ComplainDetail = () => {
  const [formData, setFormData] = useState(complaintModel);

  const { id } = useParams();

  async function fetchComplaintDetails() {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/complaints/${id}/`)
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
          user_id: formData.booking?.user?.id,
          suspend: true,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            fetchComplaintDetails();
          }
        });
    } catch (_) {}
  }

  async function markAsSorted() {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/mark_as_sorted/`, {
          complaint_id: formData.id,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            fetchComplaintDetails();
          }
        });
    } catch (_) {}
  }

  useEffect(() => {
    fetchComplaintDetails();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="profile">
      <Form>
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
                formData.booking?.nanny?.user?.first_name +
                " " +
                formData.booking?.nanny?.user?.last_name
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter First Name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Family
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="last_name"
              disabled
              maxLength={64}
              value={
                formData.booking?.user?.first_name +
                " " +
                formData.booking?.user?.last_name
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Last Name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Complaint
          </Form.Label>

          <Col sm="7">
            <textarea
              placeholder="...."
              name="complaint"
              className="form-control"
              disabled
              value={formData.complaint}
              rows={4}
            ></textarea>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Booked From
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="start_time"
              disabled
              maxLength={64}
              value={formData.booking?.start_time}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Booked To
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="e"
              disabled
              maxLength={64}
              value={formData.booking?.end_time}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Paid Hourly
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="e"
              disabled
              maxLength={64}
              value={formData.booking?.negotiated_hourly_rate}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Booking Status
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              name="e"
              disabled
              maxLength={64}
              value={formData.booking?.status}
            />
          </Col>
        </Form.Group>
        <div className="complaint_detail_actions">
          <Button
            className="form-submit-btn"
            variant="primary"
            disabled={formData.booking?.user?.suspended}
            onClick={() => onSuspendAction()}
          >
            Suspend Family
          </Button>

          <Button
            className="form-submit-btn"
            variant="primary"
            disabled={formData.sorted}
            onClick={() => markAsSorted()}
          >
            Mark As Sorted
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ComplainDetail;
