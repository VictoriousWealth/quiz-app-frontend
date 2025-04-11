import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate(); 
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  
  return (
    <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">QuizGen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Upload</Nav.Link>
            <Nav.Link as={Link} to="/quiz">Quiz</Nav.Link>
            <Nav.Link as={Link} to="/results">Results</Nav.Link>
            <Nav.Link as={Link} to="/history">History</Nav.Link>
          </Nav>
          <Form.Switch
            id="darkModeSwitch"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            label="🌙"
            className="text-nowrap"
          />
          {localStorage.getItem("token") && (
            <Button 
              variant={darkMode ? "outline-light" : "primary"} 
              className="ms-4"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
