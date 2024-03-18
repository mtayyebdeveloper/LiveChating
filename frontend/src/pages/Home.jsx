import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let user;
 
const Home = () => {
  const [username, setusername] = useState("");
  const navigate = useNavigate();

  const submitFormData = () => {
    if (!username) {
      toast.error("Please enter your name.");
    } else {
      if (username.length >= 3) {
        user=username
        navigate(`/chating`);
      } else {
        toast.error("user name must be grater then 3 characters.");
      }
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-gray-700 text-white flex items-center justify-center">
        <div className="border-2 border-white rounded-lg w-[60vw] h-[50vh] bg-gray-800 py-2 px-2 shadow-lg shadow-white">
          <div className="flex items-center pt-3 ps-3">
            <img
              src="download__1_-removebg-preview.png"
              alt="site logo"
              className="w-[60px]"
            />
            <h1 className="text-3xl font-bold">Live' Chats</h1>
          </div>
          <div className="mt-[50px] flex flex-col items-center justify-center">
            {/* <div className="flex flex-col"> */}
            {/* <label htmlFor="roomid" className="text-lg py-1 font-bold">
                Enter ROOM ID
              </label>
              <input
                type="text"
                id="roomid"
                placeholder="Enter Room ID"
                value={roomID}
                onChange={(e) => setroomID(e.target.value)}
                className="w-[50vw] text-lg outline-none px-2 py-1 text-black font-semibold rounded"
              /> */}
            {/* </div> */}
            <div className="flex flex-col mt-2">
              <label htmlFor="username" className="text-lg py-1 font-bold">
                Enter Your Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                id="username"
                placeholder="Enter username"
                className="w-[50vw] text-xl outline-none px-2 py-2 text-black font-semibold rounded"
              />
            </div>

            <div>
              <button
                className="py-2 px-2 text-center font-semibold text-xl bg-green-500 text-white  border-2 border-green-600 float-right rounded mt-5 cursor-pointer hover:bg-green-700 w-[50vw]"
                onClick={submitFormData}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export {user}
export default Home;
