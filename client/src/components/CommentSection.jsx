import { Alert, Button, Textarea } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
  const { currentuser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentuser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setAllComments([data, ...allComments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  useEffect(() => {
    try {
      const fetchComments = async () => {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setAllComments(data);
        }
      };
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);
  const handleLike = async (commentId) => {
    try {
      if (!currentuser) {
        navigate("sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likecomment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setAllComments(
          allComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (comment, editedContent) => {
    setAllComments(
      allComments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };
  const handleDelete = async (commentId) => {
    setShowModel(false);
    try {
      const res = await fetch(`/api/comment/deletecomment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setAllComments(
          allComments.filter((comment) => comment._id !== commentId)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" mx-auto w-full p-3 max-w-6xl">
      {currentuser ? (
        <div className="flex  items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-200">
          <p>Signed in as :</p>
          <img
            src={currentuser.profilePicture}
            className="h-5 w-5 rounded-full"
          />
          <p>
            <Link
              to={"/dashboard?tab=profile"}
              className=" hover:underline text-blue-900 dark:text-blue-500"
            >
              @{currentuser.email}
            </Link>
          </p>
        </div>
      ) : (
        <div className="text-md flex items-center justify-center font-semibold">
          you must sign in to comment?
          <span className="mx-1 text-green-600 hover:underline">
            <Link to={"/sign-in"}>SignIn</Link>
          </span>
        </div>
      )}
      {currentuser && (
        <form
          className=" p-3 border border-gray-500 mt-2 rounded-lg"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-sm text-gray-500 font-semibold">
              {200 - comment.length} Characters left
            </p>
            <Button
              type="submit"
              outline
              gradientDuoTone="greenToBlue"
              size="sm"
            >
              submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {allComments.length === 0 ? (
        <p className="flex mt-5 items-center gap-1 text-sm font-semibold text-gray-500 dark:text-gray-200">
          No comments yet!
        </p>
      ) : (
        <>
          <div className="flex items-center gap-1 text-sm mt-5 font-semibold text-gray-500 dark:text-gray-200 ">
            <p>Comments :</p>
            <div className="border-2 px-2 rounded-lg flex items-center border-gray-500">
              <p>{allComments.length}</p>
            </div>
          </div>
          {allComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModel(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
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
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
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
