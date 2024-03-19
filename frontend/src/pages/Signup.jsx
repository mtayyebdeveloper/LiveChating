import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [userImage, setuserImage] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const { API, token } = useAuth();

  const submitFormData = async () => {
    try {
      const response = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          password: password,
          userImage: userImage,
        }),
      });

      if (response.ok) {
        toast.success("User created successfuly.");
        navigate("/login");
      } else {
        const data = response.json().then((err) => {
          if (err.massage) {
            toast.error(err.massage);
          } else if (err.signup) {
            toast.error(err.signup.errors.userImage.message);
          } else if (err.massage.issues) {
            toast.error(err.massage.issues[0].message);
          }
        });
      }
    } catch (error) {
      console.log("signup error:", error);
    }
  };

  const compressAndEncodeImage = async (file) => {
    const maxWidth = 800; // Maximum width for the resized image
    const maxHeight = 600; // Maximum height for the resized image
    const quality = 0.8; // Image compression quality

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const scaleFactor = calculateScaleFactor(
            img.width,
            img.height,
            maxWidth,
            maxHeight
          );
          const width = img.width * scaleFactor;
          const height = img.height * scaleFactor;

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Get compressed image data
          canvas.toBlob(
            (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            },
            "image/jpeg",
            quality
          );
        };
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const calculateScaleFactor = (
    imageWidth,
    imageHeight,
    maxWidth,
    maxHeight
  ) => {
    const widthRatio = maxWidth / imageWidth;
    const heightRatio = maxHeight / imageHeight;
    return Math.min(widthRatio, heightRatio);
  };

  const imageHandel = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const imageDataUrl = await compressAndEncodeImage(file);
      setuserImage(imageDataUrl);
    } catch (error) {
      console.error("Error compressing or encoding image:", error);
    }
  };

  return (
    <>
      {!token ? (
        <>
          <div className="w-[100vw] h-[100vh] bg-gray-700 text-white flex items-center justify-center">
            <div className="border-2 border-white rounded-lg w-[60vw] h-[80vh] bg-gray-800 py-2 px-2 shadow-lg shadow-white">
              <div className="flex items-center pt-3 ps-3">
                <img
                  src="download__1_-removebg-preview.png"
                  alt="site logo"
                  className="w-[60px]"
                />
                <h1 className="text-3xl font-bold">Live' Chats Signup</h1>
              </div>
              <div className="mt-[10px] flex flex-col items-center justify-center">
                <div>
                  <label htmlFor="image">
                    <img
                      src={userImage}
                      alt="user image"
                      className="w-[130px] h-[130px] border-2 border-green-300 rounded-full"
                    />
                  </label>
                  <input
                    type="file"
                    name="imagebox"
                    className="hidden"
                    onChange={imageHandel}
                    id="image"
                    accept=".jpg, .png ,.avif"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-lg py-1 font-bold">
                    Enter your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="w-[50vw] text-lg outline-none px-2 py-1 text-black font-semibold rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-lg py-1 font-bold">
                    Enter your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-[50vw] text-lg outline-none px-2 py-1 text-black font-semibold rounded"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="phone" className="text-lg py-1 font-bold">
                    Enter Your phone number
                  </label>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    id="phone"
                    placeholder="Enter phone"
                    className="w-[50vw] text-lg outline-none px-2 py-1 text-black font-semibold rounded"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="password" className="text-lg py-1 font-bold">
                    Enter Your password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    id="password"
                    placeholder="Enter phone"
                    className="w-[50vw] text-lg outline-none px-2 py-1 text-black font-semibold rounded"
                  />
                </div>

                <div>
                  <button
                    className="py-2 px-2 text-center font-semibold text-xl bg-green-500 text-white  border-2 border-green-600 float-right rounded mt-5 cursor-pointer hover:bg-green-700 w-[50vw]"
                    onClick={submitFormData}
                  >
                    Signup
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-8">
                <Link to="/login">
                  {" "}
                  <p className="  hover:underline">
                    All ready have an account{" "}
                    <span className="text-green-500">Login</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        useEffect(() => {
          navigate("/chating");
        }, [])
      )}
    </>
  );
};

export default Signup;
