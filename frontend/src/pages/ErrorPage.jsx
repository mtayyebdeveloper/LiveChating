import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <div class="text-center bg-slate-50 py-5">
        <h1 class="mb-4 text-[7rem] font-semibold text-red-500">404</h1>
        <p class="mb-5 text-xl mt-[-30px] text-gray-600">
          Oops! Looks like you're lost.
        </p>
        <div class="animate-bounce">
          <svg
            class="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p class="mt-4 text-gray-600 text-xl">Let's get you back</p>
        <div>
          <button className="border-2 hover:bg-blue-600 hover:text-white font-semibold py-1 px-3 mt-2 mx-2 border-blue-600 rounded-lg">
            <Link to="/">Home</Link>
          </button>
          <button className="border-2 hover:bg-blue-600 hover:text-white font-semibold py-1 px-3 mt-2 mx-2 border-blue-600 rounded-lg">
            <Link to="/contact">Report</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
