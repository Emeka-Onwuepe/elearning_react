import { Route, 
  createBrowserRouter, 
  createRoutesFromElements } from "react-router-dom";
import Index from "./pages";
import Home from "./pages/home";
import Login from "./pages/login";
import UserPage from "./pages/userpage";
import RegisterUser from "./pages/register";
import RegisterStudent from "./pages/registerStudent";
import Course from "./pages/course";


export const AppRoutes =createBrowserRouter (
  createRoutesFromElements(
      <Route path="/" element={<Index />} >
        <Route index element={<Home />} />
        <Route path="login" element={<Login/>}/>
        <Route path="userpage" element={<UserPage/>} />
        <Route path="register" element={<RegisterUser />} />
        <Route path="register/:schoolId" element={<RegisterStudent />} />
        <Route path="course/:id" element={<Course />} />
      </Route>
  )
  );
