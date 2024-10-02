import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className=" ">
      <Card
        className="max-w-xs justify-center object-cover cursor-pointer h-[400px] w-full hover:shadow-lg hover:opacity-60"
        imgAlt=""
        imgSrc={post.image}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
          {post.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 font-serif">
          {post.category}
        </p>
        <Link to={`/posts/${post.slug}`}>
          <div className="flex">
            <p className="text-black font-semibold dark:text-gray-200 hover:underline ">
              show more
            </p>
            <p>---&gt;</p>
          </div>
        </Link>
      </Card>
    </div>
  );
}
