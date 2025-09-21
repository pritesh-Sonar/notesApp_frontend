import React from "react";
import { useNavigate } from "react-router-dom";
import NotesLogo from "../assets/notesLogo.png";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img alt="" src={NotesLogo} className="mx-auto h-12" />
          <figure className="mt-10">
            <blockquote className="text-center text-xl/8 font-semibold text-white sm:text-2xl/9">
              <p>
                "This is the Notes App developed to save your important notes
                and work So you can access it from any where at any time !!!"
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-white">Pritesh Sonar</div>
                <svg
                  width={3}
                  height={3}
                  viewBox="0 0 2 2"
                  aria-hidden="true"
                  className="fill-white"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <div className="text-gray-400">Software engineer</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <div className="flex items-center justify-center mt-20px h-50px w-50px">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
          onClick={() => {
            navigate("/Login");
          }}
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default Landing;
