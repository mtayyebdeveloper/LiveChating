import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../store/Auth";
import { io } from "socket.io-client";
import {useNavigate} from 'react-router-dom'
import UserData from '../components/UserData'

const ChatingPage = () => {
  const socket = useMemo(() => io("http://localhost:4000"), []);
  const [massage, setmassage] = useState("");
  const [data, setdata] = useState([]);
  const {token,userData,UserAuthentication} =useAuth()
  const navigate = useNavigate()
  const [popup, setpopup] = useState("hidden")

  useEffect(() => {
    UserAuthentication()
    socket.on("data", (d) => {
      setdata((data) => [...data, d]);
    });
  }, [socket]);

  const sendmassage = (e) => {
    socket.emit("massage", massage);
    setmassage("");
  };
  const aboutUserBtn =()=>{
    if(popup=="hidden"){
      setpopup("flex")
    }else{
      setpopup("hidden")
    }
  }
  return (
    <>
      {token ? (
        <>
          <div>
            <div className="w-full bg-gray-800 h-screen">
              <div className="ms-[50px] relative top-[1.8rem] bg-[#449388]">
                <div >
                  <div className="flex border-2 border-[#51a89d] rounded h-full  ">
                    {/* <!-- Left --> */}
                    <div className="w-1/3 flex flex-col  border-2 border-[#51a89d]">
                      {/* <!-- Header --> */}
                      <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                        <div>
                          <img
                            className="w-10 h-10 rounded-full"
                            src={userData.userImage}
                            alt={userData.name}
                            onClick={aboutUserBtn}
                          />
                        </div>
                        <div className={`${popup}`}>
                          <UserData/>
                        </div>

                        <div className="flex">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path
                                fill="#727A7E"
                                d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                              ></path>
                            </svg>
                          </div>
                          <div className="ml-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path
                                opacity=".55"
                                fill="#263238"
                                d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                              ></path>
                            </svg>
                          </div>
                          <div className="ml-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path
                                fill="#263238"
                                fill-opacity=".6"
                                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Search --> */}
                      <div className="py-2 px-2 bg-grey-lightest">
                        <input
                          type="text"
                          className="w-full px-2 py-2 text-sm outline-none"
                          placeholder="Search or start new chat"
                        />
                      </div>

                      {/* <!-- Contacts --> */}
                     <div className="static">
                     <div className="bg-grey-lighter flex-1 over-contact">
                        <div className="bg-white px-3 flex items-center bg-grey-light cursor-pointer hover:bg-gray-200">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                            />
                          </div>
                          <div className="ml-4 flex-1 py-4 border-b ">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">
                                New Movie! Expendables 4
                              </p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Get Andrés on this movie ASAP!
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-gray-200 cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">
                                Arnold Schwarzenegger
                              </p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              I'll be back
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Russell Crowe</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Hold the line!
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Tom Cruise</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Show me the money!
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Harrison Ford</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Tell Java I have the money
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Harrison Ford</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Tell Java I have the money
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Harrison Ford</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Tell Java I have the money
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Harrison Ford</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Tell Java I have the money
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Harrison Ford</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Tell Java I have the money
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Harrison Ford</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Tell Java I have the money
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Harrison Ford</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Tell Java I have the money
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Harrison Ford</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Tell Java I have the money
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Harrison Ford</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Tell Java I have the money
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                          <div>
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://cdn.pixabay.com/photo/2023/08/05/14/24/twilight-8171206_1280.jpg"
                            />
                          </div>
                          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest">Harrison Ford</p>
                              <p className="text-xs text-grey-darkest">
                                12:45 pm
                              </p>
                            </div>
                            <p className="text-grey-dark mt-1 text-sm">
                              Tell Java I have the money
                            </p>
                          </div>
                        </div>
                      </div>
                     </div>
                    </div>

                    {/* <!-- Right --> */}
                    <div className="w-2/3 flex flex-col">
                      {/* <!-- Header --> */}
                      <div className="py-1 px-3 flex flex-row justify-between items-center border-2 border-[#51a89d]">
                        <div className="flex items-center">
                          <div>
                            <img
                              className="w-9 h-9 rounded-full"
                              src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-grey-darkest">
                              New Movie! Expendables 4
                            </p>
                          </div>
                        </div>

                        <div className="flex">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path
                                fill="#263238"
                                fill-opacity=".5"
                                d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                              ></path>
                            </svg>
                          </div>
                          <div className="ml-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path
                                fill="#263238"
                                fill-opacity=".5"
                                d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"
                              ></path>
                            </svg>
                          </div>
                          <div className="ml-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path
                                fill="#263238"
                                fill-opacity=".6"
                                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Messages --> */}
                      <div className="static">
                        <div className="flex-1 over bg-[#DAD3CC] py-1">
                          <div className=" px-3">
                            <div className="flex justify-center mb-2">
                              <div className="rounded py-2 px-4 bg-[#DDECF2]">
                                <p className="text-sm uppercase">
                                  February 20, 2018
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-center mb-4">
                              <div className="rounded py-2 px-4 bg-[#FCF4CB]">
                                <p className="text-xs">
                                  Messages to this chat and calls are now
                                  secured with end-to-end encryption. Tap for
                                  more info.
                                </p>
                              </div>
                            </div>

                            <div className="flex mb-2 justify-end">
                              <div className="rounded py-2 bg-[#F2F2F2] px-3">
                                <p className="text-sm text-teal">
                                  Sylverter Stallone
                                </p>
                                <p className="text-sm mt-1">
                                  Hi everyone! Glad you could join! I am making
                                  a new movie.
                                </p>
                                <p className="text-right text-xs text-grey-dark mt-1">
                                  12:45 pm
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Input --> */}
                      <div className="bg-grey-lighter py-1 px-4 flex items-center">
                        <div>
                          <button>
                            {" "}
                            <i className="fa-solid fa-smile text-xl"></i>
                          </button>
                        </div>
                        <div className="flex-1 mx-4">
                          <input
                            className="w-full border rounded px-2 py-1 outline-none"
                            value={massage}
                            onChange={(e)=>setmassage(e.target.value)}
                            type="text"
                          />
                        </div>
                        <div className="mx-2">
                          <button className="py-1 px-1" onClick={sendmassage}>
                            <i class="fa-solid fa-paper-plane text-2xl text-green-400 tran"></i>
                          </button>
                        </div>
                        <div className="mx-2">
                          <button>
                            {" "}
                            <i className="fa-solid fa-microphone text-xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : useEffect(()=>{navigate("/")},[])}
    </>
  );
};

export default ChatingPage;
