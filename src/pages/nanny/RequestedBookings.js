import React from "react";
import { Button, Table } from "react-bootstrap";

const RequestedBookings = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Family</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Hourly Rate (Ksh)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark Otto</td>
            <td>24th June 2024 10:00a.m.</td>
            <td>24th June 2024 18:00p.m.</td>
            <td>200</td>
            <td>
              <Button>Accept</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default RequestedBookings;
