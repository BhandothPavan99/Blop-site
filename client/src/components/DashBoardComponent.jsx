import React from "react";
import { useState, useEffect } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocument,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableHeadCell,
  TableRow,
  TableCell,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function DashBoardComponent() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentuser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/getusers?limit=6`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setLastMonthUsers(data.lastMonthUsers);
          setTotalUsers(data.totalUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/getposts?limit=6`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setLastMonthPosts(data.lastMonthPosts);
          setTotalPosts(data.totalPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments?limit=6`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setLastMonthComments(data.lastMonthComments);
          setTotalComments(data.totalComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentuser.isAdmin) {
      fetchUsers(), fetchComments(), fetchPosts();
    }
  }, [currentuser]);

  return (
    <div className="p-6 md:mx-auto">
      <div className=" flex flex-wrap gap-6 justify-center">
        <div className="flex flex-col p-3 gap-4 w-full md:w-72 rounded-md shadow-md">
          <div className="flex justify-between ">
            <div className="">
              <h3 className="text-gray-500 text-sm font-semibold">
                TOTAL USERS
              </h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-blue-500 text-white text-4xl p-2 rounded-full " />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 gap-4 w-full md:w-72 rounded-md shadow-md">
          <div className="flex justify-between ">
            <div className="">
              <h3 className="text-gray-500 text-sm font-semibold">
                TOTAL POSTS
              </h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-green-500 text-white text-4xl p-2 rounded-full " />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 gap-4 w-full md:w-72 rounded-md shadow-md">
          <div className="flex justify-between ">
            <div className="">
              <h3 className="text-gray-500 text-sm font-semibold">
                TOTAL COMMENTS
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-purple-500 text-white text-4xl p-2 rounded-full " />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="w-full flex flex-col p-2 md:w-auto shadow-md rounded-md dark:bg-gray-800">
          <div className=" flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 text-gray-500">RECENT USERS</h1>
            <Button gradientDuoTone="greenToBlue" outline size="sm">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>User image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
            </TableHead>
            {users &&
              users.map((user) => (
                <TableBody key={user._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </TableCell>
                    <TableCell>{user.userName}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
        <div className="w-full flex flex-col p-2 md:w-auto shadow-md rounded-md dark:bg-gray-800">
          <div className=" flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 text-gray-500">RECENT POSTS</h1>
            <Button gradientDuoTone="greenToBlue" outline size="sm">
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell> IMAGE</TableHeadCell>
              <TableHeadCell>TITLE</TableHeadCell>
              <TableHeadCell>category</TableHeadCell>
            </TableHead>
            {posts &&
              posts.map((post) => (
                <TableBody key={post._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>
                      <img
                        src={post.image}
                        alt=""
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="w-96">{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
        <div className="w-full flex flex-col p-2 md:w-auto shadow-md rounded-md dark:bg-gray-800">
          <div className=" flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 text-gray-500">RECENT COMMENTS</h1>
            <Button gradientDuoTone="greenToBlue" outline size="sm">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>comment</TableHeadCell>
              <TableHeadCell>likes</TableHeadCell>
            </TableHead>
            {comments &&
              comments.map((comment) => (
                <TableBody key={comment._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="w-96 line-clamp-2">
                      {comment.content}
                    </TableCell>
                    <TableCell>{comment.numberOfLikes}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
