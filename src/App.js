import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./components/marj/Signup";
import SignIn from "./components/marj/SignIn";
import Layout from "./components/Layout";
import Main from "./components/Main";
import ImageRoot from "./components/sarkar/ImageRoot";
import UserHome from "./components/marj/UserHome";
import ChatAssist from "./components/aditya/ChatAssist";
import Display from "./components/marj/Display";
import HtmlForm from "./components/hetal/HtmlForm";
import HookMain from "./components/customHooks/HookMain";
import LogForm from "./components/logs/LogForm";
import Analysis from "./components/logs/Analysis";
import Todo from "./components/todo/ToDo";
import { useEffect } from "react";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Main />} />
      <Route path="random-image/" element={<ImageRoot />} />
      <Route path="user/" element={<UserHome />}>
        <Route path="" element={<Display />} />
        <Route path="login/" element={<SignIn />} />
        <Route path="signup/" element={<Signup />} />
      </Route>
      <Route path="openai/" element={<ChatAssist />} />
      <Route path="form-html-css/" element={<HtmlForm />} />
      <Route path="logs/" element={<LogForm />} />
      <Route path="logs/analysis" element={<Analysis />} />
      <Route path="custom-hook-example/" element={<HookMain />} />
      <Route path="/todo" element={<Todo />} />
    </Route>,
  ])
);
// console.count();
function App() {
  // const {userInfo,userToken} = useSelector(())
  useEffect(() => {
    
  })
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
