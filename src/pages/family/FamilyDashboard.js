import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import FamilyProfile from "./FamilyProfile";
import FamilyBookings from "./FamilyBookings";
import BookNanny from "./BookNanny/BookNanny";
import { useSelector } from "react-redux";

const FamilyDashboard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(0);

  const { pagename } = useParams();

  const navigate = useNavigate();

  const pages = [
    { name: "Bookings", rep: "bookings", page: <FamilyBookings /> },
    { name: "Book Nanny", rep: "booknanny", page: <BookNanny /> },
    { name: "Profile", rep: "profile", page: <FamilyProfile /> },
  ];

  const handleClick = (index, str) => {
    // setCurrentPage(index);
    navigate(`/dashboard/${str}`);
  };

  useEffect(() => {
    if (pagename) {
      let index = pages.findIndex((v) => {
        return v.rep === pagename.toLowerCase();
      });
      if (index === -1) {
        setCurrentPage(0);
      } else {
        setCurrentPage(index);
      }
    }
    // eslint-disable-next-line
  }, [pagename]);

  useEffect(() => {
    if (
      !(isAuthenticated ?? false) ||
      (user !== null ? user["user_type"] : "") !== "family"
    ) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, user]);

  return (
    <div className="dashboard">
      <Container>
        <Row>
          <Col sm="3" className="dashboard-nav">
            {pages.map((ele, index) => {
              return (
                <Button
                  key={index}
                  size="lg"
                  onClick={() => handleClick(index, ele.rep)}
                  style={{
                    color: index === currentPage ? "black" : "grey",
                    backgroundColor:
                      index === currentPage ? "#e2e1e1" : "transparent",
                  }}
                >
                  {ele.name}
                </Button>
              );
            })}
          </Col>

          <Col sm="8">{pages[currentPage].page}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default FamilyDashboard;
