import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Profile from "./Profile";
import Bookings from "./Bookings";
import RequestedBookings from "./RequestedBookings";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FinishVerification from "./FinishVerification";
import ChatsPage from "../../components/ChatsPage";
import NannySchedule from "./NannySchedule";

const NannyDashBoard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(0);

  const { pagename } = useParams();

  const navigate = useNavigate();

  if (
    !(isAuthenticated ?? false) ||
    (user !== null ? user["user_type"] : "") !== "nanny"
  ) {
    navigate("/");
  }

  const pages = [
    { name: "Bookings", rep: "bookings", page: <Bookings /> },
    { name: "Requests", rep: "requests", page: <RequestedBookings /> },
    { name: "Chats", rep: "chats", page: <ChatsPage /> },
    { name: "Schedule", rep: "schedule", page: <NannySchedule /> },
    { name: "Profile", rep: "profile", page: <Profile /> },
    {
      name: "A/C Verification",
      rep: "verify",
      page: <FinishVerification />,
    },
  ];

  const handleClick = (index, str) => {
    // setCurrentPage(index);
    navigate(`/dashboard_nanny/${str}`);
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

  // useEffect(() => {
  //   if (
  //     !(isAuthenticated ?? false) ||
  //     (user !== null ? user["user_type"] : "") !== "nanny"
  //   ) {
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line
  // }, [isAuthenticated, user]);

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

export default NannyDashBoard;
