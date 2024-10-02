import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.email || !formData.passWord) {
      setErrorMessage("please fill out all fields...! ");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      const result = await fetch("/api/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(
          "This username or email is already taken please use another.."
        );
      }
      setLoading(false);
      setSuccessMessage("Signup Successful...!");
      setTimeout(() => {
        navigate("/sign-in");
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
            Pavan's Insights is a blog where I share thoughts on technology and web
            development , you can SignUp
          </p>
        </div>
        <div className="flex-1 md:ml-8">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="">
              <Label value=" Your Username" />
              <TextInput
                type="text"
                placeholder="username"
                id="userName"
                onChange={handleFormData}
              />
            </div>
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
                "Sign Up"
              )}
            </Button>
              <OAuth/>
          </form>
          <div className="flex gap-2 mt-3 text-sm">
            <span>Have an account?</span>
            <Link to={"/sign-in"} className="text-green-600 font-semibold">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert className="mt-5" color="success">
              {successMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
