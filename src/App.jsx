import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import UpdateNote from "./components/UpdateNote";
import Forgot_password from "./components/Forgot_password";
import ResetPassword from "./components/ResetPassword";
import CloseBanner from "./components/CloseBanner";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="w-full h-full flex flex-col">
        <Landing />
      </div>
    ),
  },
  {
    path: "/Home",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/viewNotes",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
  {
    path: "/Login",
    element: (
      <div className="w-full h-full flex flex-col">
        <h1 className="flex items-center justify-center mt-500px text-4xl">
          Welcome to Log In page
        </h1>
        <Login />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div className="w-full h-full flex flex-col">
        <h1 className="flex items-center justify-center mt-500px text-4xl">
          Welcome to Sign UP page
        </h1>
        <Signup />
      </div>
    ),
  },
  {
    path: "/update",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <UpdateNote />
      </div>
    ),
  },
  {
    path: "/forget-password",
    element: <Forgot_password />,
  },
  {
    path: "/reset_password/:id/:token",
    element: <ResetPassword />,
  },
  {
    path: "/CloseBanner",
    element: <CloseBanner />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
