import { Route, 
  createBrowserRouter, 
  createRoutesFromElements } from "react-router-dom";
import Index from "./pages";
import Home from "./pages/home";
import Login from "./pages/users/login";
import UserPage from "./pages/users/userpage";
import RegisterUser from "./pages/users/register";
import RegisterStudent from "./pages/users/registerStudent";
import Course from "./pages/courses/course";
import Lesson from "./pages/courses/lesson";
import Cart from "./pages/cart/cart";
import PurchaseHistory from "./pages/cart/purchaseHistory";


export const AppRoutes =createBrowserRouter (
  createRoutesFromElements(
      <Route path="/" element={<Index />} >
        <Route index element={<Home />} />
        <Route path="login" element={<Login/>}/>
        <Route path="userpage" element={<UserPage/>} />
        <Route path="cart" element={<Cart />} />
        <Route path="purchasehistory" element={<PurchaseHistory />} />
        <Route path="register" element={<RegisterUser />} />
        <Route path="register/:schoolId" element={<RegisterStudent />} />
        <Route path="course/:id" element={<Course />} />
        <Route path="lesson/:week/:type/:id" element={<Lesson />} />
      </Route>
  )
  );
