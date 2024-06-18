import React from "react";
import { Table } from "react-bootstrap";

const FamilyBookings = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nanny</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Hourly Rate (Ksh)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Jeniffer Something</td>
            <td>24th June 2024 10:00a.m.</td>
            <td>24th June 2024 18:00p.m.</td>
            <td>200</td>
            <td>Done</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default FamilyBookings;
