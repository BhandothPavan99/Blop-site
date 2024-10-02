import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";
function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.passWord) {
      return dispatch(signInFailure("All fields are required...!"));
    }
    try {
      dispatch(signInStart());
      const result = await fetch("/api/signin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (result.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex max-w-3xl p-3 mx-auto flex-col md:flex-row md:items-center">
        <div className=" flex-1">
          <Link className="font-bold dark:text-white text-4xl">
            <span className="bg-gradient-to-r from-[#283E51]  to-[#4B79A1] text-white px-3 py-1 rounded-lg font-sans">
              Pavan's
            </span>
            Insights
          </Link>
          <p className="text-sm mt-5  font-serif text-wrap text-gray-600 dark:text-white">
            Join me as I explore new ideas and provide fresh perspectives on
            topics that inspire me
          </p>
        </div>
        <div className="flex-1 md:ml-8">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="">
              <Label value=" Your Email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleFormData}
              />
            </div>
            <div className="">
              <Label value=" Your Password" />
              <TextInput
                type="password"
                placeholder="password"
                id="passWord"
                onChange={handleFormData}
              />
            </div>
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-3 text-sm">
            <span>Dont Have an account?</span>
            <Link to={"/sign-up"} className="text-green-600 font-semibold">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
