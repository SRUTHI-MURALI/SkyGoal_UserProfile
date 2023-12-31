import React, { useEffect, useState } from "react";
import { Card, Container, Row, Form, Col, Button } from "react-bootstrap";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editProfile, getUserProfile } from "../AxiosConfig/AxiosConfig";

// eslint-disable-next-line react/prop-types
function EditProfile({ user, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const getProfileData = async (id) => {
      try {
        const response = await getUserProfile(id);
        const profile = response.data.user;

        setName(profile[0]?.name || "");
        setEmail(profile[0]?.email || "");
        setPassword(profile[0]?.password || "");
        setGender(profile[0]?.gender || "");
        setPhone(profile[0]?.phone || "");
        setAge(profile[0]?.age || "");
        setCountry(profile[0]?.country || "");
        console.log(name, "name");
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData(user);
  }, []);

  const handleEditUserProfile = async (e) => {
    e.preventDefault();

    const namePattern = /^[A-Za-z\s.]+$/;
    if (name === "") {
      setName("No Name");
    } else {
      if (!namePattern.test(name)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }
    if (gender === "") {
      setGender("No Gender");
    } else {
      if (!namePattern.test(gender)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }
    if (country === "") {
      setCountry("No Country");
    } else {
      if (!namePattern.test(country)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }
    if (age === "") {
      setAge("No Age");
    }
    if (phone === "") {
      setPhone("No number");
    }
    if (email === "") {
      setEmail("No Mail");
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.trim())) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    try {
      await editProfile(
        user,
        name,
        phone,
        email,
        password,
        gender,
        age,
        country
      );
      toast.success("successfully edited");
      onClose(false);
    } catch (error) {
      return;
    }
  };

  const handleClose = () => {
    toast.success("successfully closed edit page");
    onClose(false);
  };

  console.log(name, "jj");

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Container className="m-5 ">
        <Col
          md={12}
          className="justify-content-center align-items-center text-center"
        >
          <h1>Edit Your Profile </h1>
        </Col>

        <Card className="m-5">
          <Container className="m-3">
            <Row>
              <Col>
                <Form onSubmit={handleEditUserProfile}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                      Name:
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        placeholder={name}
                        value={name}
                        onChange={(e) => {
                          const trimmedName = e.target.value.trim();
                          setName(trimmedName);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                      Email :
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="email"
                        placeholder={email}
                        value={email}
                        onChange={(e) => {
                          const trimmedEmail = e.target.value.trim();
                          setEmail(trimmedEmail);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                      Phone
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="number"
                        placeholder={phone}
                        value={phone}
                        onChange={(e) => {
                          const trimmedPhone = e.target.value.trim();
                          setPhone(trimmedPhone);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                      Gender
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        placeholder={gender}
                        value={gender}
                        onChange={(e) => {
                          const trimmedGender = e.target.value.trim();

                          setGender(trimmedGender);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                      Age
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="number"
                        placeholder={age}
                        value={age}
                        onChange={(e) => {
                          const trimmedAge = e.target.value.trim();
                          setAge(trimmedAge);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                      Country
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        placeholder={country}
                        value={country}
                        onChange={(e) => {
                          const trimmedCountry = e.target.value.trim();
                          setCountry(trimmedCountry);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Row>
                    <Col xs={12} md={6}>
                      <Button type="submit" style={{ float: "right" }}>
                        Submit
                      </Button>
                    </Col>
                    <Col xs={12} md={6}>
                      <Button onClick={handleClose}>Exit</Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card>
      </Container>
    </>
  );
}

export default EditProfile;
