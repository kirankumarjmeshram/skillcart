import React from "react";
import { Nav, Navbar as BSNavbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BSNavbar.Brand href="/">SkillKart</BSNavbar.Brand>
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              <Nav.Link as={Link} to="/creator/dashboard">Creator Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/learner/dashboard">Learner Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/creator/profile">Profile</Nav.Link>
              <Nav.Link onClick={() => localStorage.removeItem("token")}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
