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
        <Navbar.Brand
          href={
            isAuthenticated
              ? user.is_staff
                ? "/dashboard_admin"
                : user?.user_type === "nanny"
                ? "/dashboard_nanny"
                : "/dashboard"
              : "/"
          }
        >
          Tender Ties
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isAuthenticated ? (
            <>
              <Navbar.Text> {user["username"]}</Navbar.Text>
              <Navbar.Text>
                Logged in as{" "}
                {user["is_staff"]
                  ? "Admin"
                  : user["user_type"] === "nanny"
                  ? "Nanny"
                  : "Family"}{" "}
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
