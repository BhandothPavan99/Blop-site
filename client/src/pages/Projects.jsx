import React from "react";

export default function Projects() {
  return (
    <div className="min-h-screen flex justify-center md:mt-2 p-3 ">
      <div className="mt-5 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2  text-[#283E51] dark:text-white">
          Projects
        </h1>
        <h1 className="text-2xl font-bold   text-[#283E51] dark:text-white">
          <i>Pavan's Insights</i>--Personal blog
        </h1>
        <div className="flex flex-col justify-center mt-2 gap-2 max-w-4xl  ">
          <i>
            <strong> Description :</strong> A blog I created to document and share
            my web development journey, coding insights, and technology trends.{" "}
            <br />
            <strong>Technologies :</strong> HTML, CSS, JavaScript, React, Nodejs
            , Express etc. <br /> <strong>Details :</strong> Designed and
            developed this blog from scratch using React and Nodejs. The blog features a
            clean and modern layout, responsive design, and dynamic components
            to display posts. I’m constantly adding new content, tutorials, and
            tips for developers.
          </i>
          <h1 className="text-2xl font-bold   text-[#283E51] dark:text-white">
            <i>Currency Converter</i>
          </h1>
          <i>
            <strong> Description :</strong> A React-based application that
            converts currencies in real-time using API data. <br />
            <strong>Technologies :</strong> HTML, CSS, JavaScript, React. <br />{" "}
            <strong>Details :</strong> Developed a currency converter that allows
            users to input amounts and select currencies to get real-time
            exchange rates. Implemented a third-party API for fetching live
            currency data. The app has a user-friendly interface with form
            validation and error handling for invalid input. 
          </i>
          <h1 className="text-2xl font-bold   text-[#283E51] dark:text-white">
            <i>Todo List</i>
          </h1>
          <i>
            <strong> Description :</strong> A simple task management application
            to help users organize their daily tasks. <br />
            <strong>Technologies :</strong> HTML, CSS, JavaScript, React. <br />{" "}
            <strong>Details :</strong> Developed a to-do list app where users can
            add, delete, and mark tasks as complete. The app uses local storage
            to maintain tasks even after closing the browser.
          </i>
          <h1 className="text-2xl font-bold   text-[#283E51] dark:text-white">
            <i>PortFilio Website (Coming Soon)</i>
          </h1>
          <i>
            <strong> Description :</strong> A personal portfolio website to
            showcase my projects and skills. <br />
            <strong>Technologies :</strong> HTML, CSS, JavaScript, React, Nodejs. <br />{" "}
            <strong>Details :</strong> Designed and developed this blog from
            scratch using React.Currently in development, this portfolio will
            serve as an online resume, highlighting my work in web development,
            including projects and blog posts.
          </i>
        </div>
      </div>
    </div>
  );
}
