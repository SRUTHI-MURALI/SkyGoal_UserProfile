import React, { useState, useEffect } from "react";
import "./Profile.css";
import pic from "../../assets/images.jpeg";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "../EditProfile/EditProfile.jsx";
import { getUserProfile } from "../AxiosConfig/AxiosConfig.jsx";
import { Image_Url } from "../../../Config/Config.jsx";

const Body = () => {
  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  const [user, setUser] = useState([null]);
  const [showEdit, setShowEdit] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const getProfileData = async (id) => {
      try {
        const response = await getUserProfile(id);
        setUser(response.data.user);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData(parseData._id);
  }, [showEdit]);

  const handleImage = async () => {
    navigate("/editImage");
  };

  const handleEditUserProfile = async () => {
    setShowEdit(true);
  };

  const handleClose = async () => {
    setShowEdit(false);
  };

  return (
    <Container className="bodyContainer">
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      {!showEdit ? (
        <>
          <div className="col-lg-12">
            <div className="row mt-3">
              <div className="col-md-3">
                {user[0]?.photo && user[0]?.photo !== "No Pic" ? (
                  <img
                    style={{ width: "200px" }}
                    src={`${Image_Url}/${user[0]?.photo}`}
                    alt="profile"
                    className="rounded-circle"
                  />
                ) : (
                  <img
                    style={{ width: "200px", height: "240px" }}
                    src={pic}
                    className="rounded-circle"
                    alt="default"
                  />
                )}
                <div>
                  <Button
                    style={{ alignContent: "center" }}
                    variant="none"
                    onClick={handleImage}
                  >
                    Change Image
                  </Button>
                </div>
              </div>

              <div className="col-lg-6">
                <p
                  style={{
                    color: "#5B5B5B",
                    fontFamily: "Open Sans sans-serif",
                  }}
                >
                  <h4>Name : {user[0]?.name}</h4>
                  <h4>Gender : {user[0]?.gender}</h4>
                  <h4>Age : {user[0]?.age}</h4>
                  <h4>Country : {user[0]?.country}</h4>
                  <h4>Phone : {user[0]?.phone}</h4>
                  <h4>Email : {user[0]?.email}</h4>
                </p>
              </div>
              <div className="col-lg-2">
                <Button onClick={handleEditUserProfile}>Update Profile</Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EditProfile onClose={handleClose} user={user[0]?._id} />
      )}
    </Container>
  );
};

export default Body;
