import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Textarea, Button } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const { currentuser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, [comment]);
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editcomment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex p-4 text-sm border-b  dark:border-gray-200">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt="image"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center  mb-1 ">
          <span className="font-semibold text-black dark:text-white mr-2 truncate text-xs">
            {user ? `@${user.email}` : "anynomous user"}
          </span>
          <span className="text-gray-500  dark:text-gray-200 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              onChange={(e) => setEditedContent(e.target.value)}
              value={editedContent}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-900 mb-2 dark:text-gray-200">
              {comment.content}
            </p>
            <div className="pt-2 text-xs border-t flex items-center gap-2 max-w-fit dark:border-gray-200">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={` text-gray-400 hover:text-blue-500 ${
                  currentuser &&
                  comment.likes.includes(currentuser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp />
              </button>
              <p className="">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    "" +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentuser &&
                (currentuser._id === comment.userId || currentuser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-blue-500  dark:text-gray-200"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-red-700  dark:text-gray-200"
                      onClick={() => onDelete(comment._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
