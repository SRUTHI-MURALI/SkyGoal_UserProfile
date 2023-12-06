import React, { useEffect, useState } from 'react';
import { Image_Url, image_upload_url } from '../../../Config/Config';
import axios from 'axios';
import pic from "../../assets/images.jpeg";
import { Form, Button, Row, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProfileImage, getUserProfile } from '../AxiosConfig/AxiosConfig';
import { useNavigate } from 'react-router-dom';

function EditImage() {
  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;
  const [image, setImage] = useState(null);
  const [cloudinaryURL, setCloudinaryURL] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const getProfileData = async (id) => {
      try {
        const response = await getUserProfile(id);
        const profile = response.data.user;
      
        setExistingImage(profile[0]?.photo || '');
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData(parseData?._id);
  }, []);

  const navigate = useNavigate();

  const handleEditUserImage = async (e) => {
    e.preventDefault();
    if (image) {
        const allowedFormats = ["image/jpeg", "image/png"];
        if (!allowedFormats.includes(image.type)) {
          toast.error("Invalid image format. Please select a JPEG or PNG image.");
          return;
        }else{
            try {
                await imageHandler();
              } catch (error) {
                console.error( error);
                return;
              }
        }
      }else if(existingImage) {
        setPhoto(existingImage);
      } else {
        setPhoto('No Pic');
      }
   

    try {
      if (photo) {
        await editProfileImage(parseData?._id,photo);
        toast.success('Successfully edited');
        navigate('/homePage');
      }
    } catch (error) {
      console.error('Error editing profile image:', error);
    }
  };

  const imageHandler = async () => {
   
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'noteImage');
      formData.append('cloud_name', 'dnkc0odiw');

      const response = await axios.post(`${image_upload_url}`, formData);
      setCloudinaryURL(response.data.public_id);
      setPhoto(response.data.public_id);
      
    } catch (err) {
      console.error('Error handling image:', err);
      throw err;
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Container className="d-flex align-items-center justify-content-center">
  <Row className="d-flex justify-content-center align-items-center" style={{ width: '30rem' }}>
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label className="m-5"></Form.Label>
      <div className=" d-flex align-items-center justify-content-center">
        {existingImage ? (
          <img
            style={{ width: "200px", height: "240px" }}
            src={`${Image_Url}/${existingImage}`}
            alt="profile"
            className="rounded-circle"
          />
        ) : (
          <img
            style={{ width: "200px" }}
            src={pic}
            alt="default"
            className="rounded-circle"
          />
        )}
      </div>
      <div>
        <Form.Control
          className="mt-5"
          type="file"
          onChange={(e) => {
            const inputElement = e.target;
            if (inputElement && inputElement.files) {
              const selectedFile = inputElement.files[0];
              setImage(selectedFile);
            }
          }}
        />
      </div>
    </Form.Group>

    <Button onClick={handleEditUserImage}>Submit Image</Button>
  </Row>
</Container>

    </div>
  );
}

export default EditImage;
