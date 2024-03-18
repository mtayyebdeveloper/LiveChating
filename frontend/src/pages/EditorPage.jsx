import React, { useEffect, useState,useMemo } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const EditorPage = (props) => {
  const socket = useMemo(() => io("http://localhost:4000"), []);
  const [massage, setmassage] = useState("");
  const [data, setdata] = useState([]);

  useEffect(() => {
    socket.on("data", (d) => {
      setdata(d);
    });
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const redirectHome = () => {
    navigate("/");
  };

  const sentData = (e) => {
    // socket.emit("massage", massage);
    socket.emit("massage",massage)
    setmassage("")
  };
  return (
    <>
      {id.length >= 36 ? (
        <>
          <div>
            <input
              type="text"
              value={massage}
              onChange={(e) => setmassage(e.target.value)}
              placeholder="enter massage"
            />
            <button type="submit" onClick={sentData}>
              send
            </button>

            <h1>Chating</h1>
            <div id="massagebox">{data}</div>
          </div>
        </>
      ) : (
        redirectHome()
      )}
    </>
  );
};

export default EditorPage;
