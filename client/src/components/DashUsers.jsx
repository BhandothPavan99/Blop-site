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

export default function DashUsers() {
  const { currentuser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore , setShowMore] = useState(true)
  const [showModel , setShowModel] =useState(false)
  const [userIdToDelete , setUserIdToDelete] = useState('')

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const res = await fetch("/api/getusers");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          
          if (data.users.length < 9) {
            setShowMore(false)
          }
        }
      };
      if (currentuser.isAdmin) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [currentuser._id]);
  const handleShowMore = async() =>{
    const startIndex = users.length
    try {
    const res = await fetch(`/api/getusers?startIndex=${startIndex}`)
    const data = await res.json()
    if (res.ok) {
     setUsers((prev) => [...prev , ...data.posts])
     if (data.users.length < 9) {
      setShowMore(false)
     }
    }
    } catch (error) {
      console.log(error.message);
      
    }
  }
  const handleDeleteUser=async () => {
    setShowModel(false)
      try {
        const res = await fetch(`/api/delete/${userIdToDelete}`,{
          method:"DELETE"
        })
        const data =await res.json() 
        if (!res.ok) {
          console.log(data.message);
          
        }else{
          setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete))
        }
      } catch (error) {
        console.log(error);
        
      }
  }

  return (
    <div className="table-auto overflow-x-scroll w-full md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  xl:scrollbar-none">
      {currentuser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Date Created</TableHeadCell>
              <TableHeadCell>user image</TableHeadCell>
              <TableHeadCell>username</TableHeadCell>
              <TableHeadCell>email</TableHeadCell>
              <TableHeadCell>admin</TableHeadCell>
              <TableHeadCell>delete</TableHeadCell>
            </TableHead>
            {users.map((user) => (
              <TableBody className=" divide-y" key={user._id}>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/posts/${user.slug}`}>
                      <img
                        src={user.profilePicture}
                        alt={user.userName}
                        className="h-10 ,w-10 bg-gray-500 object-cover rounded-full"
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="font-semibold dark:text-white">
                    {user.userName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isAdmin ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500"/>)}</TableCell>
                  <TableCell>
                    <span onClick={() =>{setShowModel(true) ,setUserIdToDelete(user._id)}} className="text-red-700 hover:underline cursor-pointer font-semibold">
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
        <p className="text-center">You dont have any users yet!</p>
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
              Are you sure you want to delete this user ?
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
