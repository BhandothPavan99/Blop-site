import React from "react";

function About() {
  return (
    <div className="min-h-screen flex justify-center md:mt-20 p-4">
      <div className="mt-5 mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-center  text-[#283E51] dark:text-white">
            About <i>Pavan's Insights</i>
          </h1>
        <div className="flex flex-col justify-center mt-3 gap-3 max-w-2xl  font-semibold">
        <i>
        <p>
            I’m a web developer with a passion for technology and web
            development. I’m deeply interested in how technology shapes the
            world, and my goal is to contribute to this space by constantly
            learning and applying new skills.
          </p>
          <p>
            After graduating, I started exploring web development, finding joy
            in creating functional and visually appealing websites. My learning
            journey has led me to work with tools and technologies like HTML,
            CSS, JavaScript, and React, Nodejs , Express and FrameWorks like
            BootStrap, Flowbite and I’m currently diving deeper into frameworks
            like GraphQL.
          </p>
          <p>
            After graduating, I started exploring web development, finding joy
            in creating functional and visually appealing websites. My learning
            journey has led me to work with tools and technologies like HTML,
            CSS, JavaScript, and React, and I’m currently diving deeper into
            frameworks like GraphQL.
          </p>
          <p>
            In my free time, you’ll find me exploring new technologies,
            experimenting with code, or catching up on tech news. I’m excited to
            share my journey with you!
          </p>
        </i>
        </div>
        </div>
      </div>
    </div>
  );
}

export default About;
