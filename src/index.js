import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./assets/layout/Layout";
import Login from "./Login";
import Context from "./assets/context/Context";
import Admin from "./Admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
const routes = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Layout />}>
      <Route path="" element={<App />} />
      <Route path="/admin" element={<Admin />} />
    </Route>,
    <Route path="/login" element={<Login />} />,
    <Route path="/admin" element={<Admin />} />,
  ])
);
root.render(
  <Context>
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  </Context>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
