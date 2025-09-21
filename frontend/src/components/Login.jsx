import React from "react";
import NotesLogo from "../assets/notesLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Enter valid details");
    } else {
      axios
        .post("https://note-app-backend-gold.vercel.app/login", { email, password })
        .then((result) => {
          // console.log(result);
          if (result.data === "Success") {
            navigate("/Home");
            toast.success("User login successfully");
          } else if (result.data === "password is incorrect") {
            toast.error("Password not matched");
          } else {
            toast.error("user not found");
          }
          localStorage.setItem("user", JSON.stringify(email));
        })

        .catch((err) => {
          console.log(err);
          toast.error("login failed");
        });
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={NotesLogo}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-black"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full border rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline outline-black focus:outline-indigo-500 "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-black"
              >
                Password
              </label>
              <div className="text-sm">
                <p
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                  onClick={() => {
                    navigate("/forget-password");
                  }}
                >
                  Forgot password?
                </p>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline outline-black focus:outline-indigo-500 "
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="justify-center mt-50px">
          <br />
          <div className="flex justify-center">OR</div>
          <br />
          <button
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => {
              navigate("/Signup");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
