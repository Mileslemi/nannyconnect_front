import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nannies = () => {
  const isStaff = useSelector((state) => state.user?.user?.is_staff);

  const [nanniesList, setNanniesList] = useState([]);

  async function fetchNannies() {
    if (isStaff) {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/nanny/`)
          .catch((_) => {})
          .then((response) => {
            if (response && response.status === 200) {
              setNanniesList(response.data);
            }
          });
      } catch (_) {}
    } else {
      setNanniesList([]);
    }
  }

  useEffect(() => {
    fetchNannies();
    // eslint-disable-next-line
  }, [isStaff]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Names</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {nanniesList.map((e, i) => {
            // const start_time =  new Date(e.start_time).toString();
            return (
              <tr key={i}>
                <td>{e?.id}</td>
                <td>{e?.user?.first_name + " " + e?.user?.last_name}</td>
                <td>{e?.user?.email}</td>
                <td>{e?.user?.phone_number}</td>

                <td>{!e?.verified && e?.user?.suspended ? "True" : "False"}</td>
                <td>
                  <Link as={Button} to={`/dashboard_admin/nannies/${e.id}`}>
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

export default Nannies;
