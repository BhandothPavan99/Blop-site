import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/Theme/themeSlice";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { signOutSuccess } from "../redux/user/userSlice";

function NavBar() {
  const path = useLocation().pathname;
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentuser } = useSelector((state) => state.user);
  const [searchTerm ,setSearchTerm] =useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])
  const haldleSignOut = async () => {
    try {
      const res = await fetch("/api/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit =(e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("searchTerm" ,searchTerm)
    const searchQuery =urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  return (
    <Navbar className="border-b-2 ">
      <Link
        to={"/"}
        className="font-semibold whitespace-nowrap sm:text-xl dark:text-white text-sm self-center "
      >
        <span className="bg-gradient-to-r from-[#283E51]  to-[#4B79A1]  text-white px-3 py-2 rounded-lg font-sans">
          Pavan's
        </span>
        Insights
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput 
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className=" hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="lg:hidden w-12 h-10" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-3 md:order-2">
        <Button
          className="sm:inline w-12 h-10 "
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentuser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar img={currentuser.profilePicture} rounded />}
          >
            <DropdownHeader>
              <span className="block text-sm">{currentuser.userName}</span>
              <span className="block text-sm font-medium truncate">
                {currentuser.email}
              </span>
            </DropdownHeader>
            <DropdownItem>
              <Link to={"/dashboard?tab=profile"} className="font-semibold">
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem
              className="font-semibold text-red-600"
              onClick={haldleSignOut}
            >
              Sign Out
            </DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <NavbarToggle />
      </div>
      <div className="flex gap-10 justify-center items-center">
        <NavbarCollapse>
          <NavbarLink active={path === "/"} as={"div"}>
            <Link to={"/"}>Home</Link>
          </NavbarLink>
        </NavbarCollapse>
        <NavbarCollapse>
          <NavbarLink active={path === "/about"} as={"div"}>
            <Link to={"/about"}>About</Link>
          </NavbarLink>
        </NavbarCollapse>
        <NavbarCollapse>
          <NavbarLink active={path === "/projects"} as={"div"}>
            <Link to={"/projects"}>Projects</Link>
          </NavbarLink>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
