import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Families = () => {
  const isStaff = useSelector((state) => state.user?.user?.is_staff);

  const [familiesList, setFamiliesList] = useState([]);

  async function fetchFamilies() {
    if (isStaff) {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/get_families/`)
          .catch((_) => {})
          .then((response) => {
            if (response && response.status === 200) {
              setFamiliesList(response.data);
            }
          });
      } catch (_) {}
    } else {
      setFamiliesList([]);
    }
  }

  useEffect(() => {
    fetchFamilies();
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
          {familiesList.map((e, i) => {
            // const start_time =  new Date(e.start_time).toString();
            return (
              <tr key={i}>
                <td>{e?.id}</td>
                <td>{e?.first_name + " " + e?.last_name}</td>
                <td>{e?.email}</td>
                <td>{e?.phone_number}</td>

                <td>{e?.suspended ? "False" : "True"}</td>
                <td>
                  <Link as={Button} to={`/dashboard_admin/families/${e.id}`}>
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

export default Families;
