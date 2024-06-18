import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user/UserSlice";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#">Nanny Connect</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isAuthenticated ? (
            <>
              <Navbar.Text> {user["username"]}</Navbar.Text>
              <Navbar.Text>
                Logged in as{" "}
                {user["user_type"] === "nanny" ? "Nanny" : "Family"}{" "}
              </Navbar.Text>
            </>
          ) : (
            <></>
          )}
          <Navbar.Text>
            {isAuthenticated ? (
              <Button
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Logout
              </Button>
            ) : (
              <></>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
