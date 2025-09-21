import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  //my code
  const [email, setEmail] = useState();
  const [user, setUser] = useState([]);
  const titleRef = useRef();
  const userRef = useRef();
  const userTitle = useRef();
  const contentRef = useRef();

  let arr = [[]];

  function handleUpdate() {
    const title = titleRef.current;
    axios
      .post("https://note-app-backend-gold.vercel.app/update", { email, title })
      .then((result) => {
        userRef.current = result.data;
        const userData = userRef.current;

        axios.post("https://note-app-backend-gold.vercel.app/home/update", userData);
        navigate("/update");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleView() {
    localStorage.setItem("title", JSON.stringify(titleRef.current));
    localStorage.setItem("content", JSON.stringify(contentRef.current));
    navigate("/viewNotes");
  }

  function handleNoteDelete() {
    console.log(userTitle);
    axios
      .post("https://note-app-backend-gold.vercel.app/delete", { email, userTitle })
      .then((res) => {
        if (res) {
          toast.success("Note deleted successfully");
          window.location.reload();
        } else {
          toast.error("error occured to delete note");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // Get user from localStorage
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setEmail(userInfo);
    }
  }, []);

  useEffect(() => {
    axios
      .post("https://note-app-backend-gold.vercel.app/pastes", { email })
      .then((result) => {
        if (result) {
          setUser(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("fail to load Notes");
      });
  }, [email]);

  // if (user.length > 0) {
  //   let i = 0;
  //   // console.log("lenght of array " + user.length);
  //   console.log(user);
  //   while (i < user.length) {
  //     arr.push([user[i].title, user[i].value]);
  //     i = i + 1;
  //   }
  // }
  const filteredNotes = user.filter((note) => {
    const term = searchTerm.toLowerCase();
    const heading = note.title?.toLowerCase() || "";
    const content = note.value?.toLowerCase() || "";
    return heading.includes(term) || content.includes(term);
  });

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredNotes.map((arr, index) => (
              <div
                key={index}
                className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
              >
                <div className="w-[50%] flex flex-col space-y-3">
                  <p className="text-4xl font-semibold ">{arr.title}</p>
                  <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                    {arr.value}
                  </p>
                </div>

                <div className="flex flex-col gap-y-4 sm:items-end">
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <button
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                      onClick={() => {
                        titleRef.current = arr.title;
                        handleUpdate();
                      }}
                    >
                      <PencilLine
                        className="text-black group-hover:text-blue-500"
                        size={20}
                      />
                    </button>
                    <button
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                      onClick={() => {
                        userTitle.current = arr.title;
                        handleNoteDelete();
                      }}
                    >
                      <Trash2
                        className="text-black group-hover:text-pink-500"
                        size={20}
                      />
                    </button>

                    <button
                      onClick={() => {
                        titleRef.current = arr.title;
                        contentRef.current = arr.value;
                        handleView();
                      }}
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500"
                    >
                      <Eye
                        className="text-black group-hover:text-orange-500"
                        size={20}
                      />
                    </button>
                    <button
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                      onClick={() => {
                        navigator.clipboard.writeText(arr.value);
                        toast.success("Copied to Clipboard");
                      }}
                    >
                      <Copy
                        className="text-black group-hover:text-green-500"
                        size={20}
                      />
                    </button>
                  </div>

                  <div className="gap-x-2 flex ">
                    <Calendar className="text-black" size={20} />
                    {arr.date}/{arr.month}/{arr.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
