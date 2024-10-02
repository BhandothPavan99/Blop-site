import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserfailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function DashProfile() {
  const { currentuser, error ,loading } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadProgressError, setImageFileUploadProgressError] =
    useState(null);
  const [profileImageUploading, setProfileImageUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccesss] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModel, setShowModel] = useState(false);
  const imageRef = useRef();
  const dispatch = useDispatch();

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 2 * 1024 * 1024;

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setImageFileUploadProgressError(
          "Invalid file type. Only JPEG, PNG, and GIF are allowed."
        );
        return;
      }

      if (file.size > maxSizeInBytes) {
        setImageFileUploadProgressError("File size should be less than 2MB.");
        return;
      }

      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
      setImageFileUploadProgressError(null);
    }
  };

  useEffect(() => {
    if (profileImage) {
      uploadImage();
    }
  }, [profileImage]);

  const uploadImage = async () => {
    setProfileImageUploading(true);
    setImageFileUploadProgressError(null);
    const storage = getStorage(app);
    const fileName = new Date().getDate() + profileImage.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, profileImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadProgressError(
          "Image not uploaded (image should be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setProfileImage(null);
        setProfileImageUrl(null);
        profileImageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfileImageUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploadProgress(null);
          setProfileImageUploading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccesss(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes found...");
      return;
    }
    if (profileImageUploading) {
      setUpdateUserError("Please wait your file is uploading...");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/update/${currentuser._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccesss("User's profile is successfully updated...");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/delete/${currentuser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserfailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserfailure(error.message));
    }
  };
  const haldleSignOut =async()=>{
    try {
      const res =await fetch("/api/signout" ,{
        method:"POST"
      })
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        
      } else {
        dispatch(signOutSuccess())
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="text-center text-3xl my-5 font-bold">Profile</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleProfileImage}
        ref={imageRef}
        hidden
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => imageRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={3}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}

          <img
            src={profileImageUrl || currentuser.profilePicture}
            alt=""
            className={`w-full h-full rounded-full object-cover border-8 border-[white] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-50"
            }`}
          />
        </div>
        {imageFileUploadProgressError && (
          <Alert color="failure">{imageFileUploadProgressError}</Alert>
        )}
        <TextInput
          type="text"
          id="userName"
          placeholder="username..."
          defaultValue={currentuser.userName}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="name@gmail.com"
          defaultValue={currentuser.email}
          onChange={handleChange}
        />
        <TextInput type="password" id="passWord" placeholder="password" onChange={handleChange} />
        <Button onClick={handleSubmit} outline gradientDuoTone="greenToBlue" disabled={loading ||profileImageUploading}>
          Update
        </Button>
        {
          currentuser.isAdmin && (
            <Link to={"/create-post"}>
              <Button type="button" className="w-full" gradientDuoTone="pinkToOrange">
                create a post
              </Button>
            </Link>
          )
        }
      </form>
      <div className="flex justify-between text-sm  font-semibold cursor-pointer mt-2">
        <span onClick={() => setShowModel(true)} className=" hover:underline">
          Delete account?
        </span>
        <span className=" hover:underline" onClick={haldleSignOut}>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-2">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-2">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-2">
          {error}
        </Alert>
      )}
      <Modal
        show={showModel}
        popup
        onClick={() => setShowModel(false)}
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className=" text-center">
            <HiOutlineExclamationCircle className="mx-auto h-12 w-12 cursor-pointer mb-4" />
            <h3 className="font-semibold ">
              Are you sure you want to delete your account ?
            </h3>
            <div className="flex justify-between mt-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I am sure
              </Button>
              <Button color="success" onClick={() => setShowModel(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DashProfile;
