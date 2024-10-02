import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiUserGroup, HiCollection, HiAnnotation, HiChartBar, HiDocument } from "react-icons/hi";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function DashSlidebar() {
  const [tab, setTab] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const {currentuser} = useSelector((state) => state.user)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
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
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col">
          <Link to={"/dashboard?tab=profile"}>
            <SidebarItem
              active={tab === "profile"}
              icon={HiUser}
              label={currentuser.isAdmin ? 'Admin' : 'User'}
              labelColor="dark"
              as="div"
            >
              Profile
            </SidebarItem>
          </Link>
          {currentuser.isAdmin && (
            <Link to={"/dashboard?tab=dashboard"}>
            <SidebarItem
              active={tab === "dashboard" || !tab}
              icon={HiChartBar}
              labelColor="dark"
              as="div"
            >
              Dashboard
            </SidebarItem>
          </Link>
          )}
          {currentuser.isAdmin && (
            <Link to={"/dashboard?tab=posts"}>
            <SidebarItem
              active={tab === "Posts"}
              icon={HiDocumentText}
              labelColor='dark'
              as="div"
            >
              Posts
            </SidebarItem>
          </Link>
          )}
          {currentuser.isAdmin && (
            <Link to={"/dashboard?tab=users"}>
            <SidebarItem
              active={tab === "users"}
              icon={HiUserGroup}
              labelColor="dark"
              as="div"
            >
             Users
            </SidebarItem>
          </Link>
          )}
          {currentuser.isAdmin && (
            <Link to={"/dashboard?tab=comments"}>
            <SidebarItem
              active={tab === "comments"}
              icon={HiAnnotation}
              labelColor="dark"
              as="div"
            >
             Comments
            </SidebarItem>
          </Link>
          )}
          <SidebarItem
            icon={HiArrowSmRight}
            className="cursor-pointer font-semibold hover:text-red-600 hover:font-semibold"
            onClick={haldleSignOut}
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

export default DashSlidebar;
