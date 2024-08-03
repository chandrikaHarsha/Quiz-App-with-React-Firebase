import React, { useContext, useEffect, useState } from "react";
import app from "./Firebase Configuration/FirebaseConfig";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { LoginContext } from "./assets/context/Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import Logo from "./assets/images/quizLogo.jpg";
const Login = () => {
  let db = getDatabase(app);
  let { setIsLoggedIn, setCookie } = useContext(LoginContext);
  let navigate = useNavigate();
  //   let cookies = Cookies.get("userName");
  //   let cookiesObj = JSON.parse(cookies);

  //   let admin = () => {
  //     set(ref(db, "admins/" + Math.floor(Math.random() * 99999 * 10000)), {
  //       username: "admin@gmail.com",
  //       password: "admin@4321",
  //     });
  //   };
  //   useEffect(() => {
  //     admin();
  //   }, []);
  let [cred, setCred] = useState([]);
  //   let adminId = Object.keys(cred);
  let fireCred = {};
  let firebaseAdminCredentials = () => {
    get(child(ref(db), "admins/"))
      .then((res) => {
        setCred(res.val());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let handleCredentials = (e) => {
    e.preventDefault();

    let user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    for (let id in cred) {
      fireCred.id = id;
      fireCred.username = cred[id].username;
      fireCred.password = cred[id].password;
    }
    // console.log("Fire", fireCred);
    // console.log("User", user);
    if (user.email === "" && user.password === "")
      alert("Enter Your Credentials");
    else if (fireCred.username !== user.email) alert("Invalid Email");
    else if (fireCred.password !== user.password) alert("Invalid password");
    else {
      let CookieObj = JSON.stringify(fireCred);
      Cookies.set("userName", CookieObj, {
        expires: 7,
        path: "/login",
      });
      setCookie(true);
      setIsLoggedIn(true);
      //   console.log(cookie, isLoggedIn);
      //   window.location.href = "/";
      navigate("/");
    }
  };
  useEffect(() => {
    firebaseAdminCredentials();
    // let cookies = Cookies.get("userName");
    // let cookiesObj = JSON.parse(cookies);
    // //  console.log(typeof cookiesObj, cookiesObj.length()); //length is not used with the Objects
    // if (Object.keys(cookiesObj).length > 0) {
    //   setIsLoggedIn(true);
    //   setCookie(true);
    // }
  }, []);
  return (
    <div className="w-[600px] h-[500px] m-[50px_auto] shadow-lg rounded-[10px_50px_10px_50px] flex flex-col justify-center p-3 bg-white">
      <div className="w-[100px] h-[100px] border rounded-[50px] drop-shadow-lg flex items-center justify-center bg-gradient-to-r from-slate-800 to bg-slate-300 mx-auto my-[30px]">
        <span className="font-extrabold text-[25px]">Quiz</span>
      </div>
      <div>
        <form onSubmit={handleCredentials}>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="w-full h-[50px] rounded-md bg-slate-100 focus:outline-none my-[5px] p-[15px] text-[18px]"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            className="w-full h-[50px] rounded-md bg-slate-100 focus:outline-none my-[5px] p-[15px] text-[18px]"
          />
          <button className="my-[30px] w-full h-[50px] bg-gradient-to-r from-slate-800 to bg-slate-300 rounded-md text-[25px] text-white font-semibold ">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
