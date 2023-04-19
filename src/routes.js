import { Route, 
  createBrowserRouter, 
  createRoutesFromElements } from "react-router-dom";
import Index from "./pages";
import Home from "./pages/home";
import Login from "./pages/login";
import ValidateForm from "./pages/components/validate_form";


export const AppRoutes =createBrowserRouter (
  createRoutesFromElements(
      <Route path="/" element={<Index />} >
        <Route index element={<Home />} />
        <Route path="login" element={<Login/>} action={ValidateForm}/>
      </Route>
  )
  );
