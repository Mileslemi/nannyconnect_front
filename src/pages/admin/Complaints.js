import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Complaints = () => {
  const isStaff = useSelector((state) => state.user?.user?.is_staff);

  const [complaintsList, setcomplaintsList] = useState([]);

  async function fetchcomplaints() {
    if (isStaff) {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/complaints/`)
          .catch((_) => {})
          .then((response) => {
            if (response && response.status === 200) {
              setcomplaintsList(response.data);
            }
          });
      } catch (_) {}
    } else {
      setcomplaintsList([]);
    }
  }

  useEffect(() => {
    fetchcomplaints();
    // eslint-disable-next-line
  }, [isStaff]);

  return (
    <div className="complaint_div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date Created</th>
            <th>Complaint</th>
            <th>Sorted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaintsList.map((e, i) => {
            // const start_time =  new Date(e.start_time).toString();
            return (
              <tr key={i}>
                <td>{e?.id}</td>
                <td>
                  {new Date(e?.date_created_gmt).toLocaleDateString(undefined, {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "short",
                    hour: "2-digit",
                    hour12: true,
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  {" "}
                  <p>{e?.complaint}</p>{" "}
                </td>

                <td>{e?.sorted ? "True" : "False"}</td>
                <td>
                  <Link as={Button} to={`/dashboard_admin/complaints/${e.id}`}>
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

export default Complaints;
