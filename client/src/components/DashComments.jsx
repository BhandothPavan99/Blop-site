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
import {FaCheck , FaTimes} from "react-icons/fa"
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashComments() {
  const { currentuser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore , setShowMore] = useState(true)
  const [showModel , setShowModel] =useState(false)
  const [commentsIdToDelete , setCommentsIdToDelete] = useState('')

  useEffect(() => {
    try {
      const fetchComments = async () => {
        const res = await fetch("/api/comment/getcomments");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          
          if (data.comments.length < 9) {
            setShowMore(false)
          }
        }
      };
      if (currentuser.isAdmin) {
        fetchComments();
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [currentuser._id]);
  const handleShowMore = async() =>{
    const startIndex = comments.length
    try {
    const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`)
    const data = await res.json()
    if (res.ok) {
     setComments((prev) => [...prev , ...data.posts])
     if (data.comments.length < 9) {
      setShowMore(false)
     }
    }
    } catch (error) {
      console.log(error.message);
      
    }
  }
  const handleDeleteComments=async () => {
    setShowModel(false)
      try {
        const res = await fetch(`/api/comment/deletecomment/${commentsIdToDelete}`,{
          method:"DELETE"
        })
        const data =await res.json() 
        if (!res.ok) {
          console.log(data.message);
          
        }else{
          setComments((prev) => prev.filter((comment) => comment._id !== commentsIdToDelete))
        }
      } catch (error) {
        console.log(error);
        
      }
  }

  return (
    <div className="table-auto overflow-x-scroll w-full md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  xl:scrollbar-none">
      {currentuser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Date Created</TableHeadCell>
              <TableHeadCell>comment content</TableHeadCell>
              <TableHeadCell>number of likes</TableHeadCell>
              <TableHeadCell>user id</TableHeadCell>
              <TableHeadCell>post id</TableHeadCell>
              <TableHeadCell>delete</TableHeadCell>
            </TableHead>
            {comments.map((comment) => (
              <TableBody className=" divide-y" key={comment._id}>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                   {comment.content}
                  </TableCell>
                  <TableCell className="font-semibold dark:text-white">
                    {comment.numberOfLikes}
                  </TableCell>
                  <TableCell>{comment.userId}</TableCell>
                  <TableCell>{comment.postId}</TableCell>
                  <TableCell>
                    <span onClick={() =>{setShowModel(true) ,setCommentsIdToDelete(comment._id)}} className="text-red-700 hover:underline cursor-pointer font-semibold">
                      Delete
                    </span>
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
        <p className="text-center">You dont have any comments yet!</p>
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
              Are you sure you want to delete this comment ?
            </h3>
            <div className="flex justify-between mt-4">
              <Button color="failure" onClick={handleDeleteComments}>
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
