import React, { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomID, setroomID] = useState("");
  const [username, setusername] = useState("");
  const navigate = useNavigate();

  const genarateNewID = () => {
    setroomID(uuidv4());
  };

  const submitFormData = () => {
    if (!roomID || !username) {
      toast.error("Please fill all the fields");
    } else {
      if(roomID.length >=36){
        navigate(`/editor/${roomID}`, {
          state: {
            username: username,
          },
        });
      }else{
        toast.error("Invalid Room ID");
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
            <h1 className="text-3xl font-bold">Live' Editor</h1>
          </div>
          <div className="ms-5 mt-5 flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="roomid" className="text-lg py-1 font-bold">
                Enter ROOM ID
              </label>
              <input
                type="text"
                id="roomid"
                placeholder="Enter Room ID"
                value={roomID}
                onChange={(e) => setroomID(e.target.value)}
                className="w-[50vw] text-lg outline-none px-2 py-1 text-black font-semibold rounded"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="username" className="text-lg py-1 font-bold">
                Enter Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                id="username"
                placeholder="Enter username"
                className="w-[50vw] text-lg outline-none px-2 py-1 text-black font-semibold rounded"
              />
            </div>
            <div>
              <button
                className="py-1 px-2 text-center font-semibold text-lg bg-green-500 text-white rounded-full border-2 border-green-600 w-[150px] float-right me-[90px] mt-5 cursor-pointer hover:bg-green-700"
                onClick={submitFormData}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center mt-16 font-semibold text-lg">
            <p>If you don't have room so:</p>
            <p
              className="ms-1 text-blue-500 underline hover:text-blue-700 cursor-pointer"
              onClick={genarateNewID}
            >
              Genarate New Room ID
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
