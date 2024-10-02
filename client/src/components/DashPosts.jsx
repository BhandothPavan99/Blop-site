import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import {
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentuser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore , setShowMore] = useState(true)
  const [showModel , setShowModel] =useState(false)
  const [postIdToDelete , setPostIdToDelete] = useState('')

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(`/api/getposts?userId=${currentuser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          
          if (data.posts.length < 9) {
            setShowMore(false)
          }
        }
      };
      if (currentuser.isAdmin) {
        fetchPosts();
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [currentuser._id]);
  const handleShowMore = async() =>{
    const startIndex = userPosts.length
    try {
    const res = await fetch(`/api/getposts?userId=${currentuser._id}&startIndex=${startIndex}`)
    const data = await res.json()
    if (res.ok) {
     setUserPosts((prev) => [...prev , ...data.posts])
     if (data.posts.length < 9) {
      setShowMore(false)
     }
    }
    } catch (error) {
      console.log(error.message);
      
    }
  }
  const handleDeletePost=async () => {
    setShowModel(false)
      try {
        const res = await fetch(`/api/deletepost/${postIdToDelete}/${currentuser._id}`,{
          method:"DELETE"
        })
        const data =await res.json() 
        if (!res.ok) {
          console.log(data.message);
          
        }else{
          setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete))
        }
      } catch (error) {
        console.log(error);
        
      }
  }

  return (
    <div className="table-auto overflow-x-scroll w-full md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  xl:scrollbar-none">
      {currentuser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>post image</TableHeadCell>
              <TableHeadCell>post title</TableHeadCell>
              <TableHeadCell>category</TableHeadCell>
              <TableHeadCell>delete</TableHeadCell>
              <TableHeadCell>
                <span>edit</span>
              </TableHeadCell>
            </TableHead>
            {userPosts.map((post) => (
              <TableBody className=" divide-y" key={post._id}>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/posts/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-10 ,w-20 bg-gray-500 object-cover"
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="font-semibold dark:text-white">
                    {post.title}
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <span onClick={() =>{setShowModel(true) , setPostIdToDelete(post._id)}} className="text-red-700 hover:underline cursor-pointer font-semibold">
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className="text-blue-500 font-semibold"
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className="w-full text-sm text-black hover:underline p-3 dark:text-white">show more</button>
            )
          }
        </>
      ) : (
        <p className="text-center">You dont have any posts yet!</p>
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
              Are you sure you want to delete this post ?
            </h3>
            <div className="flex justify-between mt-4">
              <Button color="failure" onClick={handleDeletePost}>
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
