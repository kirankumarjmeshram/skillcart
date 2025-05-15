import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Container,
  Badge,
  Spinner,
  Alert,
  ListGroup,
} from "react-bootstrap";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">User not found or not logged in.</Alert>
      </Container>
    );
  }

  const isCreator = profile.role === "creator";

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4">
        <Row>
          <Col md={4} className="text-center">
            <div
              className="mx-auto mb-3"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                backgroundColor: "#ddd",
                backgroundImage: "url('https://via.placeholder.com/150')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <h5>{profile.name}</h5>
            <p className="text-muted mb-0">{profile.email}</p>
            <Badge
              bg={isCreator ? "success" : "info"}
              className="mt-2 text-capitalize"
            >
              {profile.role}
            </Badge>
          </Col>

          <Col md={8}>
            <h4 className="mb-3">Profile Info</h4>

            {isCreator ? (
              <>
                <h5>Created Courses</h5>
                {profile.courses && profile.courses.length > 0 ? (
                  <ListGroup variant="flush">
                    {profile.courses.map((course, index) => (
                      <ListGroup.Item key={index}>
                        <strong>{course.title}</strong> <br />
                        <small className="text-muted">{course.description}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="text-muted">No courses created yet.</p>
                )}
              </>
            ) : (
              <>
                <p>
                  <strong>XP:</strong> {profile.xp || 0}
                </p>

                <h5 className="mt-4">Badges</h5>
                {profile.badges && profile.badges.length > 0 ? (
                  profile.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      bg="warning"
                      text="dark"
                      className="me-2 mb-2"
                    >
                      {badge}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted">No badges yet</p>
                )}
              </>
            )}

            {profile.createdAt && (
              <p className="text-muted mt-4">
                Member since {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProfilePage;
