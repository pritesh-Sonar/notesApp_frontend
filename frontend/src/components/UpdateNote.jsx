import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, PlusCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateNote = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [prevTitle, setPrevTitle] = useState("");
  const navigate = useNavigate();

  const updateRef = useRef();
 

  const handleUpdate = () => {
    axios
      .post("https://note-app-backend-gold.vercel.app/updatePost", {
        email,
        title,
        value,
        prevTitle,
      })
      .then((result) => {
        if (result) {
          // console.log(result);
          toast.success("Paste Updated Successfully");
          navigate("/pastes");
        } else {
          toast.error("unable to update note");
        }
      });
  };

  useEffect(() => {
    axios
      .get("https://note-app-backend-gold.vercel.app/home/data")
      .then((result) => {
        if(result){
          updateRef.current = result.data;
        // console.log(updateRef.current);
        setTitle(updateRef.current.title);
        setValue(updateRef.current.value);
        setEmail(updateRef.current.userEmail);
        }  
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://note-app-backend-gold.vercel.app/home/data")
      .then((result) => {
        if(result){
          updateRef.current = result.data;
          setPrevTitle(updateRef.current.title);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={"w-[80%] text-black border border-input rounded-md p-2"}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={handleUpdate}
          >
            {"Update Paste"}
          </button>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => {
              navigate("/home");
            }}
          >
            <PlusCircle size={20} />
          </button>
        </div>

        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>

            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              {/*Copy  button */}
              <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
            </div>
          </div>

          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="w-full p-3  focus-visible:ring-0"
            style={{
              caretColor: "#000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
