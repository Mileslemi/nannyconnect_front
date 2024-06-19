import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FamilyBookings = () => {
  const userId = useSelector((state) => state.user?.user?.id);

  const [bookings, setBookings] = useState([]);

  async function fetchBookings() {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/filter_bookings/`, {
          id: userId,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            setBookings(response.data);
          }
        });
    } catch (_) {}
  }
  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, [userId]);
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((e, i) => {
            // const start_time =  new Date(e.start_time).toString();
            return (
              <tr key={i}>
                <td>{e?.id}</td>
                <td>
                  {e?.nanny?.user?.first_name + " " + e?.nanny?.user?.last_name}
                </td>
                <td>
                  {new Date(e?.start_time).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "long",
                    hour: "2-digit",
                    hour12: false,
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td>
                  {new Date(e?.end_time).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "long",
                    hour: "2-digit",
                    hour12: false,
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td>{e?.negotiated_hourly_rate}</td>
                <td>{e?.status}</td>
                <td>
                  <Link as={Button} to={`/dashboard/requests/${e.id}`}>
                    More
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default FamilyBookings;
